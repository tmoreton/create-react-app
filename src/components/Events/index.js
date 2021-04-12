import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import { getSalesLocations } from '../../actions/salesLocations/getSalesLocation'
import EventContainer from './EventContainer'

class Events extends Component {

  componentDidMount() {
    this.props.changeModule('Events')
    this.props.getSalesLocations()
  }

  render() {
    return (
      <div className="container-fluid">
        <EventContainer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getSalesLocations }, dispatch)
}

export default connect(null, mapDispatchToProps)(Events)
