import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import matchSorter from 'match-sorter'
import { CAMPAIGNS } from '../../../../utils/roles'
import history from '../../../../history'
import getCampaigns from '../../../../actions/campaigns/getCampaigns'
import getCampaignSegments from '../../../../actions/segments/getCampaignSegments'
import { changeModule } from '../../../../actions/changeModule'
import NavTabs from '../../../Shared/NavTabs'

import CampaignsTableView from './CampaignsTableView'
import CampaignsGraphView from './CampaignsGraphView'

const tabs = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'active',
    label: 'Active',
  },
  {
    key: 'inactive',
    label: 'Inactive',
  },
]

class CampaignsContainer extends Component {

  state = {
    tab: 'active',
    filterBlankPriority: true,
    contentType: 'table',
  }

  componentDidMount() {
    this.props.getCampaigns()
    this.props.getCampaignSegments()
    this.props.changeModule('Campaigns')
  }

  parentCampaign(childCampaign) {
    if (!childCampaign.parent_campaign_id) {
      return null
    }
    return Object.values(this.props.campaigns).find(campaign => campaign.campaign_id === childCampaign.parent_campaign_id)
  }

  filteredCampaigns() {
    const campaigns = Object.values(this.props.campaigns)
    const filter = (c) => {return !this.state.filterBlankPriority || !!c.preference_sequence === this.state.filterBlankPriority}
    if (this.state.tab === 'all') {
      return campaigns.filter(c => filter(c))
    } else if (this.state.tab === 'inactive') {
      return campaigns.filter(c => (moment(c.end_dt) < moment(new Date())) && filter(c))
    } else {
      return campaigns.filter(c => (moment(c.end_dt) > moment(new Date()) || !c.end_dt) && filter(c))
    }
  }

  tableData() {
    return this.filteredCampaigns().map(campaign => {
      const parentCampaign = this.parentCampaign(campaign)
      const parentCampaignName = parentCampaign ? parentCampaign.campaign_name : null
      const modified = { ...campaign, parent_campaign: parentCampaignName }
      delete modified.parent_campaign_id
      return modified
    })
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
  }

  createCampaign = () => {
    history.push('/campaigns/new')
  }

  handleSectionSelect = (campaign) => {
    history.push(`/campaigns/${campaign.campaign_id}`)
  }

  onFilterBlankPriority = (event) => {
    const filterBlankPriority = event.target.checked
    this.setState({ filterBlankPriority })
  }

  header(column) {
    if (column === 'preference_sequence') {
      return 'Priority'
    } else if (column === 'start_dt') {
      return 'Start'
    } else if (column === 'end_dt') {
      return 'End'
    } else if (column === 'cc_code') {
      return 'cc_code'
    } else {
      return startCase(column)
    }
  }

  tableColumns() {
    const columns = []
    const columnsToHide = ['campaign_id', 'assignment_rules_deprecated', 'phone_number', 'created_at', 'updated_at']

    Object.keys(this.tableData()[0]).forEach(column => {
      if (!columnsToHide.includes(column)) {
        columns.push({
          Header: this.header(column),
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => (
            matchSorter(rows, filter.value, { keys: [column] })
          ),
          filterAll: true,
        })
      }
    })
    return columns
  }

  writeAccess() {
    return this.props.roles.some(role => CAMPAIGNS.WRITE.includes(role.name))
  }

  renderContent() {
    if (isEmpty(this.filteredCampaigns())) {
      return <p>No {this.state.tab} campaigns</p>
    }

    if (this.state.contentType === 'table') {
      return <CampaignsTableView columns={this.tableColumns()} data={this.tableData()} onSelect={this.handleSectionSelect}  />
    } else {
      return <CampaignsGraphView campaigns={this.filteredCampaigns()} segments={this.props.campaignSegments || []} />
    }
  }

  render() {
    if (this.props.loading) return null

    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Campaigns</h4>
        </div>
        <div className="row align-items-center mb-4 mr-4">
          <div className="col-6 d-flex align-items-center">
            <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
            <input checked={this.state.filterBlankPriority} className="ml-3 mr-1" type="checkbox" onChange={this.onFilterBlankPriority} />Filter blank priority
          </div>
          <div style={{ flexGrow: 1 }} />

          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label key="select-tree-view" className={`btn btn-primary ${this.state.contentType === 'tree' ? 'active' : ''}`}>
              <input autoComplete="off" id="option1" name="options" type="radio" onChange={() => this.setState({ contentType: 'tree' })} />
                Tree View
            </label>
            <label key="select-table-view" className={`btn btn-primary ${this.state.contentType === 'table' ? 'active' : ''}`}>
              <input autoComplete="off" id="option2" name="options" type="radio" onChange={() => this.setState({ contentType: 'table' })} />
                List View
            </label>
          </div>
        </div>

        { this.renderContent() }

        {this.writeAccess() && <button className="btn btn-primary" onClick={this.createCampaign}>Create Campaign</button>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaigns: state.campaigns,
    campaignSegments: state.campaignSegments.info,
    roles: state.user.roles,
    loading: state.user.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getCampaigns, getCampaignSegments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsContainer)
