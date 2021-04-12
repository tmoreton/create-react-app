import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import history from '../../history'
import Modal from '../Modal'
import CreateSchedule from './CreateSchedule'
import ScheduleDescription from '../LocationSchedule/ScheduleDescription'
import { createSchedule } from '../../actions/createSchedule'
import { updateSchedule } from '../../actions/updateSchedule'
import { deleteSchedule } from '../../actions/deleteSchedule'

const initialState = {
  schedule: {},
  creatingSchedule: false,
  updatingSchedule: false,
}

class UpdateScheduleModal extends Component {

  constructor(props) {
    super(props)
    this.handleCreateSchedule = this.handleCreateSchedule.bind(this)
    this.handleUpdateSchedule = this.handleUpdateSchedule.bind(this)
    this.clearState = this.clearState.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = initialState
  }

  createSchedule() {
    this.setState({
      ...this.state,
      creatingSchedule: true,
    })
  }

  updateSchedule(description) {
    this.setState({
      ...this.state,
      schedule: description,
      updatingSchedule: true,
    })
  }

  deleteSchedule(description) {
    this.props.deleteSchedule(this.props.locationSchedule, description, this.props.weeksFilter)
  }

  handleCreateSchedule(locationToSchedule, schedule) {
    this.props.createSchedule(locationToSchedule, schedule, this.props.weeksFilter)
    this.setState(initialState)
  }

  handleUpdateSchedule(schedule) {
    this.props.updateSchedule(schedule, this.props.weeksFilter)
    this.setState(initialState)
  }

  clearState() {
    this.setState(initialState)
  }

  closeModal() {
    history.goBack()
  }

  render() {

    let scheduleDescription
    if (this.state.updatingSchedule) {
      scheduleDescription = (
        <div className="row">
          <div className="col-12">
            <ScheduleDescription description={this.state.schedule} />
          </div>
        </div>
      )
    } else {
      scheduleDescription = this.props.locationSchedule.schedule_descs.filter((d) => !!d.friendly).map((desc, index) => (
        <div key={index} className="row">
          <div className="col-9">
            <ScheduleDescription description={desc} />
          </div>
          <a className="offset-1 col-1 text-warning" onClick={() => this.updateSchedule(desc)}>Edit</a>
          <a className="col-1 text-danger" onClick={() => this.deleteSchedule(desc)}>Delete</a>
        </div>
      ))
    }

    let createdSchedule
    let createScheduleButton = (
      <button className="btn btn-primary" onClick={() => this.createSchedule()}>
        Create Schedule
      </button>
    )
    if (this.state.updatingSchedule) {
      createdSchedule = (
        <div>
          <h6>Update Schedule</h6>
          <CreateSchedule
            locationsToSchedule={this.props.locationSchedule}
            saveSchedule={(locationToSchedule, schedule) => this.handleUpdateSchedule(schedule)}
            schedule={this.state.schedule}
          >
            <button className="btn btn-muted" onClick={this.clearState}>Cancel</button>
          </CreateSchedule>
        </div>
      )
      createScheduleButton = ''
    } else if (this.state.creatingSchedule) {
      createdSchedule = (
        <div>
          <h6>Create New Schedule</h6>
          <CreateSchedule
            locationsToSchedule={this.props.locationSchedule}
            saveSchedule={(locationToSchedule, schedule) => this.handleCreateSchedule(locationToSchedule, schedule)}
            schedule={this.state.schedule}
          >
            <button className="btn btn-muted" onClick={this.clearState}>Cancel</button>
          </CreateSchedule>
        </div>
      )
      createScheduleButton = ''
    }

    return (
      <div>
        <Modal closeModal={this.closeModal} title="Manage Schedules" visible={this.props.visible}>
          <h2>{this.props.location.location_name}</h2>
          {scheduleDescription}
          {createdSchedule}
          {createScheduleButton}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    location: state.locations.active,
    locationSchedule: state.locationSchedule,
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createSchedule, updateSchedule, deleteSchedule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateScheduleModal)
