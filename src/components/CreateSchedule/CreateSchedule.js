import React, { Component } from 'react'
import omit from 'lodash/omit'
import DaysOfWeek from './DaysOfWeek'
import ScheduleTimePicker from './ScheduleTimePicker'

class CreateSchedule extends Component {

  constructor(props) {
    super(props)
    this.selectDay = this.selectDay.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.handleStartTime = this.handleStartTime.bind(this)
    this.handleHours = this.handleHours.bind(this)
    this.saveSchedule = this.saveSchedule.bind(this)
    this.saveSchedule = this.saveSchedule.bind(this)
    this.state = {
      selectedDays: this.props.schedule.days || {},
      startDt: this.props.schedule.start_dt || '',
      shiftHours: this.props.schedule.shift_hours || 0,
      locationScheduleConfigId : this.props.schedule.location_schedule_config_id || '',
    }
  }

  selectDay(day) {
    const selectedDays = this.state.selectedDays
    if (selectedDays[day._id]) {
      this.setState({ selectedDays: omit(selectedDays, day._id) })
    } else {
      this.setState({ selectedDays: { ...selectedDays, ...{ [day._id]: day } } })
    }
  }

  isSelected(day) {
    return !!this.state.selectedDays[day._id]
  }

  validSchedule() {
    return Object.keys(this.state.selectedDays).length > 0 && this.state.startDt && this.state.shiftHours > 0
  }

  handleStartTime(startDt) {
    this.setState({ startDt })
  }

  handleHours(event) {
    this.setState({ shiftHours: event.target.value })
  }

  saveSchedule() {
    this.props.saveSchedule(this.props.locationsToSchedule, this.state)
  }

  render() {

    return (
      <div className="container">
        <DaysOfWeek isSelected={this.isSelected} selectDay={this.selectDay} />
        <ScheduleTimePicker handleHours={this.handleHours} handleStartTime={this.handleStartTime} shiftHours={this.state.shiftHours} startDt={this.state.startDt} />
        <button className="btn btn-primary" disabled={!this.validSchedule()} onClick={this.saveSchedule}>Save</button>
        {this.props.children}
      </div>
    )
  }
}

export default CreateSchedule
