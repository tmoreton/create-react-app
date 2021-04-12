import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cloneDeep from 'lodash/cloneDeep'
import capitalize from 'lodash/capitalize'
import history from '../history'
import ViewCalendars from '../components/Calendars/ViewCalendars'
import NavTabs from '../components/Shared/NavTabs'
import AdjustWeeks from '../components/AdjustWeeks'
import CreateSchedules from './CreateSchedule/CreateSchedules'
import { toggleTableSelection } from '../actions/toggleTableSelection'
import { selectLocation } from '../actions/selectLocation'
import setWeeksFilter from '../actions/schedules/setWeeksFilter'

const tabs = [
  {
    key: 'view',
    label: 'View Schedules',
  },
  {
    key: 'create',
    label: 'Create Schedules',
  },
]

class SchedulesModule extends Component {

  constructor(props) {
    super(props)
    this.handleToggleSelection = this.handleToggleSelection.bind(this)
    this.handleLocationSelect = this.handleLocationSelect.bind(this)
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
    this.handleStartDayChange = this.handleStartDayChange.bind(this)
    this.state = {
      tab: 'view',
    }
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
  }

  handleToggleSelection(selection) {
    this.props.toggleTableSelection(selection, this.props.locationsTableData)
  }

  handleLocationSelect(location) {
    this.props.selectLocation(location.location_code, this.props.locations)
    history.push(`/schedules/channels/${this.props.channelCode}/locations/${location.location_code}/view`)
  }

  handleRangePickerChange(dates) {
    if (dates.length === 0) return
    const weeksFilter = cloneDeep(this.props.weeksFilter)
    weeksFilter.startDt = dates[0]
    weeksFilter.endDt = dates[1]
    this.props.setWeeksFilter(weeksFilter)
  }

  handleStartDayChange(event) {
    if (!event) return
    const weeksFilter = cloneDeep(this.props.weeksFilter)
    weeksFilter.startWorkWeek = event.value
    this.props.setWeeksFilter(weeksFilter)
  }

  render() {

    let content
    if (this.state.tab === 'view') {
      content = <ViewCalendars channelCode={this.props.channelCode} handleLocationSelect={this.handleLocationSelect} />
    } else {
      content = <CreateSchedules channelCode={this.props.channelCode} handleLocationSelect={this.handleLocationSelect} handleToggleSelection={this.handleToggleSelection} />
    }

    return (
      <div className="container-fluid">
        <div className="row d-print-none">
          <div className="col-12">
            <h4 className="mb-2">
              {capitalize(this.props.channelCode)} Locations
            </h4>
          </div>
        </div>
        <div className="row align-items-center d-print-none my-2">
          <div className="col-md-3">
            <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
          </div>
          <div className="offset-md-3 col-md-5">
            <AdjustWeeks handleRangePickerChange={this.handleRangePickerChange} handleStartDayChange={this.handleStartDayChange} />
          </div>
        </div>
        <div className="row">
          <div className="text-right w-100 mr-3 mt-1">
            <a className="text-primary" onClick={window.print}>Print</a>
          </div>
        </div>
        {content}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locations: state.locations.all,
    locationsTableData: state.locations.tableData,
    locationsToSchedule: state.locationsToSchedule.selection,
    locationSchedule: state.locationSchedule,
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleTableSelection, selectLocation, setWeeksFilter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulesModule)
