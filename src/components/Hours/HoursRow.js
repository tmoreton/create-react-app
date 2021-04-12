import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { approveShift } from '../../actions/approveShift'
import { updateTime } from '../../actions/updateShiftHours'
import { TimePicker } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HoursRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      start_dt: moment(this.props.shift.start_dt),
      end_dt: moment(this.props.shift.end_dt),
      date: moment(this.props.shift.start_dt).format('YYYY-MM-DD'),
    }
  }

  approveShift = () => {
    this.props.approveShift(this.props.shift.recorded_shift_id)
  }

  updateShift = () => {
    const { recorded_shift_id, location_code, agent_id } = this.props.shift
    const edit = this.state.editable ? false : true
    this.setState({ editable: edit })
    if (!edit) {
      this.props.updateTime('CLOCK_IN', recorded_shift_id, location_code, this.state.start_dt, agent_id)
      this.props.updateTime('CLOCK_OUT', recorded_shift_id, location_code, this.state.end_dt, agent_id)
    }
  }

  onStartChange = (time, newTime) => {
    const newDate = moment(this.state.date + ' ' + newTime)
    this.setState({ start_dt: newDate })
  }

  onEndChange = (time, newTime) => {
    const newDate = moment(this.state.date + ' ' + newTime)
    this.setState({ end_dt: newDate })
  }

  renderDate = () => {
    const momentDate = moment(this.state.start_dt).format('LL')
    return <p>{momentDate}</p>
  }

  renderStartTime = () => {
    const momentTime = moment(this.state.start_dt).format('h:mm:ss a')
    if (this.state.editable && this.props.shift.start_dt == null) return <TimePicker use12Hours value={moment()} onChange={this.onStartChange} />
    if (this.state.editable) return <TimePicker use12Hours value={this.state.start_dt} onChange={this.onStartChange} />
    return <p>{momentTime}</p>
  }

  renderEndTime = () => {
    const momentTime = moment(this.state.end_dt).format('h:mm:ss a')
    if (this.state.editable && this.props.shift.end_dt == null) return <TimePicker use12Hours value={moment()} onChange={this.onEndChange} />
    if (this.state.editable) return <TimePicker use12Hours value={this.state.end_dt} onChange={this.onEndChange} />
    return <p>{momentTime}</p>
  }

  renderApproved = () => {
    if (this.props.shift.approved_dt) return <FontAwesomeIcon icon="check" style={{ color: '#008000' }} />
    return <button onClick={this.approveShift}>Approve</button>
  }

  renderTotalTime = (start_dt, end_dt) => {
    var duration = moment(end_dt).diff(moment(start_dt))
    return moment.utc(duration).format('H:mm')
  }

  render() {
    const { source_code, agent_id, end_dt, start_dt, first_name, last_name, office_code, system_generated, location_name } = this.props.shift
    return (
      <tr style={{ backgroundColor: system_generated ? '#ff8a8a' : null }}>
        <th>{source_code ? source_code : this.props.user.sourceCode}</th>
        <th>{first_name + ' ' + last_name}</th>
        <th>{agent_id}</th>
        <th>{office_code}</th>
        <th>{location_name}</th>
        <th>{this.renderDate()}</th>
        <th>{this.renderStartTime()}</th>
        <th>{this.renderEndTime()}</th>
        <th>{this.renderTotalTime(start_dt, end_dt)}</th>
        <th>{this.props.hours === 'Unapproved' || this.state.hours === 'Approved' ? this.renderApproved() : null}</th>
        <th>{this.props.hours === 'Unapproved' || this.state.hours === 'Approved' ? <button onClick={this.updateShift}>{ this.state.editable ? 'Update' :'Edit'}</button> : null }</th>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ approveShift, updateTime }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HoursRow)
