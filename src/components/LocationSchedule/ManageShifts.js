import React, { Component } from 'react'
import { connect } from 'react-redux'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import ScheduleDescription from './ScheduleDescription'
import ShiftEdit from './ShiftEdit'
import PartnersSelect from './PartnersSelect'
import OfficeSelect from './OfficeSelect'
import getSourceOffices from '../../actions/schedules/getSourceOffices'
import clearSourceOffices from '../../actions/schedules/clearSourceOffices'
import { createShifts } from '../../actions/createShifts'
import { deleteShifts } from '../../actions/deleteShifts'
import { removePartner } from '../../actions/removePartner'

const initialState = {
  shiftsToEdit: {},
  selectedSource: null,
  selectedOffice: null,
  selectAll: false,
}

class ManageShifts extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentWillUnmount() {
    this.props.clearSourceOffices()
  }

  saveShifts = () => {
    this.props.createShifts(this.props.locationSchedule, this.state.shiftsToEdit, this.state.selectedSource, this.state.selectedOffice, this.props.weeksFilter)
  }

  handleShiftSelect(shift) {
    const newShift = { [shift._id]: shift }
    const currentShifts = this.state.shiftsToEdit
    const shiftsToEdit = currentShifts[shift._id] ? omit(currentShifts, shift._id) : { ...currentShifts, ...newShift }
    this.setState({ shiftsToEdit })
  }

  selectAllShifts = () => {
    this.setState({ shiftsToEdit: this.props.locationSchedule.shifts, selectAll: true })
  }

  clearAllShifts = () => {
    this.setState({ shiftsToEdit: {}, selectAll: false })
  }

  selectScheduleDesc(desc) {
    const shiftsToEdit = {}
    Object.keys(this.props.locationSchedule.shifts).forEach(shiftKey => {
      if (this.props.locationSchedule.shifts[shiftKey].location_schedule_config_id === desc.location_schedule_config_id) {
        shiftsToEdit[shiftKey] = this.props.locationSchedule.shifts[shiftKey]
      }
    })
    this.setState({ shiftsToEdit })
  }

  handleSelectSource = (selectedSource) => {
    selectedSource = selectedSource ? selectedSource.value : null
    this.props.getSourceOffices(selectedSource)
    this.setState({ selectedSource })
  }

  handleSelectOffice = (selectedOffice) => {
    selectedOffice = selectedOffice ? selectedOffice.value : null
    this.setState({ selectedOffice })
  }

  assignedPartner = (shift) => {
    const source = this.props.sources[shift.source_code]
    if (source) {
      let sourceOffice = source.source_name
      if (shift.office_code) sourceOffice += ` - ${shift.office_code}`
      return sourceOffice
    } else {
      return ''
    }
  }

  removePartner = (shift) => {
    this.props.removePartner(this.props.locationSchedule, shift, this.props.weeksFilter)
  }

  deleteShifts = () => {
    this.props.deleteShifts(this.props.locationSchedule, this.state.shiftsToEdit, this.props.weeksFilter)
    this.clearAllShifts()
  }

  disableSave() {
    return !this.state.selectedSource || !this.state.selectedOffice || isEmpty(this.state.shiftsToEdit)
  }

  renderScheduleDescription() {
    return this.props.locationSchedule.schedule_descs.map((desc, index) => {
      const selectButton = <a className="badge badge-primary text-white" onClick={() => this.selectScheduleDesc(desc)}>Select</a>
      return <ScheduleDescription key={index} description={desc} selectButton={selectButton} />
    })
  }

  renderShifts() {
    return Object.keys(this.props.locationSchedule.shifts).map((shiftKey) => (
      <div key={shiftKey} className="col-xl-3">
        <ShiftEdit
          assignedPartner={this.assignedPartner}
          handleShiftSelect={(shift) => this.handleShiftSelect(shift)}
          isSelected={(shift) => !!this.state.shiftsToEdit[shift._id]}
          removePartner={this.removePartner}
          shift={this.props.locationSchedule.shifts[shiftKey]}
        />
      </div>
    ))
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            {this.renderScheduleDescription()}
          </div>
        </div>
        <div className="row">
          {this.renderShifts()}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="my-3">
              <a className="badge badge-primary text-white" onClick={this.selectAllShifts}>Select All</a>
              <a className="badge badge-primary text-white ml-2" onClick={this.clearAllShifts}>Clear</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="my-3">
              <h6>Partner:</h6>
              <PartnersSelect
                handleSelectSource={this.handleSelectSource}
                selectedSource={this.state.selectedSource}
                sources={this.props.sources}
              />
            </div>
          </div>
        </div>
        {!isEmpty(this.props.offices) && (
          <div className="row">
            <div className="col-4">
              <div className="my-3">
                <h6>Office:</h6>
                <OfficeSelect
                  handleSelectOffice={this.handleSelectOffice}
                  offices={this.props.offices}
                  selectedOffice={this.state.selectedOffice}
                />
              </div>
            </div>
          </div>
        )}
        <div className="row align-items-center py-3 px-1 mb-3">
          <div className="col-10">
            <button className="btn btn-primary" disabled={this.disableSave()} onClick={this.saveShifts}>Save</button>
            <button className="btn btn-outline-muted ml-2" onClick={this.props.goBack}>Back</button>
          </div>
          <div className="col-1">
            <button className="btn btn-outline-primary" disabled={isEmpty(this.state.shiftsToEdit)} onClick={this.deleteShifts}>Delete Shifts</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locationSchedule: state.locationSchedule,
    sources: state.sources.all,
    offices: state.sources.offices,
    weeksFilter: state.weeksFilter,
  }
}

const mapDispatchToProps = {
  createShifts,
  deleteShifts,
  removePartner,
  getSourceOffices,
  clearSourceOffices,
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShifts)
