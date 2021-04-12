import React, { Component } from 'react'
import { connect } from 'react-redux'
import startCase from 'lodash/startCase'
import history from '../../../../history'
import getExperimentTypes from '../../../../actions/experiments/getExperimentTypes'
import getExperimentSlugs from '../../../../actions/experiments/getExperimentSlugs'
import saveExperiment from '../../../../actions/experiments/saveExperiment'
import createExperiment from '../../../../actions/experiments/createExperiment'
import updateExperiment from '../../../../actions/experiments/updateExperiment'
import saveCampaign from '../../../../actions/campaigns/saveCampaign'
import getExperiment from '../../../../actions/experiments/getExperiment'
import clearExperiment from '../../../../actions/experiments/clearExperiment'
import Modal from '../../../Modal'
import SectionSelect from '../../../Shared/SectionSelect'
import SectionInput from '../../../Shared/SectionInput'

class CreateExperimentModal extends Component {

  componentDidMount() {
    this.props.getExperimentTypes()
    this.props.getExperimentSlugs()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.experiment.experiment_id !== this.props.experiment.experiment_id && !this.props.saving) {
      if (this.fromCampaigns()) {
        this.props.campaign.campaign_experiments_attributes.push({
          experiment_id: this.props.experiment.experiment_id,
        })
        this.props.saveCampaign(this.props.campaign)
        history.goBack()
      } else {
        history.push(`/experiments/${this.props.experiment.experiment_id}`)
      }
    }
  }

  componentWillUnmount() {
    this.props.clearExperiment()
  }

  onChange = (key, value) => {
    this.props.updateExperiment({ ...this.props.experiment, [key]: value })
  }

  saveExperiment = () => {
    if (this.props.experiment.experiment_id) {
      this.props.saveExperiment(this.props.experiment)
    } else {
      this.props.experiment.control = this.control()
      this.props.createExperiment(this.props.experiment)
    }
  }

  closeModal() {
    history.goBack()
  }

  title() {
    return 'Create Experiment' + (this.props.experiment.experiment_type ? ` - ${startCase(this.props.experiment.experiment_type)}` : '')
  }

  campaignExperimentVariationPlan(plan) {
    return {
      campaign_id: this.props.campaign.campaign_id,
      plan_code: plan.plan_code,
      display_sequence: plan.display_sequence,
      is_dynamic_rate: plan.is_dynamic_rate,
      price_experiment_ids: plan.price_experiment_ids,
    }
  }

  control() {
    switch (this.props.experiment.experiment_type) {
    case 'PLAN_TEST':
      return {
        variation_name: this.props.experiment.experiment_name + ' Control',
        percent_allocation: 1,
        campaign_experiment_variation_plans: this.props.campaign.campaign_plans_attributes.map(plan => this.campaignExperimentVariationPlan(plan)),
      }
    case 'FEATURE_TEST':
      return {
        variation_name: this.props.experiment.experiment_name + ' Control',
        percent_allocation: 1,
      }
    case 'PRICE_TEST':
      return {
        variation_name: this.props.experiment.experiment_name + ' Control',
        percent_allocation: 1,
      }
    default:
      return null
    }
  }

  fromCampaigns() {
    return !!this.props.match && !!this.props.match.params.campaignId
  }

  experimentTypes() {
    if (this.fromCampaigns()) {
      return this.props.experimentTypes.filter(type => ['PLAN_TEST', 'PRICE_TEST'].includes(type.experiment_type))
    } else {
      return this.props.experimentTypes
    }
  }

  slugError() {
    return this.props.experimentSlugs.includes(this.props.experiment.experiment_slug)
  }

  validExperiment() {
    const requiredFields = ['experiment_type', 'experiment_name', 'experiment_start_dt']
    if (this.props.experiment.experiment_type === 'FEATURE_TEST') {
      requiredFields.push('experiment_slug')
    }
    return requiredFields.every(field => !!this.props.experiment[field]) && !this.slugError()
  }

  render() {
    return (
      <div>
        <Modal ddcloseModal={this.closeModal} title={this.title()} visible={true}>
          <div className="my-3 col-6">
            <SectionSelect label="Experiment Type" labelKey="experiment_type_name" options={this.experimentTypes()} type="text" value={this.props.experiment.experiment_type} valueKey="experiment_type" onChange={(event) => this.onChange('experiment_type', event.target.value)} />
            <SectionInput label="Experiment Name" type="text" value={this.props.experiment.experiment_name} onChange={(event) => this.onChange('experiment_name', event.target.value)} />
            <SectionInput
              error={this.slugError() && 'Experiment slug already exists'}
              label="Experiment Slug"
              type="text"
              value={this.props.experiment.experiment_slug}
              onChange={(event) => this.onChange('experiment_slug', event.target.value)}
            />
            <SectionInput label="Description" type="textarea" value={this.props.experiment.experiment_description} onChange={(event) => this.onChange('experiment_description', event.target.value)} />
            <SectionInput label="Start Date" type="date" value={this.props.experiment.experiment_start_dt} onChange={(date) => this.onChange('experiment_start_dt', date)} />
            <SectionInput label="End Date" type="date" value={this.props.experiment.experiment_end_dt} onChange={(date) => this.onChange('experiment_end_dt', date)} />
          </div>
          <button className="btn btn-primary" disabled={!this.validExperiment()} onClick={this.saveExperiment}>Save</button>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    experimentTypes: state.experimentTypes,
    experimentSlugs: state.experiments.slugs,
    experiment: state.experiment.info,
    campaign: state.campaign.info,
    saving: state.experiment.saving,
  }
}

const mapDispatchToProps = {
  getExperimentTypes,
  updateExperiment,
  saveExperiment,
  createExperiment,
  saveCampaign,
  getExperiment,
  clearExperiment,
  getExperimentSlugs,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExperimentModal)
