import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../Modal'
import history from '../../history'
import LocationScheduleContainer from './LocationScheduleContainer'
import { getLocationSchedule } from '../../actions/getLocationSchedule'
import { getLocation } from '../../actions/getLocation'
import { selectLocation } from '../../actions/selectLocation'
import { clearLocation } from '../../actions/clearLocation'

class LocationScheduleModal extends Component {

  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.locationCode) {
      this.props.getLocationSchedule(this.props.match.params.locationCode, this.props.weeksFilter)
      this.props.getLocation(this.props.match.params.locationCode)
    }
  }

  closeModal() {
    this.props.clearLocation()
    history.goBack()
  }

  render() {

    return (
      <div>
        <Modal closeModal={this.closeModal} title={this.props.location.location_name} visible={this.props.visible}>
          <div>
            <h5>{this.props.location.location_desc}</h5>
            <h5>{this.props.location.address}</h5>
            <h5>{this.props.location.city} {this.props.location.state_code} {this.props.location.zip_code}</h5>
            <LocationScheduleContainer />
          </div>
        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getLocationSchedule, getLocation, selectLocation, clearLocation }, dispatch)
}

function mapStateToProps(state) {
  return {
    location: state.locations.active,
    locations: state.locations.all,
    locationSchedule: state.locationSchedule,
    weeksFilter: state.weeksFilter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScheduleModal)
