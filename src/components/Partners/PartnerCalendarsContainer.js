import React, { Component } from 'react'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import history from '../../history'
import PartnerCalendarsByDay from './PartnerCalendarsByDay'
import PartnerCalendarsByLocation from './PartnerCalendarsByLocation'
import PartnerCalendarsBySalesAgent from './PartnerCalendarsBySalesAgent'
import AdjustWeeks from '../AdjustWeeks'
import OfficeSelect from '../LocationSchedule/OfficeSelect.js'
import { getLocations } from '../../actions/getLocations'
import { getSource } from '../../actions/getSource'
import getSourceCalendarsByDay from '../../actions/schedules/getSourceCalendarsByDay'
import getSourceCalendars from '../../actions/schedules/getSourceCalendars'
import getSourceCalendarsBySalesAgent from '../../actions/schedules/getSourceCalendarsBySalesAgent'
import { getSalesAgents } from '../../actions/getSalesAgents'
import getSourceOffices from '../../actions/schedules/getSourceOffices'
import setSourceOfficeFilter from '../../actions/schedules/setSourceOfficeFilter'
import setWeeksFilter from '../../actions/schedules/setWeeksFilter'
import { changeModule } from '../../actions/changeModule'

class PartnerCalendarsContainer extends Component {

  constructor(props) {
    super(props)
    this.handleShiftSelect = this.handleShiftSelect.bind(this)
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
    this.handleStartDayChange = this.handleStartDayChange.bind(this)
    this.refresh = this.refresh.bind(this)
    this.state = {
      viewingBy: 'day',
      sourceCode: this.props.match.params.sourceCode,
    }
  }

  componentDidMount() {
    this.props.getSource(this.state.sourceCode)
    this.props.getLocations()
    this.props.getSalesAgents(this.state.sourceCode)
    this.props.getSourceOffices(this.state.sourceCode)
    this.props.changeModule('Sources')
  }

  refresh() {
    switch (this.state.viewingBy) {
    case 'day':
      this.props.getSourceCalendarsByDay(this.state.sourceCode)
      break
    case 'location':
      this.props.getSourceCalendars(this.state.sourceCode)
      break
    case 'agent':
      this.props.getSourceCalendarsBySalesAgent(this.state.sourceCode)
      break
    default:
      break
    }
  }

  toggleViewingBy(viewingBy) {
    this.setState({ viewingBy })
  }

  handleShiftSelect(location, shift) {
    history.push(`/partners/${this.state.sourceCode}/schedules/locations/${location.location_code}/shift/${shift.location_shift_id}`)
  }

  handleSelectOffice = (officeCode) => {
    officeCode = officeCode ? officeCode.value : null
    this.props.setSourceOfficeFilter(officeCode)
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

  hasRole(userRole) {
    const userRoles = this.props.user.roles.map(role => role.name)
    return userRoles.some(role => role === userRole)
  }

  showOfficeFilter() {
    const loadingCalendars = this.props.loadingDailyCalendars || this.props.loadingLocationCalendars || this.props.loadingSalesAgentCalendars
    return this.props.user.userLoaded && !loadingCalendars && !this.hasRole('SalesPartnerManager')
  }

  renderTabs() {
    return <div className="col-md-6" />
    // Given a high load on the API with the location/agent view, we've disabled these calls for now - Tom

    // return (
    //   <div className="col-md-6">
    //     <div className="my-4">
    //       <button className={'btn ' + (this.state.viewingBy === 'day' ? 'btn-primary text-white' : 'btn-primary-outline')} onClick={() => this.toggleViewingBy('day')}>
    //         View By Day
    //       </button>
    //       <button className={'btn ml-2 ' + (this.state.viewingBy === 'location' ? 'btn-primary text-white' : 'btn-primary-outline')} onClick={() => this.toggleViewingBy('location')}>
    //         View By Location
    //       </button>
    //       <button className={'btn ml-2 ' + (this.state.viewingBy === 'agent' ? 'btn-primary text-white' : 'btn-primary-outline')} onClick={() => this.toggleViewingBy('agent')}>
    //         View By Agent
    //       </button>
    //     </div>
    //   </div>
    // )
  }

  renderContent() {
    if (this.state.viewingBy === 'day') {
      return <PartnerCalendarsByDay handleShiftSelect={this.handleShiftSelect} sourceCode={this.state.sourceCode} />
    } else if (this.state.viewingBy === 'location') {
      return <PartnerCalendarsByLocation handleShiftSelect={this.handleShiftSelect} sourceCode={this.state.sourceCode} />
    } else {
      return <PartnerCalendarsBySalesAgent handleShiftSelect={this.handleShiftSelect} sourceCode={this.state.sourceCode} />
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-print-none">
          <div className="col-12">
            <h4 className="my-2">
              {this.props.source.source_name}
            </h4>
          </div>
        </div>
        <div className="row align-items-center d-print-none">
          {this.renderTabs()}
          <div className="offset-md-1 col-md-5">
            <AdjustWeeks handleRangePickerChange={this.handleRangePickerChange} handleStartDayChange={this.handleStartDayChange} />
            <div className="text-right mt-2">
              <a className="text-primary mr-4" onClick={window.print}>Print</a>
              <a className="text-primary" onClick={this.refresh}>Refresh</a>
            </div>
          </div>
        </div>
        {this.showOfficeFilter() && (
          <div className="row">
            <div className="col-md-4">
              Filter by office:
              <OfficeSelect
                handleSelectOffice={this.handleSelectOffice}
                offices={this.props.offices}
                selectedOffice={this.props.officeCode}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    source: state.sources.active,
    offices: state.sources.offices,
    officeCode: state.sourceOfficeFilter,
    user: state.user,
    weeksFilter: state.weeksFilter,
    loadingDailyCalendars: state.dailyCalendars.loading,
    loadingLocationCalendars: state.sourceLocationsCalendars.loading,
    loadingSalesAgentCalendars: state.salesAgentsCalendars.loading,
  }
}

const mapDispatchToProps = {
  getSource,
  getLocations,
  getSourceCalendars,
  getSourceCalendarsByDay,
  getSourceCalendarsBySalesAgent,
  getSalesAgents,
  getSourceOffices,
  setSourceOfficeFilter,
  setWeeksFilter,
  changeModule,
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCalendarsContainer)
