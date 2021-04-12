import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../history'

class PartnerRedirect extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      history.replace(`/partners/${this.props.user.sourceCode}/schedules`)
    }
  }

  render() {
    return (
      <div>Loading...</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(PartnerRedirect)
