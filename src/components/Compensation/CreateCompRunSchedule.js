import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCompRunSchedule } from '../../actions/Compensation/createCompRunSchedule'
import { updateCompRunSchedule } from '../../actions/Compensation/updateCompRunSchedule'
import { updateCompRunSchedulePaymentRules } from '../../actions/Compensation/updateCompRunSchedulePaymentRules'
import CompRunScheduleForm from './CompRunScheduleForm'
import { getSources } from '../../actions/getSources'
import { getChannelPartners } from '../../actions/channels/getChannelPartners'
import { getDefaultPaymentRules } from '../../actions/Compensation/getDefaultPaymentRules'
import history from '../../history'

export class CreateCompRunSchedule extends Component {

  componentDidMount() {
    this.props.getSources()
    this.props.getChannelPartners()
    this.props.getDefaultPaymentRules()
  }

  handleSubmit = () => {
    this.props.createCompRunSchedule(this.props.compRunSchedule, this.props.paymentRules)
    history.push(`/compensation/schedules/${this.props.compRunSchedule.compRunScheduleCode}/edit`)
  }

  handleCancel = () => {
    this.setState({ cancelConfirm: true })
  }

  handleCancelConfirm = () => {
    history.push('/compensation')
  }

  render() {
    return (
      <div>
        <h1>New Compensation Run Schedule {`${this.props.compRunSchedule.compRunScheduleName ? ' - ' +  this.props.compRunSchedule.compRunScheduleName : ''}`}</h1>
        <CompRunScheduleForm
          channelPartners={this.props.channelPartners}
          compRunSchedule={this.props.compRunSchedule}
          defaultPaymentRules={this.props.defaultPaymentRules}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          paymentRules={this.props.paymentRules}
          saving={this.props.saving}
          sources={this.props.sources}
          updateCompRunSchedule={this.props.updateCompRunSchedule}
          updateCompRunSchedulePaymentRules={this.props.updateCompRunSchedulePaymentRules}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compRules: state.compRules,
    saving: state.compRunSchedule.saving,
    sources: state.sources.all,
    channelPartners: state.channelPartners,
    compRunSchedule: state.compRunSchedule.compRunSchedule,
    defaultPaymentRules: state.defaultPaymentRules.defaultPaymentRules,
    paymentRules: state.compRunSchedule.paymentRules,
  }
}

const mapDispatchToProps = {
  getSources,
  getChannelPartners,
  getDefaultPaymentRules,
  createCompRunSchedule,
  updateCompRunSchedule,
  updateCompRunSchedulePaymentRules,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCompRunSchedule)
