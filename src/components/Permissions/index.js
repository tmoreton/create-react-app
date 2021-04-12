import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeModule } from '../../actions/changeModule'
import PermissionsContainer from './PermissionsContainer'
import PermissionsTable from './PermissionsTable'

class Permissions extends Component {

  componentDidMount() {
    this.props.changeModule('Permissions')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12 mx-auto">
          <PermissionsContainer />
          <hr className="my-5" />
        </div>
        <div className="col-md-12 mx-auto">
          <PermissionsTable />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators ({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(Permissions)
