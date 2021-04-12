import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Raven from 'raven-js'
import history from './history'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.removeError = this.removeError.bind(this)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Raven.captureException(error, { extra: errorInfo })
  }

  goBack = () => {
    history.goBack()
    this.removeError()
  }

  removeError() {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="text-center">
          <img alt="logo" src="/lumen.png" />
          <h1 className="font-family-sans-serif">We&apos;re sorry — something&apos;s gone wrong.</h1>
          <div>
            <a className="text-primary" onClick={this.goBack}>Back</a>
          </div>
          <Link to="/" onClick={this.removeError}>Home</Link>
          <div className="mt-5">
            <div>
              <strong>Error Details:</strong>
            </div>
            <div>
              {this.state.error.toString()}
            </div>
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
