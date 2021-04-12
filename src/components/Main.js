import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import history from '../history'
import Login from './Login'
import ErrorModal from './ErrorModal'
import { getUser } from '../actions/Users/getUser'
import Loading from './Shared/Loading'

class Main extends Component {

  componentDidMount() {
    if (!this.props.user.loggedIn && localStorage.getItem('accessToken')) {
      const newUser = (email) => this.props.getUser(email)
      this.props.auth.checkToken(newUser)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (process.env.NODE_ENV !== 'development' && this.props.user.roles.some(role => ['SalesPartnerExec', 'SalesPartnerManager'].includes(role.name))) {
        history.replace(`/partners/${this.props.user.sourceCode}/schedules`)
      }
    }
  }

  render() {
    let error
    if (this.props.error.show) {
      error = <ErrorModal />
    }
    if (this.props.auth.isAuthenticated()) {
      return (
        <main className="main col-md-10 ml-sm-auto my-5 px-4" role="main">
          <div className="mt-3">
            {this.props.children}
            {error}
          </div>
        </main>
      )
    } else if (this.props.user.loading) {
      return <Loading />
    } else {
      return <Login auth={this.props.auth} />
    }
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
