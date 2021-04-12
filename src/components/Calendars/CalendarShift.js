import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormattedDate from '../FormattedDate'
import FormattedTime from '../FormattedTime'
import CalendarShiftInfo from './CalendarShiftInfo'

class CalendarShift extends Component {

  showShift(shift) {
    return !this.props.officeCode || (shift.office_code === this.props.officeCode)
  }

  render() {
    const { shifts, handleShiftSelect, handleEditShiftTime, partnerView, showPartner, view } = this.props
    const time = (shift) => {
      if (shift.location_shift_id) {
        return <a className="text-primary" onClick={() => handleEditShiftTime(shift)}><FormattedTime date={shift.start_dt} /> - <FormattedTime date={shift.end_dt} /></a>
      } else {
        return <div><FormattedTime date={shift.start_dt} /> - <FormattedTime date={shift.end_dt} /></div>
      }
    }

    let shiftsInfo
    if (showPartner) {
      shiftsInfo = shifts.map((shift, i) => (
        <div key={`calendar-shift-info-${i}`}>
          {time(shift)}
          {this.showShift(shift) && (
            <CalendarShiftInfo handleShiftSelect={handleShiftSelect} location={shift.location} partnerView={partnerView} shift={shift} view={view} />
          )}
        </div>
      ))
    } else {
      shiftsInfo = shifts.map((shift, i) => (
        <div key={`calendar-shift-info-${i}`}>
          <FormattedTime date={shift.start_dt} /> - <FormattedTime date={shift.end_dt} />
        </div>
      ))
    }

    return (
      <div>
        <div>
          <p className="m-0 font-weight-bold"><FormattedDate date={shifts[0].start_dt} /></p>
          {shiftsInfo}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    officeCode: state.sourceOfficeFilter,
  }
}

export default connect(mapStateToProps)(CalendarShift)
