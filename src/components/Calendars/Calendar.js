import React, { Component, Fragment } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getLocationCalendar from '../../actions/schedules/getLocationCalendar'
import CalendarShifts from './CalendarShifts'
import LocationHours from './LocationHours'

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.handleEditShiftTime = this.handleEditShiftTime.bind(this)
    this.state = {
      collapsed: props.collapsed || false,
      loading: false,
      viewingSchedule: true,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.calendar !== this.props.calendar) {
      this.setState({ loading: false })
    }
  }

  calendar() {
    return this.props.calendar
  }

  handleEditShiftTime(shift) {
    if (this.props.partnerView) {
      history.push(`/partners/${this.props.sourceCode}/schedules/locations/${shift.location.location_code}/shifts/${shift.location_shift_id}/edit`)
    } else {
      history.push(`/schedules/channels/${this.props.channelCode}/locations/${this.calendar().location.location_code}/shifts/${shift.location_shift_id}/edit`)
    }
  }

  toggleCollapsed = () => {
    let state = { collapsed: !this.state.collapsed }
    if (!this.state.collapsed) {
      this.props.getLocationCalendar(this.props.location.location_code)
      state = { ...state, loading: true }
    }
    this.setState(state)
  }

  showCalendar() {
    return this.state.collapsed && this.calendar()
  }

  renderPublished() {
    let published = ''
    if (this.props.partnerView) {
      published = ''
    } else if (this.calendar().published) {
      published = <span className="text-success">Published</span>
    } else {
      published = <a className="text-primary" onClick={() => this.props.handlePublishCalendars({ [this.calendar().location.location_code]: this.calendar() })}><u>Publish</u></a>
    }
    return published
  }

  renderNav() {
    let nav = ''
    if (!this.props.partnerView) {
      nav = (
        <div>
          <u><a className={(this.state.viewingSchedule ? 'text-primary' : '')} onClick={() => this.setState({ viewingSchedule: true })}>
            Schedule
          </a></u>
          <u><a className={'ml-3 ' + (!this.state.viewingSchedule ? 'text-primary' : '')} onClick={() => this.setState({ viewingSchedule: false })}>
            Hours
          </a></u>
        </div>
      )
    }
    return nav
  }

  renderContent() {
    if (this.state.loading) return <strong>Loading...</strong>
    if (!this.state.collapsed || !this.calendar()) return null

    let content = ''
    if (this.state.viewingSchedule) {
      content = (
        <CalendarShifts
          calendar={this.calendar()}
          handleEditShiftTime={this.handleEditShiftTime}
          handleShiftSelect={this.props.handleShiftSelect}
          partnerView={this.props.partnerView}
          showPartner={this.props.showPartner}
          view={this.props.view}
        />
      )
    } else {
      content = <LocationHours calendar={this.calendar()} />
    }
    return content
  }

  render() {
    return (
      <div className="border border-muted my-4 p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="font-family-sans-serif mb-1">
              {this.props.partnerView ? (
                this.props.title
              ) : (
                <a onClick={this.toggleCollapsed}>
                  <FontAwesomeIcon className="mr-2" icon={this.state.collapsed ? 'chevron-up' : 'chevron-down'} style={{ width: '12px', color: '#E6168B' }} />
                  {this.props.title}
                </a>
              )}
            </h5>
            {this.props.location ? (
              <Fragment>
                <div className="d-inline-block mr-2" style={{ width: '12px', height: '1px' }} />
                <div className="d-inline-block">{this.props.location.address}</div>
                <br />
                <div className="d-inline-block mr-2" style={{ width: '12px', height: '1px' }} />
                <div className="d-inline-block">{this.props.location.city} {this.props.location.zip_code}</div>
              </Fragment>
            ) : (
              <div className="mb-4" />
            )}
          </div>
          <div className="col-md-4">
            {this.showCalendar() && this.renderNav()}
          </div>
          <div className="col-md-2 text-right">
            {this.calendar() && this.renderPublished()}
          </div>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapDispatchToProps = {
  getLocationCalendar,
}

export default connect(null, mapDispatchToProps)(Calendar)
