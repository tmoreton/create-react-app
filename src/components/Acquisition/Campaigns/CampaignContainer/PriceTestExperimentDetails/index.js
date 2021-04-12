import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'lodash/sortBy'
import getCampaignExperiment from '../../../../../actions/campaigns/getCampaignExperiment'
import updateCampaignExperiment from '../../../../../actions/campaigns/updateCampaignExperiment'
import saveCampaignExperiment from '../../../../../actions/campaigns/saveCampaignExperiment'
import ExperimentDetails from '../../../../Audience/Experiments/ExperimentContainer/ExperimentDetails'
import Variation from './Variation'
import PriceTestPlans from './PriceTestPlans'

class PriceTestExperimentDetails extends Component {

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
    if (!this.state.scrolled && prevCampaignExperiment !== newCampaignExperiment && this.props.viewingExperimentId === this.props.experiment.experiment_id && this.props.plans.length > 0) {
      window.scrollTo(0, this.viewingExperiment.current.offsetTop)
      this.props.onScrolledTo()
      this.setState({ scrolled: true })
    }
  }

  writeAccess() {
    return !this.props.expired && this.props.writeAccess
  }

  campaignExperiment() {
    return this.props.campaignExperiments[this.props.experiment.experiment_id]
  }

  variations() {
    return sortBy(this.campaignExperiment().variations, ['created_at'])
  }

  onUpdateExperiment = (key, value) => {
    const campaignExperiment = this.campaignExperiment()
    this.props.updateCampaignExperiment({ ...campaignExperiment, [key]: value })
  }

  onDeleteExperiment = () => {
    const experiment_end_dt = new Date()
    this.props.saveCampaignExperiment({ ...this.campaignExperiment(), experiment_end_dt }, this.props.campaign)
  }

  onToggleDistributeEvenly = (distributeEvenly, campaignExperiment, markUnsaved) => {
    this.props.updateCampaignExperiment(campaignExperiment, markUnsaved)
    this.setState({ distributeEvenly })
  }

  onUpdateSegments = (experiment_segments_attributes) => {
    this.props.updateCampaignExperiment({ ...this.campaignExperiment(), experiment_segments_attributes })
  }

  onUpdateControl = (_control, key, value) => {
    const campaignExperiment = this.campaignExperiment()
    const control = campaignExperiment.control
    control[key] = value
    this.props.updateCampaignExperiment({ ...campaignExperiment, control })
  }

  onAddVariation = () => {
    const campaignExperiment = this.campaignExperiment()
    const newVariation = {
      variation_name: `Variation ${campaignExperiment.variations.length}`,
      percent_allocation: 0,
      config: {},
    }
    const variations = campaignExperiment.variations.concat(newVariation)
    this.props.updateCampaignExperiment({ ...campaignExperiment, variations })
  }

  onUpdateVariation = (variation, key, value) => {
    const campaignExperiment = this.campaignExperiment()
    const variations = campaignExperiment.variations.map(v => {
      if (v.experiment_variation_id === variation.experiment_variation_id) {
        v[key] = value
      }
      return v
    })
    this.props.updateCampaignExperiment({ ...campaignExperiment, variations })
  }

  onDeleteVariation = (index) => {
    const campaignExperiment = this.campaignExperiment()
    const variations = campaignExperiment.variations.filter((_v, i) => {
      return i !== index
    })
    this.props.updateCampaignExperiment({ ...campaignExperiment, variations })
  }

  renderDate(date) {
    return date ? new Date(this.campaignExperiment().experiment_start_dt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : ''
  }

  campaignPlans() {
    return this.props.campaign.campaign_plans_attributes
  }

  render() {
    const writeAccess = this.writeAccess()
    const campaignExperiment = this.campaignExperiment()
    if (!campaignExperiment) return null
    if (this.props.plans.length === 0) return null

    return (
      <div className="mb-3" ref={this.viewingExperiment}>
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <a onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
              <strong className="text-primary"><u>{campaignExperiment.experiment_name}</u></strong>
            </a>
            <div>
              {writeAccess && <a className="text-danger" onClick={this.onDeleteExperiment}>Stop Experiment</a>}
            </div>
          </div>
          {!this.state.collapsed && (
            <div className="card-body">
              <ExperimentDetails
                distributeEvenly={this.state.distributeEvenly}
                experiment={campaignExperiment}
                experiments={this.props.campaignExperiments}
                extraSegments={this.props.campaign.campaign_segments_attributes}
                writeAccess={writeAccess}
                onToggleDistributeEvenly={this.onToggleDistributeEvenly}
                onUpdateExperiment={this.onUpdateExperiment}
                onUpdateSegments={this.onUpdateSegments}
              />
              <div>
                <h4>Control</h4>
                <ul className="list-group list-group-flush">
                  <Variation
                    control
                    distributeEvenly={this.state.distributeEvenly}
                    variation={campaignExperiment.control}
                    writeAccess={writeAccess}
                    onUpdateVariation={this.onUpdateControl}
                  />
                </ul>
              </div>
              <div className="mb-3">
                <h4>Variations</h4>
                <ul className="list-group list-group-flush">
                  {campaignExperiment.variations.map((variation, i) => (
                    <Variation
                      key={`plan-test-${campaignExperiment.experiment_id}-variation-${i}`}
                      distributeEvenly={this.state.distributeEvenly}
                      index={i}
                      variation={variation}
                      writeAccess={writeAccess}
                      onDeleteVariation={this.onDeleteVariation}
                      onUpdateVariation={this.onUpdateVariation}
                    />
                  ))}
                </ul>
                {writeAccess && <button className="btn btn-secondary my-3" onClick={this.onAddVariation}>Add Variation</button>}
              </div>
              <PriceTestPlans
                campaign={this.props.campaign}
                campaignExperiments={this.props.campaignExperiments}
                campaignPlans={this.campaignPlans()}
                experiment={this.props.experiment}
                planTestExperiments={this.props.planTestExperiments}
                plans={this.props.plans}
                replaceCampaignPlans={this.props.replaceCampaignPlans}
                updateCampaignExperiment={this.props.updateCampaignExperiment}
                writeAccess={writeAccess}
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
    plans: Object.values(state.campaignPlans.info),
  }
}

const mapDispatchToProps = {
  getCampaignExperiment,
  updateCampaignExperiment,
  saveCampaignExperiment,
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceTestExperimentDetails)

PriceTestExperimentDetails.defaultProps = {
  planTestExperiments: [],
}
