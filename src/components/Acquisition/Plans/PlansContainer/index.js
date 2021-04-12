import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'
import { PLANS } from '../../../../utils/roles'
import history from '../../../../history'
import getPlans from '../../../../actions/plans/getPlans'
import savePlan from '../../../../actions/plans/savePlan'
import deactivatePlan from '../../../../actions/plans/deactivatePlan'
import deactivatePlans from '../../../../actions/plans/deactivatePlans'
import clearPlans from '../../../../actions/plans/clearPlans'
import { changeModule } from '../../../../actions/changeModule'
import NavTabs from '../../../Shared/NavTabs'
import PlansTable from './PlansTable'
import DeactivatePlans from './DeactivatePlans'
import PlansSearch from './PlansSearch'

const TABS = [
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

class PlansContainer extends Component {

  constructor(props) {
    super(props)
    const params = qs.parse(this.props.location.search.split('?')[1], { decoder(value) {
      switch (value) {
      case 'true':
        return true
      case 'false':
        return false
      default:
        return value
      }
    } })
    const state = {}
    Object.keys(params).forEach(param => {
      state[param] = params[param]
    })
    this.state = {
      tab: 'active',
      viewDeactivatingAllPlans: false,
      searchQuery: null,
      attributes: {},
      ...state,
    }
  }

  componentDidMount() {
    this.props.changeModule('Plans')
    if (this.state.searchQuery || !isEmpty(this.state.attributes)) this.refreshPlans()
  }

  componentWillUnmount() {
    this.props.clearPlans()
  }

  plans() {
    return this.props.plans.map(plan => ({
      ...plan,
      contract_duration: `${plan.contract_duration.match(/\d+/)[0]} months`,
      isActive: plan.is_active.toLocaleString(),
      is_default: plan.is_active.toLocaleString(),
    }))
  }

  getPlans = (tab) => {
    const attributes = {}
    Object.keys(this.state.attributes).forEach(attribute => {
      if (typeof this.state.attributes[attribute] === 'object') {
        attributes[attribute] = this.state.attributes[attribute].map(attr => attr.value)
      } else {
        attributes[attribute] = this.state.attributes[attribute]
      }
    })
    if (tab === 'all') {
      this.props.getPlans({ searchQuery: this.state.searchQuery, attributes })
    } else if (tab === 'active') {
      this.props.getPlans({ searchQuery: this.state.searchQuery, activeOnly: true, attributes })
    } else {
      this.props.getPlans({ searchQuery: this.state.searchQuery, activeOnly: false, attributes })
    }
  }

  refreshPlans = () => {
    this.getPlans(this.state.tab)
  }

  onChangeTab = (tab) => {
    this.getPlans(tab)
    this.setState({ tab })
  }

  onUpdateSearchQuery = (event) => {
    const state = { attributes: this.state.attributes, searchQuery: event.target.value }
    history.push(`/plans?${qs.stringify(state, { arrayFormat: 'repeat' })}`)
    this.setState({ searchQuery: event.target.value })
  }

  onUpdateAttributes = (attribute, options) => {
    const attributes = { ...this.state.attributes, [attribute]: options }

    if (typeof options === 'object' && isEmpty(options)) {
      delete attributes[attribute]
    }

    const state = { attributes, searchQuery: this.state.searchQuery }
    const params = qs.stringify(state)
    history.push(`/plans?${params}`)
    this.setState({ attributes })
  }

  onSearchPlans = () => {
    this.getPlans(this.state.tab)
    this.setState({ viewDeactivatingAllPlans: false })
  }

  createPlan = () => {
    history.push('/plans/new')
  }

  deactivatePlans = () => {
    this.setState({ viewDeactivatingAllPlans: true })
    this.props.deactivatePlans()
  }

  confirmDeactivate = (planCode) => {
    this.props.deactivatePlan({ planCode, confirm: true })
  }

  writeAccess() {
    return this.props.roles.some(role => PLANS.WRITE.includes(role.name))
  }

  render() {
    if (this.props.loading) return null

    const plans = this.plans()
    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Plans</h4>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-3 d-flex align-items-center">
            <NavTabs currentTab={this.state.tab} tabs={TABS} onChangeTab={this.onChangeTab} />
          </div>
          <div className="col">
            <a className="text-primary" onClick={this.refreshPlans}>
              <FontAwesomeIcon className="feather" icon={faSync} size="2x" />
            </a>
          </div>
          <div className="col d-flex justify-content-end">
            <a className="text-primary" onClick={this.createPlan}>Create plan</a>
          </div>
        </div>

        <PlansSearch
          attributes={this.state.attributes}
          contractDurations={this.props.contractDurations}
          contractTypes={this.props.contractTypes}
          searchQuery={this.state.searchQuery}
          onSearchPlans={this.onSearchPlans}
          onUpdateAttributes={this.onUpdateAttributes}
          onUpdateSearchQuery={this.onUpdateSearchQuery}
        />
        <PlansTable
          deactivatePlans={this.deactivatePlans}
          loadingPlans={this.props.loadingPlans}
          plans={plans}
          tab={this.state.tab}
        />

        <DeactivatePlans
          confirmDeactivate={this.confirmDeactivate}
          deactivating={this.props.deactivating}
          planCodeBeingDeactivated={this.props.planCodeBeingDeactivated}
          plans={plans}
          viewDeactivatingAllPlans={this.state.viewDeactivatingAllPlans}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    plans: Object.values(state.plans.info),
    contractTypes: state.planFeatures.contractTypes,
    contractDurations: state.planFeatures.contractDurations,
    planCodeBeingDeactivated: state.plan.planCodeBeingDeactivated,
    loadingPlans: state.plans.loading,
    savedPlanCode: state.plans.savedPlanCode,
    deactivating: state.plans.deactivating,
    roles: state.user.roles,
    loading: state.user.loading,
  }
}

const mapDispatchToProps = {
  changeModule,
  getPlans,
  savePlan,
  deactivatePlan,
  deactivatePlans,
  clearPlans,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansContainer)
