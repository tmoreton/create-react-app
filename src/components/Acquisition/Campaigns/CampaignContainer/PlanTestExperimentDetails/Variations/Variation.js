import React, { Component } from 'react'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import last from 'lodash/last'
import percentAllocationOptions from '../../../../../../utils/percentAllocationOptions'
import SectionInput from '../../../../../Shared/SectionInput'
import SectionSelect from '../../../../../Shared/SectionSelect'
import VariationPlans from './VariationPlans'

class Variation extends Component {

  onAddPlan = () => {
    const plan = cloneDeep(this.props.plans[0])
    const variationPlans = this.props.variation.campaign_experiment_variation_plans
    plan.display_sequence = variationPlans.length > 0 ? last(variationPlans).display_sequence + 1 : 1
    const plans = [...variationPlans, plan]
    this.onUpdatePlans(plans)
  }

  onUpdatePlans = (plans) => {
    this.props.onUpdateVariation(this.props.variation, 'campaign_experiment_variation_plans', plans)
  }

  onUpdateVariation = (key, value) => {
    this.props.onUpdateVariation(this.props.variation, key, value)
  }

  onDeleteVariation = () => {
    this.props.onDeleteVariation(this.props.variation)
  }

  canEditVariation() {
    return this.props.editable && this.props.writeAccess
  }

  render() {
    if (this.props.plans.length === 0) return null

    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-4">
            <SectionInput
              label="Name"
              readonly={!this.props.writeAccess}
              type="text"
              value={this.props.variation.variation_name}
              onChange={(event) => this.onUpdateVariation('variation_name', event.target.value)}
            />
            {(this.props.distributeEvenly || !this.props.writeAccess) ? (
              <div className="row form-group mb-1">
                <div className="col text-right">
                  <label className="font-weight-bold mr-2">
                  Traffic Distribution
                  </label>
                </div>
                <div className="col">
                  {!this.props.writeAccess ? `${(this.props.variation.percent_allocation * 100)}%` : 'Distributed Evenly'}
                </div>
              </div>
            ) : (
              <SectionSelect
                label="Traffic Distribution"
                labelKey="label"
                options={percentAllocationOptions}
                readonly={!this.props.writeAccess}
                value={this.props.variation.percent_allocation}
                valueKey="value"
                onChange={(event) => this.onUpdateVariation('percent_allocation', event.target.value)}
              />
            )}
            <div className="row">
              <div className="col text-right">
                {this.canEditVariation() && (<a className="text-primary" onClick={this.onDeleteVariation}>Delete Variation</a>)}
              </div>
            </div>
          </div>
          <div className="col-8">
            <VariationPlans
              canEditVariation={this.canEditVariation()}
              variation={this.props.variation}
              onUpdatePlans={this.onUpdatePlans}
            />
            {this.canEditVariation() && (
              <div className="row mt-3">
                <div className="col-5 text-right">
                  <button className="badge" onClick={this.onAddPlan}>Add Plan</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    plans: Object.values(state.campaignPlans.info),
  }
}

export default connect(mapStateToProps)(Variation)

Variation.defaultProps = {
  editable: true,
}
