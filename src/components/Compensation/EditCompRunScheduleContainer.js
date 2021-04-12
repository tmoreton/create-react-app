import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCompRunSchedule } from '../../actions/Compensation/getCompRunSchedule'
import { getDefaultPaymentRules } from '../../actions/Compensation/getDefaultPaymentRules'
import { updateCompRunSchedule } from '../../actions/Compensation/updateCompRunSchedule'
import { updateCompRunSchedulePaymentRules } from '../../actions/Compensation/updateCompRunSchedulePaymentRules'
import { saveUpdatedCompRunSchedule } from '../../actions/Compensation/saveUpdatedCompRunSchedule'
import CompRunScheduleForm from './CompRunScheduleForm'
import { getSources } from '../../actions/getSources'
import { getChannelPartners } from '../../actions/channels/getChannelPartners'
import history from '../../history'

export class EditCompRunScheduleContainer extends Component {

  componentDidMount() {
    this.props.getCompRunSchedule(this.props.match.params.compRunScheduleCode)
    this.props.getSources()
    this.props.getChannelPartners()
    this.props.getDefaultPaymentRules()
  }

  handleSubmit = () => {
    this.props.saveUpdatedCompRunSchedule(this.props.compRunSchedule, this.props.paymentRules)
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
        <h1>Edit Compensation Run Schedule {`${this.props.compRunSchedule.compRunScheduleName ? ' - ' +  this.props.compRunSchedule.compRunScheduleName : ''}`}</h1>
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
    sources: state.sources.all,
    channelPartners: state.channelPartners,
    compRunSchedule: state.compRunSchedule.compRunSchedule,
    saving: state.compRunSchedule.saving,
    paymentRules: state.compRunSchedule.paymentRules,
    defaultPaymentRules: state.defaultPaymentRules.defaultPaymentRules,
  }
}

const mapDispatchToProps = {
  getSources,
  getChannelPartners,
  getCompRunSchedule,
  getDefaultPaymentRules,
  saveUpdatedCompRunSchedule,
  updateCompRunSchedule,
  updateCompRunSchedulePaymentRules,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCompRunScheduleContainer)

EditCompRunScheduleContainer.defaultProps = {
  compRunSchedule: {},
  channelPartnerCodes: ['GIANT_EAGLE', 'REDNERS', 'BRAND'],
}
