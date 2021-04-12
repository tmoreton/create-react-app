import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import isEmpty from 'lodash/isEmpty'
import LocationSearch from '../LocationSearch'
import ChannelCalendars from './ChannelCalendars'
import PublishAll from './PublishAll'
import filterLocations from '../../actions/schedules/filterLocations'
import { publishCalendars } from '../../actions/publishCalendars'

class ViewCalendars extends Component {

  constructor(props) {
    super(props)
    this.handleFilter = this.handleFilter.bind(this)
    this.handlePublishCalendars = this.handlePublishCalendars.bind(this)
    this.state = {
      showPartner: true,
    }
  }

  handleFilter(filteredLocations) {
    this.props.filterLocations(filteredLocations)
  }

  handlePublishCalendars(calendars) {
    const locationCodes = Object.keys(calendars)
    this.props.publishCalendars(locationCodes, this.props.weeks)
  }

  render() {
    if (isEmpty(this.props.locations)) {
      return <div className="my-3">Loading...</div>
    }

    return (
      <div>
        <div className="d-print-none">
          <LocationSearch handleFilter={(filteredLocations) => this.handleFilter(filteredLocations)} />
          <div className="row">
            <div className="col-6">
              <a className="text-primary" onClick={() => this.setState({ showPartner: !this.state.showPartner })}>
                {this.state.showPartner ? 'Hide' : 'Show'} Partner
              </a>
            </div>
            <div className="col-6 text-right">
              <PublishAll handlePublishCalendars={this.handlePublishCalendars} />
            </div>
          </div>
        </div>
        <ChannelCalendars
          channelCode={this.props.channelCode}
          handleLocationSelect={this.props.handleLocationSelect}
          handlePublishCalendars={this.handlePublishCalendars}
          showPartner={this.state.showPartner}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locations: state.locations.all,
    loading: state.locationsCalendars.loading,
    weeks: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ filterLocations, publishCalendars }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCalendars)
