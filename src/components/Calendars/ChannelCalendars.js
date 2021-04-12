import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import Calendar from './Calendar'

class ChannelCalendars extends Component {

  render() {
    if (isEmpty(this.props.locations)) {
      return <p className="my-4">No schedules found</p>
    }

    const calendars = Object.keys(this.props.filteredLocations).map((locationCode) => {
      return (
        <Calendar
          key={locationCode}
          calendar={this.props.calendars[locationCode]}
          channelCode={this.props.channelCode}
          handlePublishCalendars={this.props.handlePublishCalendars}
          handleShiftSelect={this.props.handleLocationSelect}
          location={this.props.locations[locationCode]}
          showPartner={this.props.showPartner}
          title={this.props.locations[locationCode].location_name}
        />
      )
    })

    return (
      <div>
        {calendars}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    calendars: state.locationsCalendars.calendars,
    locations: state.locations.all,
    filteredLocations: state.locations.filtered,
  }
}

export default connect(mapStateToProps)(ChannelCalendars)
