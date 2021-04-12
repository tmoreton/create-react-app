import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'
import CalendarShiftInfo from './CalendarShiftInfo'
import FormattedTime from '../FormattedTime'

class CalendarDayLocation extends Component {

  shifts() {
    if (this.props.officeCode) {
      return this.props.shifts.filter(shift => shift.office_code === this.props.officeCode)
    } else {
      return this.props.shifts
    }
  }

  handleEditShiftTime(shift) {
    history.push(`/partners/${this.props.sourceCode}/schedules/locations/${this.props.location.location_code}/shifts/${shift.location_shift_id}/edit`)
  }

  renderShiftTime(shift) {
    return (
      <a className="text-primary" onClick={() => this.handleEditShiftTime(shift)}>
        <FormattedTime date={shift.start_dt} /> - <FormattedTime date={shift.end_dt} />
      </a>
    )
  }

  render() {
    const { location, handleShiftSelect } = this.props
    return (
      <div className="p-2 border border-muted">
        <h6>{location.location_name}</h6>
        {this.shifts().map(shift => (
          <div key={shift.location_shift_id} className="text-center">
            {this.renderShiftTime(shift)}
            <CalendarShiftInfo
              handleShiftSelect={handleShiftSelect}
              location={location}
              partnerView={true}
              shift={shift}
              view="day"
            />
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    officeCode: state.sourceOfficeFilter,
  }
}

export default connect(mapStateToProps)(CalendarDayLocation)
