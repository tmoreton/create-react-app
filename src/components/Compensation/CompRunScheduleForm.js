import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import history from '../../history'
import moment from 'moment'
import CompRunScheduleFormSchedule from './CompRunScheduleFormSchedule'
import CompRunScheduleFormPaymentRules from './CompRunScheduleFormPaymentRules'
import getCompAttributes from '../../actions/Compensation/getCompAttributes'

class CompRunScheduleForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cancelConfirm: false,
    }
  }

  componentDidMount() {
    if (this.props.compAttributes.length === 0) {
      this.props.getCompAttributes()
    }
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
        <CompRunScheduleFormSchedule
          channelPartners={this.props.channelPartners}
          compRunSchedule={this.props.compRunSchedule}
          sources={this.props.sources}
          updateCompRunSchedule={this.props.updateCompRunSchedule}
        />
        <CompRunScheduleFormPaymentRules
          compAttributes={this.props.compAttributes}
          defaultPaymentRules={this.props.defaultPaymentRules}
          paymentRules={this.props.paymentRules}
          updateCompRunSchedulePaymentRules={this.props.updateCompRunSchedulePaymentRules}
        />

        <div className="mt-4 mb-2 col-auto">
          <button className="btn btn-dark" onClick={this.props.handleSubmit}>
            {this.props.saving ? 'Saving...' : 'Save' }
          </button>
        </div>

        <div className={`mt-4 mb-2 col-auto ${this.props.compRunSchedule.updatedAt ? '' : 'd-none'}`}>
          <strong>Schedule Updated:</strong> {this.props.compRunSchedule.updatedAt && moment(this.props.compRunSchedule.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
        </div>

        <div className={`mt-4 mb-2 col-auto ${this.props.paymentRules[0] && this.props.paymentRules[0].updatedAt ? '' : 'd-none'}`}>
          <strong>Rules Updated:</strong> {this.props.paymentRules[0] && this.props.paymentRules[0].updatedAt && moment(this.props.paymentRules[0].updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
        </div>

        <div className={`mt-4 mb-2 col-auto ${this.state.cancelConfirm === true ? 'd-none' : ''}`}>
          <button className="btn btn-secondary" onClick={this.handleCancel}>Back</button>
        </div>

        <div className={`mt-4 mb-2 col-auto ${this.state.cancelConfirm === true ? 'd-auto' : 'd-none'}`}>
          <button className="btn btn-secondary" onClick={this.handleCancelConfirm}>Are you sure?</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ compRunSchedules }) {
  return {
    compAttributes: compRunSchedules.compAttributes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompAttributes }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompRunScheduleForm)
