import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../actions/Users/getUser'
import clearLogin from '../actions/clearLogin'
import { logIn } from '../actions/logIn'
import history from '../history'

class Callback extends Component {

  componentDidMount() {
    const getUserEmail = (email) => {
      this.props.getUser(email)
      history.replace('/')
    }
    this.props.logIn()
    this.props.auth.handleAuthentication(getUserEmail, this.props.clearLogin)
  }

  render() {
    return (
      <div />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser, clearLogin, logIn }, dispatch)
}

export default connect(null, mapDispatchToProps)(Callback)
