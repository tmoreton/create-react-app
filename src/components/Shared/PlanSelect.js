import React, { Component } from 'react'
import { connect } from 'react-redux'
import getPlansForCampaigns from '../../actions/campaigns/getPlansForCampaigns'
import Select from 'react-select'

class PlanSelect extends Component {

  componentDidMount() {
    this.props.getPlansForCampaigns()
  }

  options() {
    return this.props.plans.map(option => (
      { value: option.plan_code, label: `${option.plan_name} - ${option.plan_code}` }
    ))
  }

  render() {
    return (
      <Select
        disabled={!this.props.writeAccess}
        options={this.options()}
        value={this.props.planCode}
        onChange={(event) => this.props.onChange(event ? event.value : this.props.planCode)}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    plans: Object.values(state.campaignPlans.info),
  }
}

const mapDispatchToProps = {
  getPlansForCampaigns,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelect)
