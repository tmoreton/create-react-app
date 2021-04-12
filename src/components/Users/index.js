import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import UsersContainer from './UsersContainer'
import UsersTable from './UsersTable'

class Users extends Component {
  componentDidMount() {
    this.props.changeModule('Users')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-10 mx-auto">
          <UsersContainer />
          <hr className="my-5" />
        </div>
        <div>
          <UsersTable />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps) (Users)
