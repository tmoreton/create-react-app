/* global prompt: false */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleForgotPassword = this.handleForgotPassword.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.state = {
      email: '',
      password: '',
      login: true,
    }
  }

  handleLogin(ev) {
    this.props.auth.login(this.state.email, this.state.password)
    ev.preventDefault()
  }

  handleSignup(ev) {
    this.props.auth.signup(this.state.email, this.state.password)
    ev.preventDefault()
  }

  handleForgotPassword() {
    const email = prompt('Enter your email')
    this.props.auth.forgotPassword(email)
  }

  handleEmailChange(event) {
    const email = event.target.value
    this.setState({ email })
  }

  handlePasswordChange(event ) {
    const password = event.target.value
    this.setState({ password })
  }

  disableButtons() {
    return this.state.email === '' || this.state.password === ''
  }

  render() {

    let buttons
    if (this.state.login) {
      buttons = (
        <div>
          <button className="mb-2 btn btn-primary" disabled={this.disableButtons()} onClick={this.handleLogin}>Log In</button>
          <div>
            <a className="badge badge-muted text-primary p-1" onClick={() => {this.setState({ login: !this.state.login })}}>Don&apos;t have an account? Sign Up</a>
          </div>
        </div>
      )
    } else {
      buttons = (
        <div>
          <button className="mb-2 btn btn-primary" disabled={this.disableButtons()} onClick={this.handleSignup}>Sign Up</button>
          <div>
            <a className="badge badge-muted text-primary p-1" onClick={() => {this.setState({ login: !this.state.login })}}>Have an account? Log In</a>
          </div>
        </div>
      )
    }

    return (
      <div className="col-12">
        <div className="text-center mt-5">
          <h1>Inspire</h1>
          <form className="col-4 offset-4">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" id="email" onChange={this.handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" type="password" onChange={this.handlePasswordChange} />
            </div>
            {buttons}
            <div>
              <a className="badge badge-muted text-primary p-1" onClick={this.handleForgotPassword}>Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Login)
