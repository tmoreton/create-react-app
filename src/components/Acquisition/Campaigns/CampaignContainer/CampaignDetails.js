import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getCampaignPhoneNumbers from '../../../../actions/campaigns/getCampaignPhoneNumbers'
import SectionInput from '../../../Shared/SectionInput'
import SectionSelect from '../../../Shared/SectionSelect'
import SegmentsSelect from '../../../Audience/Segments/SegmentsSelect'
import CampaignTreeView from './CampaignTreeView'

class CampaignDetails extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inheritedSegments: [],
    }
  }

  componentDidMount() {
    this.props.getCampaignPhoneNumbers()
    this.props.campaign.parent_campaign_id && this.fetchInheritedSegments(this.props.campaign.parent_campaign_id)
  }

  componentDidUpdate(prevProps) {
    const { parent_campaign_id } = this.props.campaign
    if (parent_campaign_id !== prevProps.campaign.parent_campaign_id) {
      if (parent_campaign_id) {
        this.fetchInheritedSegments(this.props.campaign.parent_campaign_id)
      } else {
        this.setState({ inheritedSegments: [] })
      }
    }
  }

  getChildrenRecursive = (campaign) => {
    const children = this.getChildren(campaign)
    return children.concat(children.flatMap(this.getChildrenRecursive))
  }

  getChildren = (parentCampaign) => {
    return Object.values(this.props.campaigns).filter(campaign => campaign.parent_campaign_id === parentCampaign.campaign_id)
  }

  parentCampaignOptions() {
    const childrenCampaignIds = this.getChildrenRecursive(this.props.campaign).map(c => c.campaign_id)
    return this.props.campaigns 
      ? Object.values(this.props.campaigns)
        .filter(campaign => {
          const isCurrentCampaign = campaign.campaign_id === this.props.campaign.campaign_id
          const isDescendentOfCurrentCampaign = childrenCampaignIds.includes(campaign.campaign_id)
          return !(isCurrentCampaign || isDescendentOfCurrentCampaign)
        })
        .map(campaign => ({
          value: campaign.campaign_id,
          label: campaign.campaign_name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
      : []
  }

  fetchInheritedSegments(parentCampaignId) {
    return axios.get(`${process.env.REACT_APP_GARCON_API}/campaigns/campaign/${parentCampaignId}/segments`)
      .then(({ data }) => this.setState({ inheritedSegments: data }))
  }

  onChangeParentCampaign(parentCampaignId) {
    this.props.onUpdateCampaign('parent_campaign_id', parentCampaignId)
    if (parentCampaignId) {
      this.fetchInheritedSegments(parentCampaignId)
    } else {
      this.setState({ inheritedSegments: [] })
    }
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <strong>Campaign Details</strong>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <SectionInput readonly label="Campaign ID" type="text" value={this.props.campaign.campaign_id} />
              <SectionInput readonly label="CC Code" type="text" value={this.props.campaign.cc_code} />
              <SectionInput label="Campaign Name" readonly={!this.props.writeAccess} type="text" value={this.props.campaign.campaign_name || ''} onChange={(event) => this.props.onUpdateCampaign('campaign_name', event.target.value)} />
              <SectionInput label="Description" readonly={!this.props.writeAccess} type="textarea" value={this.props.campaign.campaign_description || ''} onChange={(event) => this.props.onUpdateCampaign('campaign_description', event.target.value)} />
              <SectionInput label="Preference" readonly={!this.props.writeAccess} type="text" value={this.props.campaign.preference_sequence || ''} onChange={(event) => this.props.onUpdateCampaign('preference_sequence', event.target.value)} />
              <SectionInput
                label="Parent Campaign"
                options={this.parentCampaignOptions()}
                type="select" 
                value={this.props.campaign.parent_campaign_id || ''}
                onChange={(event) => this.onChangeParentCampaign(event ? event.value : null)}
              />
              <CampaignTreeView campaigns={this.props.campaigns} rootCampaign={this.props.campaign} />
            </div>
            <div className="col-6">
              <SectionInput label="Start Date" readonly={!this.props.writeAccess} type="date" value={this.props.campaign.start_dt || ''} onChange={(value) => this.props.onUpdateCampaign('start_dt', value)} />
              <SectionInput label="End Date" readonly={!this.props.writeAccess} type="date" value={this.props.campaign.end_dt || ''} onChange={(value) => this.props.onUpdateCampaign('end_dt', value)} />
              <SectionSelect
                label="Phone"
                options={this.props.campaignPhoneNumbers}
                readonly={!this.props.writeAccess}
                value={this.props.campaign.phone_number_raw}
                onChange={(event) => this.props.onUpdateCampaign('phone_number_raw', event.target.value)}
              />
              <div className="row form-group">
                <div className="col-4 text-right">
                  <label className="font-weight-bold mr-2">Segments</label>
                  <div>(Must match all)</div>
                </div>
                <div className="col">
                  {!!this.state.inheritedSegments.length &&
                    <React.Fragment>
                      <p>Inherited from parent:</p>
                      <SegmentsSelect
                        name={`campaign-inherited-${this.props.campaign.campaign_id}`}
                        segmentsAttributes={this.state.inheritedSegments}
                        writeAccess={false}
                      />
                      <hr />
                    </React.Fragment>
                  }
                  <SegmentsSelect
                    name={`campaign-${this.props.campaign.campaign_id}`}
                    segmentsAttributes={this.props.campaign.campaign_segments_attributes}
                    writeAccess={this.props.writeAccess}
                    onUpdateSegments={this.props.onUpdateSegments}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels,
    channelPartners: state.channelPartners,
    segments: state.segments,
    campaignPhoneNumbers: state.campaignPhoneNumbers,
    campaigns: state.campaigns,
  }
}

const mapDispatchToProps = {
  getCampaignPhoneNumbers,
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails)
