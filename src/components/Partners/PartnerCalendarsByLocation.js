import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import getSourceCalendars from '../../actions/schedules/getSourceCalendars'
import Calendar from '../Calendars/Calendar'

class PartnerCalendarsByLocation extends Component {

  componentDidMount() {
    this.props.getSourceCalendars(this.props.sourceCode)
  }

  render() {

    if (this.props.loading) {
      return <div className="my-3">Loading...</div>
    } else if (!this.props.loading && isEmpty(this.props.calendars)) {
      return <div className="my-3">No shifts scheduled</div>
    }

    const calendars = Object.keys(this.props.calendars).map((locationCode) => {
      const calendar = this.props.calendars[locationCode]
      if (calendar.dates.every(date => !date.scheduled)) return null
      return (
        <Calendar
          key={locationCode}
          collapsed
          calendar={calendar}
          handleLocationSelect={() => {}}
          handleShiftSelect={this.props.handleShiftSelect}
          partnerView={true}
          showPartner={true}
          sourceCode={this.props.sourceCode}
          title={calendar.location.location_name}
          view="location"
        />
      )
    })

    return (
      <div className="row">
        <div className="col-12">
          {calendars}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    calendars: state.sourceLocationsCalendars.calendars,
    loading: state.sourceLocationsCalendars.loading,
  }
}

const mapDispatchToProps = {
  getSourceCalendars,
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCalendarsByLocation)
