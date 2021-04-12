import React, { Component } from 'react'
import { getRoles } from '../../actions/Users/createUser'
import { getSources } from '../../actions/getSources'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'
import { createUser } from '../../actions/Users/createUser'

class UsersContainer extends Component {
  constructor() {
    super()
    this.defaultState = {
      email: '',
      first_name: '',
      last_name: '',
      slack_username: '',
      source_code: '',
      is_active: { value: true, label: 'Active' },
      roles: [],
    }
    this.state = this.defaultState
  }

  componentDidMount = () => {
    this.props.getRoles()
    this.props.getSources()
  }

  handleSignup = async (e) => {
    e.preventDefault()
    const response = await this.props.createUser(this.state)
    if (response.status === 200) {
      this.setState(this.defaultState)
      this.setState({ message: 'User successfully created!' })
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  render() {
    return (
      <div className="col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Create New User</h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Status</label>
              <Select 
                options={[
                  { value: true, label: 'Active' },
                  { value: false, label: 'Inactive' },
                ]}
                value={this.state.is_active} 
                onChange={e => this.setState({ is_active: e.value })}
              />
            </div>
            <div className="col-md-8 mb-3">
              <label>Email</label>
              <input required className="form-control" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>First Name</label>
              <input required className="form-control" value={this.state.first_name} onChange={e => this.setState({ first_name: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Last Name</label>
              <input required className="form-control" value={this.state.last_name} onChange={e => this.setState({ last_name: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Source</label>
              <Select
                options={this.props.sources.map(source => ({
                  source_code: source.source_code, label: source.source_code, value: source.source_code,
                }))}
                value={this.state.source_code}
                onChange={e => this.setState({ source_code: e })}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Role</label>
              <Select
                multi
                options={this.props.roles.map(role => ({
                  role_id: role.role_id, label: role.name, value: role.name,
                }))}
                value={this.state.roles}
                onChange={e => this.setState({ roles: e })}
              />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Slack Username</label>
              <input className="form-control" type="text" value={this.state.slack_username} onChange={e => this.setState({ slack_username: e.target.value })} />
            </div>
          </div>
          <div className="row">
            <button className="btn btn-primary btn-md btn-block mt-4" onClick={this.handleSignup}>Create User</button>
            <div className="valid-feedback d-block text-center mt-2">
              {this.state.message}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.sources,
    roles: state.roles,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRoles, getSources, createUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UsersContainer)
