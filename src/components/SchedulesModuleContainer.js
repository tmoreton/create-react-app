import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'qs'
import SchedulesModule from '../components/SchedulesModule'
import { toggleTableSelection } from '../actions/toggleTableSelection'
import { getChannelLocations } from '../actions/getChannelLocations'
import { getSources } from '../actions/getSources'
import { changeModule } from '../actions/changeModule'


class SchedulesModuleContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      channelCode: this.props.match.params.channelCode,
    }
  }

  componentDidMount() {
    const locationsToSchedule = this.locationsToScheduleParams()
    if (locationsToSchedule) {
      const callback = (data) => { this.props.toggleTableSelection(locationsToSchedule, data)}
      this.props.getChannelLocations(this.state.channelCode, callback)
    } else {
      this.props.getChannelLocations(this.state.channelCode)
    }
    this.props.getChannelLocations(this.state.channelCode)
    this.props.getSources()
    this.props.changeModule('Schedules')
  }

  componentWillUnmount() {
    this.props.changeModule(null)
  }

  locationsToScheduleParams() {
    return qs.parse(this.props.location.search.split('?')[1]).locationsToSchedule
  }

  render() {
    return <SchedulesModule channelCode={this.state.channelCode} />
  }
}

function mapStateToProps(state) {
  return {
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChannelLocations, getSources, changeModule, toggleTableSelection }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesModuleContainer)
