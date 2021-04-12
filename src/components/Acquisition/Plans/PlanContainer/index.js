import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import history from '../../../../history'
import { PLANS } from '../../../../utils/roles'
import { changeModule } from '../../../../actions/changeModule'
import getEnergyProducts from '../../../../actions/plans/getEnergyProducts'
import getPlan from '../../../../actions/plans/getPlan'
import updatePlan from '../../../../actions/plans/updatePlan'
import savePlan from '../../../../actions/plans/savePlan'
import createPlan from '../../../../actions/plans/createPlan'
import clonePlan from '../../../../actions/plans/clonePlan'
import clearPlan from '../../../../actions/plans/clearPlan'
import deactivatePlan from '../../../../actions/plans/deactivatePlan'
import SaveHeader from '../../../Shared/SaveHeader'
import Loading from '../../../Shared/Loading'
import PlanErrors from './PlanErrors'
import PlanDetails from './PlanDetails'
import PlanRewards from './PlanRewards'
import PlanReferences from './PlanReferences'

const REQUIRED_FIELDS = ['plan_name', 'contract_duration', 'contract_type_code', 'energy_product_code']

class PlanContainer extends Component {

  state = {
    saved: false,
    confirmDeactivate: false,
  }

  componentDidMount() {
    if (!this.newPlan()) {
      this.props.getPlan(this.props.match.params.planCode)
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.saving !== this.props.saving && !this.props.saving) && !this.props.error) {
      this.setState({ saved: true })
      setTimeout(() => {
        this.setState({ saved: false })
      }, 2000)
    }
    if ((prevProps.creating !== this.props.creating && this.props.plan.plan_code) && !this.props.error) {
      history.push(`/plans/${this.props.plan.plan_code}`)
    }
    if ((this.props.cloning && prevProps.plan.plan_code !== this.props.plan.plan_code) && !this.props.error) {
      history.push(`/plans/${this.props.plan.plan_code}`)
    }
    if ((prevProps.plan.is_active !== this.props.plan.is_active && !this.props.plan.is_active)) {
      this.setState({ confirmDeactivate: false })
    }
    if ((prevProps.plan.plan_code !== this.props.plan.plan_code)) {
      this.props.getPlan(this.props.plan.plan_code)
      this.props.changeModule(null, this.props.plan.plan_name)
    }
  }

  componentWillUnmount() {
    this.props.clearPlan()
  }

  writeAccess() {
    return this.props.roles.some(role => PLANS.WRITE.includes(role.name)) && !this.state.confirmDeactivate
  }

  hasCampaigns = () => {
    return !isEmpty(this.props.plan.campaigns)
  }

  newPlan() {
    return this.props.match.params.planCode === 'new'
  }

  onDeletePlan = () => {
    this.props.deactivatePlan()
    this.setState({ confirmDeactivate: true })
  }

  onClonePlan = () => {
    this.props.clonePlan(this.props.plan.plan_code)
  }

  onUpdatePlan = (key, value) => {
    this.props.updatePlan({ ...this.props.plan, [key]: value })
  }

  onUpdateAttributes = (attribute, options) => {
    const plan = { ...this.props.plan, [attribute]: options }
    this.props.updatePlan(plan)
  }

  savePlan = () => {
    if (this.props.plan.plan_code) {
      this.props.savePlan()
    } else {
      this.props.createPlan()
    }
  }

  validPlan() {
    return REQUIRED_FIELDS.every(field => !!this.props.plan[field]) && !isEmpty(this.props.plan.marketing_highlights)
  }

  disableConfirm = () => {
    return this.hasCampaigns()
  }

  dismissConfirm = () => {
    this.setState({ confirmDeactivate: false })
  }

  hasBeenAssignedToOffers() {
    return this.props.plan.recent_offers && this.props.plan.recent_offers.length > 0
  }

  render() {
    if (!this.newPlan() && (this.props.loading || !this.props.userLoaded)) return <Loading />

    const writeAccess = this.writeAccess()
    const readonly = this.hasBeenAssignedToOffers()

    return (
      <div>
        <div>
          <a className="text-primary" onClick={() => history.push('/plans')}>← Back to Plans</a>
        </div>
        <SaveHeader
          name={this.props.plan.plan_name}
          saved={this.state.saved}
          saving={this.props.saving}
          unsavedChanges={this.props.unsavedChanges}
          valid={this.validPlan()}
          writeAccess={!readonly && writeAccess}
          onSave={this.savePlan}
        />

        {this.props.cloning ? (
          <div className="mt-5">
            <h5>Cloning {this.props.plan.plan_name}...</h5>
          </div>
        ) : (
          <div>
            <PlanErrors
              confirmDeactivate={this.state.confirmDeactivate}
              deactivatePlan={() => this.props.deactivatePlan({ confirm: true })}
              deactivatingPlan={this.props.deactivatingPlan}
              dismissConfirm={this.dismissConfirm}
              errors={this.props.errors}
              warnings={this.props.warnings}
            />

            {this.hasBeenAssignedToOffers() && (
              <div className="mb-3 p-2 rounded" style={{ backgroundColor: 'rgba(255,184,23,.75)' }}>
                <small>This plan cannot be edited because it has already been assigned to an offer. Clone this plan instead.</small>
              </div>
            )}

            <PlanDetails
              plan={this.props.plan}
              readonly={readonly || !writeAccess}
              onClonePlan={this.onClonePlan}
              onDeletePlan={this.onDeletePlan}
              onUpdatePlan={this.onUpdatePlan}
            />

            <PlanRewards
              plan={this.props.plan}
              readonly={readonly || !writeAccess}
              onUpdateAttributes={this.onUpdateAttributes}
            />

            {this.props.plan.plan_code && (
              <PlanReferences
                plan={this.props.plan}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    plan: state.plan.info,
    deactivatingPlan: state.plan.deactivating,
    warnings: state.plan.warnings,
    errors: state.plan.errors,
    energyProducts: state.planFeatures.energyProducts,
    unsavedChanges: state.plan.unsavedChanges,
    loading: state.plan.loading,
    saving: state.plan.saving,
    creating: state.plan.creating,
    cloning: state.plan.cloning,
    roles: state.user.roles,
    userLoaded: state.user.userLoaded,
  }
}

const mapDispatchToProps = {
  changeModule,
  getEnergyProducts,
  getPlan,
  updatePlan,
  createPlan,
  clonePlan,
  savePlan,
  clearPlan,
  deactivatePlan,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanContainer)
