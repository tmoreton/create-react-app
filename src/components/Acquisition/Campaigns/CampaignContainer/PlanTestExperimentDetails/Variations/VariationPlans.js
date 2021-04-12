import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import BooleanToggle from '../../../../../Shared/BooleanToggle'

class VariationPlans extends Component {

  onEditPlan = (index, key, value) => {
    const plans = this.props.variation.campaign_experiment_variation_plans.map((plan, i) => {
      if (i === index) plan[key] = value
      return plan
    })
    this.props.onUpdatePlans(plans)
  }

  onChangePlan = (index, event, currentPlan) => {
    const value = event ? event.value : currentPlan.plan_code
    const plans = this.props.variation.campaign_experiment_variation_plans.map((plan, i) => {
      if (i === index) {
        plan = this.props.plans.find(p => p.plan_code === value)
      }
      return plan
    })
    this.props.onUpdatePlans(plans)
  }

  onRemovePlan = (index) => {
    const plans = this.props.variation.campaign_experiment_variation_plans
    plans.splice(index, 1)
    this.props.onUpdatePlans(plans)
  }

  planInfo(campaignPlan) {
    const plan = this.props.plans.find(p => p.plan_code === campaignPlan.plan_code)
    return (
      <div>
        <div>
          {plan.plan_name} - {plan.plan_code}
        </div>
        <div>
          <small>{campaignPlan.is_dynamic_rate ? 'Dynamic' : 'Static'} Rate</small>
        </div>
      </div>
    )
  }

  options() {
    return this.props.plans.map(option => (
      { value: option.plan_code, label: `${option.plan_name} - ${option.plan_code}` }
    ))
  }

  render() {
    if (this.props.plans.length === 0) return null

    return (
      this.props.variation.campaign_experiment_variation_plans.map((plan, i) => (
        <div key={`variation-plan-${i}`} className="mb-2">
          {this.props.canEditVariation ? (
            <div className="mb-3">
              <div className="row mb-2">
                <div className="col-3 text-right">
                  <label className="font-weight-bold mr-2">
                    Plan
                  </label>
                </div>
                <div className="col" style={{ zIndex: -(i + 1) + 99 }}>
                  <Select
                    options={this.options()}
                    value={plan.plan_code}
                    onChange={(event) => this.onChangePlan(i, event, plan)}
                  />
                </div>
                <div className="col-3">
                  <a className="text-primary" onClick={() => this.onRemovePlan(i)}>Remove Plan</a>
                </div>
              </div>
              <div className="row">
                <div className="col-3 offset-6">
                  <BooleanToggle falseLabel="Static" trueLabel="Dynamic" value={plan.is_dynamic_rate} onToggle={(value) => this.onEditPlan(i, 'is_dynamic_rate', value)} />
                </div>
              </div>
            </div>
          ) : (
            <div className="row form-group mb-1">
              <div className="col text-right">
                <label className="font-weight-bold mr-2">
                  Plan
                </label>
              </div>
              <div className="col text-truncate">
                {this.planInfo(plan)}
              </div>
              <div className="col-2" />
            </div>
          )}
        </div>
      ))
    )
  }
}

function mapStateToProps(state) {
  return {
    plans: Object.values(state.campaignPlans.info),
    campaign: state.campaign.info,
  }
}

export default connect(mapStateToProps)(VariationPlans)
