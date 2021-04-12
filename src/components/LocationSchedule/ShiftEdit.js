import React, { Component } from 'react'
import ShiftContainer from './ShiftContainer'
import Shift from './Shift'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ShiftEdit extends Component {

  constructor() {
    super()
    this.removePartner = this.removePartner.bind(this)
    this.state = {
      showPartner: true,
    }
  }

  removePartner() {
    this.setState({ showPartner: false })
    this.props.removePartner(this.props.shift)
  }

  renderPartner() {
    if (!this.state.showPartner) return null
    if (this.props.shift.source_code) {
      return (
        <span className="text-primary">
          {this.props.assignedPartner(this.props.shift)}
          <a onClick={this.removePartner}><FontAwesomeIcon className="ml-1 text-danger feather h-100" icon="times" /></a>
        </span>
      )
    }
  }

  render() {
    return (
      <ShiftContainer>
        <input
          checked={this.props.isSelected(this.props.shift)}
          className="d-none"
          id={`${this.props.shift.location_schedule_config_id}-${this.props.shift._id}`}
          type="checkbox"
          onChange={() => this.props.handleShiftSelect(this.props.shift)}
        />
        <label className={'w-100 ' + (this.props.isSelected(this.props.shift) ? 'text-white bg-success' : 'text-dark bg-white')} htmlFor={`${this.props.shift.location_schedule_config_id}-${this.props.shift._id}`}>
          <a>
            <Shift shift={this.props.shift} />
          </a>
        </label>
        <div className="text-center">
          {this.renderPartner()}
        </div>
      </ShiftContainer>
    )
  }
}
