import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearUser } from '../actions/clearUser'

class AuthButton extends Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.clearUser()
    this.props.auth.logout()
  }

  render() {
    let button
    if (this.props.user.loggedIn) {
      button = (
        <a className="nav-link" onClick={this.logout}>
          Log Out
        </a>
      )
    } else {
      button = ''
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton)
