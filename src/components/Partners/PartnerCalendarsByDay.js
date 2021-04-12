import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import getSourceCalendarsByDay from '../../actions/schedules/getSourceCalendarsByDay'
import CalendarDay from '../Calendars/CalendarDay'

class PartnerCalendarsByDay extends Component {

  componentDidMount() {
    this.props.getSourceCalendarsByDay(this.props.sourceCode)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.savingShift !== this.props.savingShift && !this.props.savingShift) {
      this.props.getSourceCalendarsByDay(this.props.sourceCode)
    }
  }

  dailyCalendars() {
    return _(this.props.dailyCalendars).toPairs().sortBy((o) => Date.parse(o[0])).fromPairs().value()
  }

  render() {

    if (this.props.loading || this.props.savingShift) {
      return <div className="my-3">Loading...</div>
    } else if (!this.props.loading && _.isEmpty(this.props.dailyCalendars)) {
      return <div className="my-3">No shifts scheduled</div>
    }

    return (
      <div className="row">
        <div className="col-12">
          {Object.keys(this.dailyCalendars()).map(date => (
            <CalendarDay
              key={date}
              calendarDay={this.props.dailyCalendars[date]}
              date={date}
              handleShiftSelect={this.props.handleShiftSelect}
              sourceCode={this.props.sourceCode}
            />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dailyCalendars: state.dailyCalendars.calendars,
    loading: state.dailyCalendars.loading,
    savingShift: state.shift.saving,
  }
}

const mapDispatchToProps = {
  getSourceCalendarsByDay,
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCalendarsByDay)
