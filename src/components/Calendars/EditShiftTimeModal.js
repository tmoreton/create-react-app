import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import history from '../../history'
import { getShift } from '../../actions/getShift'
import { editShift } from '../../actions/editShift'
import Modal from '../Modal'
import FormattedDate from '../FormattedDate'
import ScheduleTimePicker from '../CreateSchedule/ScheduleTimePicker'

class EditShiftTimeModal extends Component {

  constructor(props) {
    super(props)
    this.handleStartTime = this.handleStartTime.bind(this)
    this.handleHours = this.handleHours.bind(this)
    this.saveShift = this.saveShift.bind(this)
    this.state = {
      startDt: null,
      shiftHours: 0,
    }
  }

  componentDidMount() {
    this.props.getShift(this.props.match.params.locationCode, this.props.match.params.shiftId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.shift !== prevProps.shift) {
      this.setState({
        startDt: moment(this.props.shift.start_dt),
        shiftHours: this.props.shift.shift_hours,
      })
    }
  }

  closeModal() {
    history.goBack()
  }

  handleStartTime(startDt) {
    const shiftStartDate = moment(this.props.shift.start_dt)
    const newStartDt = shiftStartDate.year(shiftStartDate.year()).month(shiftStartDate.month()).date(shiftStartDate.date()).hours(startDt.hours()).minutes(startDt.minutes()).seconds(0)
    this.setState({ startDt: newStartDt })
  }

  handleHours(event) {
    this.setState({ shiftHours: event.target.value })
  }

  saveShift() {
    this.props.editShift(this.props.shift, this.state.startDt, this.state.shiftHours)
  }

  validSchedule() {
    return this.state.startDt && this.state.shiftHours > 0
  }

  render() {
    if (this.state.shiftHours === 0) {
      return (
        <Modal closeModal={this.closeModal} title={'Edit Shift Time'} visible={true}>
          <div>Loading...</div>
        </Modal>
      )
    }
    return (
      <Modal closeModal={this.closeModal} title={'Edit Shift Time'} visible={true}>
        <h2 className="text-center">{this.props.shift.location.location_name}</h2>
        <h3 className="text-center"><FormattedDate date={this.props.shift.start_dt} /></h3>
        <ScheduleTimePicker handleHours={this.handleHours} handleStartTime={this.handleStartTime} shiftHours={this.state.shiftHours} startDt={this.state.startDt} />
        <button className="btn btn-primary" disabled={!this.validSchedule()} onClick={this.saveShift}>Save</button>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    shift: state.shift.info,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getShift, editShift }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShiftTimeModal)
