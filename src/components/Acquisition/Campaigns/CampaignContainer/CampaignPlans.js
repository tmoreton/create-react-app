import React, { Component } from 'react'
import { connect } from 'react-redux'
import BooleanToggle from '../../../Shared/BooleanToggle'
import FuzzySelect from '../../../Shared/FuzzySelect'

class CampaignPlans extends Component {

  constructor(props) {
    super(props)
    this.state = {
      plansRecentChecked: false,
    }
  }

  options() {
    return this.props.plans.filter(
      plan => !this.state.plansRecentChecked || plan.is_recent === this.state.plansRecentChecked
    ).map(plan => (
      { value: plan.plan_code, label: this.planLabel(plan) }
    ))
  }

  planLabel(plan) {
    var label = `${plan.plan_name} - ${plan.plan_code} - ${plan.contract_type_code} - ${plan.contract_duration}`
    plan.plan_promos.forEach(plan_promo => label = label.concat(` - ${plan_promo.promo_code}`))
    plan.plan_loyalty_programs.forEach(plan_loyalty_program => label = label.concat(` - ${plan_loyalty_program.loyalty_program_code}`))
    return label
  }

  renderPlan(plan, i) {
    return (
      <div key={`${plan.plan_code}-${i}`}>
        <div className="row mb-2 align-items-center">
          <div className="col-7 form-group">
            <div className="row align-items-center">
              <div className="col-2 text-right">
                <label className="font-weight-bold mr-2 mb-0">
                  Plan
                </label>
              </div>
              <div className="col-9">
                <FuzzySelect
                  disabled={!this.props.writeAccess}
                  options={this.options()}
                  value={plan.plan_code}
                  onChange={(event) => this.props.onChangeCampaignPlan(i, event ? event.value : plan.plan_code)}
                />
              </div>
            </div>
          </div>
          <div className="col-2 form-group">
            <div className="row">
              <BooleanToggle disabled={!this.props.writeAccess} falseLabel="Static" trueLabel="Dynamic" value={plan.is_dynamic_rate} onToggle={(value) => this.props.onChangeCampaignPlanValue(i, 'is_dynamic_rate', value)} />
            </div>
          </div>
          <div className="col-2 form-group d-flex justify-content-end">
            {(this.props.campaign.campaign_plans_attributes.length > 1 && this.props.writeAccess) &&
              <a className="text-primary" onClick={() => this.props.onRemovePlan(i)}>Remove Plan</a>
            }
          </div>
        </div>
        <hr />
      </div>
    )
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="mb-2"><strong>Campaign Plans</strong></div>
          <div className="row form-group">
            <div className="col-2" title="Plans created or utilized by a shopper in the last 45 days">
              <label className="font-weight-bold mr-2 form-check-label">Recent</label>
              <input checked={this.state.plansRecentChecked} type="checkbox" onChange={(event) => this.setState({ plansRecentChecked: event.target.checked })} />
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              {this.props.loadingPlans ? (
                <h5>Loading plans...</h5>
              ) : (
                <div>
                  {this.props.campaign.campaign_plans_attributes.map((plan, i) => (this.renderPlan(plan, i)))}
                  {this.props.writeAccess && (
                    <div className="col-10">
                      <button className="badge" onClick={this.props.onAddPlan}>Add Plan</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign.info,
    plans: Object.values(state.campaignPlans.info),
    loadingPlans: state.campaignPlans.loading,
  }
}

export default connect(mapStateToProps)(CampaignPlans)
