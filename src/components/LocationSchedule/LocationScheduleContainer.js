import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import ManageShifts from './ManageShifts'
import ScheduleDetails from './ScheduleDetails'

class LocationScheduleContainer extends Component {

  constructor(props) {
    super(props)
    this.manageShifts = this.manageShifts.bind(this)
    this.assignedPartner = this.assignedPartner.bind(this)
    this.goBack = this.goBack.bind(this)
    this.state = { assigningPartners: false }
  }

  manageShifts() {
    this.setState({ assigningPartners: true })
  }

  assignedPartner(shift) {
    const source = this.props.sources[shift.source_code]
    if (source) {
      let sourceOffice = source.source_name
      if (shift.office_code) sourceOffice += ` - ${shift.office_code}`
      return sourceOffice
    } else {
      return null
    }
  }

  goBack() {
    this.setState({ assigningPartners: false })
  }

  render() {

    let details
    if (isEmpty(this.props.locationSchedule.shifts)) {
      details = (
        <Link
          className="btn btn-secondary"
          to={`/schedules/channels/retail/locations/${this.props.locationSchedule.location_code}/edit`}
        >
          Manage Schedules
        </Link>
      )
    } else if (this.state.assigningPartners) {
      details = <ManageShifts goBack={this.goBack} />
    } else {
      details = <ScheduleDetails assignedPartner={this.assignedPartner} locationSchedule={this.props.locationSchedule} manageShifts={this.manageShifts} />
    }

    return (
      <div>
        {details}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locationSchedule: state.locationSchedule,
    sources: state.sources.all,
  }
}

export default connect(mapStateToProps)(LocationScheduleContainer)
