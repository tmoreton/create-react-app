import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import last from 'lodash/last'
import cloneDeep from 'lodash/cloneDeep'
import qs from 'qs'
import { CAMPAIGNS } from '../../../../utils/roles'
import history from '../../../../history'
import getCampaign from '../../../../actions/campaigns/getCampaign'
import getCampaigns from '../../../../actions/campaigns/getCampaigns'
import getExperiment from '../../../../actions/experiments/getExperiment'
import getSegments from '../../../../actions/segments/getSegments'
import getPlansForCampaigns from '../../../../actions/campaigns/getPlansForCampaigns'
import createCampaign from '../../../../actions/campaigns/createCampaign'
import updateCampaign from '../../../../actions/campaigns/updateCampaign'
import saveCampaign from '../../../../actions/campaigns/saveCampaign'
import clearCampaign from '../../../../actions/campaigns/clearCampaign'
import saveCampaignExperiment from '../../../../actions/campaigns/saveCampaignExperiment'
import updateCampaignExperiment from '../../../../actions/campaigns/updateCampaignExperiment'
import { changeModule } from '../../../../actions/changeModule'
import SaveHeader from '../../../Shared/SaveHeader'
import CampaignDetails from './CampaignDetails'
import CampaignPlans from './CampaignPlans'
import PlanTestExperimentDetails from './PlanTestExperimentDetails'
import PriceTestExperimentDetails from './PriceTestExperimentDetails'

class CampaignContainer extends Component {

  constructor(props) {
    super(props)
    this.viewingExperiment = React.createRef()
    const params = qs.parse(props.location.search.split('?')[1])
    this.state = {
      saved: false,
      scrolled: params.experiment_id ? false : true,
      viewingExperimentId: params.experiment_id,
    }
  }

  componentDidMount() {
    this.props.getSegments()
    this.props.getPlansForCampaigns()
    this.props.changeModule('Campaigns')
    this.props.getCampaigns()
 
    if (!this.isNewCampaign()) {
      this.props.getCampaign(this.props.match.params.campaignId)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.campaignId !== prevProps.match.params.campaignId) {
      if (this.isNewCampaign()) {
        this.props.clearCampaign()
      } else {
        this.props.getCampaign(this.props.match.params.campaignId)
      }
    }

    if (prevProps.saving !== this.props.saving && !this.props.saving && !this.props.error) {
      this.setState({ saved: true })
      setTimeout(() => {
        this.setState({ saved: false })
      }, 2000)
    }
    const previousExpiredExperiments = this.filterExperiments(Object.values(prevProps.campaignExperiments), null, 'expired')
    const expiredExperiments = this.filterExperiments(Object.values(this.props.campaignExperiments), null, 'expired')
    if (previousExpiredExperiments.length !== expiredExperiments.length) {
      this.props.getCampaign(this.props.match.params.campaignId)
    }
    if (prevProps.campaign.campaign_id !== this.props.campaign.campaign_id && this.props.campaign.campaign_id) {
      history.push(`/campaigns/${this.props.campaign.campaign_id}`)
    }

    const params = qs.parse(this.props.location.search.split('?')[1])
    const parentCampaignId = params.parent_campaign_id
    if (this.isNewCampaign() && parentCampaignId !== this.props.campaign.parent_campaign_id) {
      this.props.updateCampaign({ ...this.props.campaign, parent_campaign_id: parentCampaignId })
    }
  }

  componentWillUnmount() {
    this.props.clearCampaign()
  }

  onScrolledTo = () => {
    this.setState({ scrolled: true })
  }

  writeAccess() {
    return this.props.roles.some(role => CAMPAIGNS.WRITE.includes(role.name))
  }

  isNewCampaign = () => {
    return this.props.match.params.campaignId === 'new'
  }

  onUpdateCampaign = (key, value) => {
    this.props.updateCampaign({ ...this.props.campaign, [key]: value })
  }

  onUpdateSegments = (campaign_segments_attributes) => {
    this.props.updateCampaign({ ...this.props.campaign, campaign_segments_attributes })
  }

  saveCampaign = () => {
    if (this.props.unsavedCampaignChanges) {
      this.props.campaign.campaign_segments_attributes = this.props.campaign.campaign_segments_attributes.map(segment => {
        segment.campaign_id = this.props.campaign.campaign_id
        return segment
      })
      this.props.saveCampaign(this.props.campaign)
    }
    Object.values(this.props.campaignExperiments).forEach(experiment => {
      if (experiment.unsavedChanges) this.props.saveCampaignExperiment(experiment, this.props.campaign)
    })
  }

  onAddPlan = () => {
    const campaignPlans = this.props.campaign.campaign_plans_attributes
    let plan = cloneDeep(this.props.plans[0])
    const display_sequence = this.props.campaign.campaign_plans_attributes.length === 0 ? 1 : last(this.props.campaign.campaign_plans_attributes).display_sequence + 1
    plan = { ...plan, display_sequence }
    campaignPlans.push(plan)
    this.replaceCampaignPlans(campaignPlans)
  }

  onRemovePlan = (index) => {
    const campaignPlans = this.props.campaign.campaign_plans_attributes
    campaignPlans.splice(index, 1)
    this.replaceCampaignPlans(campaignPlans)
  }

  onCreateExperiment = () => {
    history.push(`/campaigns/${this.props.campaign.campaign_id}/experiment/new`)
  }

  replaceCampaignPlans = (campaignPlans) => {
    this.props.updateCampaign({ ...this.props.campaign, campaign_plans_attributes: campaignPlans })
  }

  onChangeCampaignPlan = (index, value) => {
    const campaignPlans = this.props.campaign.campaign_plans_attributes
    const plan = this.props.plans.find(p => p.plan_code === value)
    campaignPlans[index] = plan
    this.replaceCampaignPlans(campaignPlans)
  }

  onChangeCampaignPlanValue = (index, key, value) => {
    const campaignPlans = this.props.campaign.campaign_plans_attributes
    campaignPlans[index][key] = value
    this.replaceCampaignPlans(campaignPlans)
  }

  unsavedChanges() {
    return this.props.unsavedCampaignChanges || Object.values(this.props.campaignExperiments).some(experiment => experiment.unsavedChanges)
  }

  validCampaign() {
    const requiredFields = ['campaign_name', 'start_dt']
    return requiredFields.every(field => !!this.props.campaign[field])
  }

  filterExperiments(experiments, type, filter) {
    const comparison = (experiment) => filter === 'active' ? (!experiment.experiment_end_dt || moment(experiment.experiment_end_dt) > moment()) : (moment(experiment.experiment_end_dt) < moment())
    const campaignExperiment = (experiment) => (!type || experiment.experiment_type === type) && (comparison(experiment, filter))
    return experiments.filter(experiment => campaignExperiment(experiment))
  }

  campaignExperiments(type) {
    return this.filterExperiments(this.props.campaign.campaign_experiments_attributes, type, 'active')
  }

  expiredExperiments(type) {
    return this.filterExperiments(this.props.campaign.campaign_experiments_attributes, type, 'expired')
  }

  hasExpiredExperiments(priceTests, planTests) {
    return (priceTests.length + planTests.length) > 0
  }

  parentCampaign() {
    const campaign = this.props.campaign
    return campaign.parent_campaign_id && Object.values(this.props.campaigns).find(c => c.campaign_id === campaign.parent_campaign_id)
  }

  render() {
    if ((!this.isNewCampaign() && !this.props.campaign.campaign_id) || this.props.loading) {
      return <div className="d-flex justify-content-center align-items-center" style={{ height: 500 }}><h4>Loading campaign...</h4></div>
    }

    const writeAccess = this.writeAccess()

    const priceTestExperiments = this.campaignExperiments('PRICE_TEST')
    const planTestExperiments = this.campaignExperiments('PLAN_TEST')
    const expiredPriceTestExperiments = this.expiredExperiments('PRICE_TEST')
    const expiredPlanTestExperiments = this.expiredExperiments('PLAN_TEST')
    const validCampaign = this.validCampaign()
    const parentCampaign = this.parentCampaign()

    return (
      <div className="container-fluid">
        {!this.state.scrolled && (
          <div className="position-fixed d-flex align-items-center justify-content-center" style={{ height: '75%', width: '75%', zIndex: 99 }}>
            <div className="d-flex flex-column align-items-center justify-content-center bg-white shadow" style={{ height: '100px', width: '300px', boxShadow: '2px 2px 15px rgba(0,0,0,0.3)' }}>
              <strong><i>Loading campaign experiment...</i></strong>
            </div>
          </div>
        )}
        <div>
          <a className="text-primary" onClick={() => history.push('/campaigns')}>← Back to Campaigns</a>
        </div>
        <SaveHeader
          name={this.props.campaign.campaign_name}
          saved={this.state.saved}
          unsavedChanges={this.unsavedChanges()}
          valid={validCampaign}
          writeAccess={writeAccess}
          onSave={this.saveCampaign}
        />
        { parentCampaign && <p>Child of
          <a className="text-primary" onClick={() => history.push(`/campaigns/${parentCampaign.campaign_id}`)}> {parentCampaign.campaign_name}</a></p>
        }
        { writeAccess && !this.isNewCampaign() && <div className="mb-3">
          <button
            className="btn btn-secondary text-right" disabled={this.unsavedChanges()}
            onClick={() => history.push(`/campaigns/new?parent_campaign_id=${this.props.campaign.campaign_id}`)}>
              Create Child Campaign
          </button>
        </div>
        }
        <div className="mb-3">
          <CampaignDetails
            campaign={this.props.campaign}
            writeAccess={writeAccess}
            onUpdateCampaign={this.onUpdateCampaign}
            onUpdateSegments={this.onUpdateSegments}
          />
        </div>
        <div className="mb-5">
          <CampaignPlans
            writeAccess={writeAccess}
            onAddPlan={this.onAddPlan}
            onChangeCampaignPlan={this.onChangeCampaignPlan}
            onChangeCampaignPlanValue={this.onChangeCampaignPlanValue}
            onRemovePlan={this.onRemovePlan}
          />
        </div>
        {priceTestExperiments.length > 0 && (
          <div>
            <h2>Price Tests</h2>
            <hr />
            {priceTestExperiments.map(experiment => (
              <div key={`price-test-experiment-details-${experiment.experiment_id}`} ref={this.state.viewingExperimentId === experiment.experiment_id && this.viewingExperiment}>
                <PriceTestExperimentDetails
                  campaign={this.props.campaign}
                  experiment={experiment}
                  planTestExperiments={planTestExperiments}
                  replaceCampaignPlans={this.replaceCampaignPlans}
                  viewingExperimentId={this.state.viewingExperimentId}
                  writeAccess={writeAccess}
                  onScrolledTo={this.onScrolledTo}
                />
              </div>
            ))}
          </div>
        )}
        {planTestExperiments.length > 0 && (
          <div>
            <h2>Plan Tests</h2>
            <hr />
            {planTestExperiments.map(experiment => (
              <div key={`plan-test-experiment-details-${experiment.experiment_id}`} ref={this.state.viewingExperimentId === experiment.experiment_id && this.viewingExperiment}>
                <PlanTestExperimentDetails
                  campaign={this.props.campaign}
                  experiment={experiment}
                  viewingExperimentId={this.state.viewingExperimentId}
                  writeAccess={writeAccess}
                  onScrolledTo={this.onScrolledTo}
                />
              </div>
            ))}
          </div>
        )}
        {writeAccess && (
          <div className="mb-3">
            <button className="btn btn-primary" disabled={!validCampaign} onClick={this.onCreateExperiment}>Create Experiment</button>
          </div>
        )}
        {this.hasExpiredExperiments(expiredPriceTestExperiments, expiredPlanTestExperiments) && (
          <div>
            <hr />
            <h4>Finished Experiments</h4>
            {expiredPriceTestExperiments.length > 0 && (
              <div>
                <h5>Price Tests</h5>
                <hr />
                {expiredPriceTestExperiments.map(experiment => (
                  <PriceTestExperimentDetails
                    key={`expired-price-test-experiment-details-${experiment.experiment_id}`}
                    campaign={this.props.campaign}
                    experiment={experiment}
                    writeAccess={false}
                  />
                ))}
              </div>
            )}
            {expiredPlanTestExperiments.length > 0 && (
              <div>
                <h5>Plan Tests</h5>
                <hr />
                {expiredPlanTestExperiments.map(experiment => (
                  <PlanTestExperimentDetails
                    key={`expired-plan-test-experiment-details-${experiment.experiment_id}`}
                    campaign={this.props.campaign}
                    experiment={experiment}
                    writeAccess={false}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign.info,
    campaigns: state.campaigns,
    plans: Object.values(state.campaignPlans.info),
    saving: state.campaign.saving,
    unsavedCampaignChanges: state.campaign.unsavedChanges,
    campaignExperiments: state.campaign.experiments,
    error: state.error.show,
    roles: state.user.roles,
    loading: state.user.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCampaign,
    getCampaigns,
    getExperiment,
    getSegments,
    getPlansForCampaigns,
    createCampaign,
    updateCampaign,
    saveCampaign,
    clearCampaign,
    saveCampaignExperiment,
    updateCampaignExperiment,
    changeModule,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer)
