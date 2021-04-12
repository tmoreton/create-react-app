import React, { Component } from 'react'
import { connect } from 'react-redux'
import getCampaignExperiment from '../../../../../actions/campaigns/getCampaignExperiment'
import updateCampaignExperiment from '../../../../../actions/campaigns/updateCampaignExperiment'
import saveCampaignExperiment from '../../../../../actions/campaigns/saveCampaignExperiment'
import updateVariation from '../../../../../actions/campaigns/updateVariation'
import ExperimentDetails from '../../../../Audience/Experiments/ExperimentContainer/ExperimentDetails'
import Variation from './Variations/Variation'
import Variations from './Variations'

class PlanTestExperimentDetails extends Component {

  constructor(props) {
    super(props)
    this.viewingExperiment = React.createRef()
    this.state = {
      distributeEvenly: false,
      scrolled: false,
      collapsed: props.experiment.experiment_id !== props.viewingExperimentId,
    }
  }

  componentDidMount() {
    this.props.getCampaignExperiment(this.props.experiment.experiment_id)
  }

  componentDidUpdate(prevProps) {
    const prevCampaignExperiment = prevProps.campaignExperiments[this.props.experiment.experiment_id]
    const newCampaignExperiment = this.props.campaignExperiments[this.props.experiment.experiment_id]
    if (!this.state.scrolled && prevCampaignExperiment !== newCampaignExperiment && this.props.viewingExperimentId === this.props.experiment.experiment_id) {
      window.scrollTo(0, this.viewingExperiment.current.offsetTop)
      this.props.onScrolledTo()
      this.setState({ scrolled: true })
    }
  }

  newVariations() {
    return this.campaignExperiment().variations.filter(variation => !variation.experiment_variation_id)
  }

  campaignExperiment() {
    return this.props.campaignExperiments[this.props.experiment.experiment_id]
  }

  onToggleDistributeEvenly = (distributeEvenly, campaignExperiment, markUnsaved) => {
    this.props.updateCampaignExperiment(campaignExperiment, markUnsaved)
    this.setState({ distributeEvenly })
  }

  onUpdateControl = (control, key, value) => {
    const campaignExperiment = this.campaignExperiment()
    control = { ...control, [key]: value }
    this.props.updateCampaignExperiment({ ...campaignExperiment, control })
  }

  onUpdateVariations = (variations) => {
    const campaignExperiment = this.campaignExperiment()
    this.props.updateCampaignExperiment({ ...campaignExperiment, variations })
  }

  onUpdateSegments = (experiment_segments_attributes) => {
    this.props.updateCampaignExperiment({ ...this.campaignExperiment(), experiment_segments_attributes })
  }

  onUpdateExperiment = (key, value) => {
    const campaignExperiment = this.campaignExperiment()
    this.props.updateCampaignExperiment({ ...campaignExperiment, [key]: value })
  }

  onDeleteExperiment = () => {
    const experiment_end_dt = new Date()
    this.props.saveCampaignExperiment({ ...this.campaignExperiment(), experiment_end_dt }, this.props.campaign)
  }

  render() {
    const campaignExperiment = this.campaignExperiment()
    if (!campaignExperiment) return null

    return (
      <div className="mb-3" ref={this.viewingExperiment}>
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <a onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
              <strong className="text-primary"><u>{campaignExperiment.experiment_name}</u></strong>
            </a>
            <div>
              {this.props.writeAccess && <a className="text-danger" onClick={this.onDeleteExperiment}>Stop Experiment</a>}
            </div>
          </div>
          {!this.state.collapsed && (
            <div className="card-body">
              <ExperimentDetails
                distributeEvenly={this.state.distributeEvenly}
                experiment={campaignExperiment}
                experiments={this.props.campaignExperiments}
                extraSegments={this.props.campaign.campaign_segments_attributes}
                writeAccess={this.props.writeAccess}
                onToggleDistributeEvenly={this.onToggleDistributeEvenly}
                onUpdateExperiment={this.onUpdateExperiment}
                onUpdateSegments={this.onUpdateSegments}
              />
              {campaignExperiment.control && (
                <div>
                  <h4>Control</h4>
                  <ul className="list-group list-group-flush">
                    <Variation
                      distributeEvenly={this.state.distributeEvenly}
                      editable={false}
                      variation={campaignExperiment.control}
                      writeAccess={this.props.writeAccess}
                      onUpdateVariation={this.onUpdateControl}
                    />
                  </ul>
                </div>
              )}
              <Variations
                distributeEvenly={this.state.distributeEvenly}
                variations={campaignExperiment.variations}
                writeAccess={this.props.writeAccess}
                onUpdateVariations={this.onUpdateVariations}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaignExperiments: state.campaign.experiments,
    segments: state.segments.info,
  }
}

const mapDispatchToProps = {
  updateVariation,
  getCampaignExperiment,
  updateCampaignExperiment,
  saveCampaignExperiment,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanTestExperimentDetails)
