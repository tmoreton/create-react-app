import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import { getSalesLocations } from '../../actions/salesLocations/getSalesLocation'
import LocationContainer from './LocationContainer'

class Locations extends Component {

  componentDidMount() {
    this.props.changeModule('Locations')
    this.props.getSalesLocations()
  }

  render() {
    return (
      <div className="container-fluid">
        <LocationContainer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getSalesLocations }, dispatch)
}

export default connect(null, mapDispatchToProps)(Locations)
