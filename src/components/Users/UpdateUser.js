import React, { Component } from 'react'
import { getUserByID, updateUser } from '../../actions/Users/updateUser'
import history from '../../history'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRoles } from '../../actions/Users/createUser'
import Select from 'react-select'
import { getSources } from '../../actions/getSources'
import getAllUsers from '../../actions/Users/getAllUsers'

class UpdateUser extends Component {
  constructor() {
    super()
    this.defaultState = {
      email: '',
      first_name: '',
      last_name: '',
      slack_username: '',
      source_code: '',
      is_active: '',
      roles: [],
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    this.props.getAllUsers()
    const data = await this.props.history.location.state.edit
    const userInfo = await this.props.getUserByID(data.user_id)
    this.setState(userInfo)
    this.props.getRoles()
    this.props.getSources()
  }

  cancelUpdate = () => {
    history.push('/users')
  }

  handleUpdate = async (e) => {
    e.preventDefault()
    const response = await this.props.updateUser(this.state)
    if (response.status === 200) {
      this.setState(this.defaultState)
      this.setState({ message: 'User successfully updated!' })
      setTimeout(() => history.push('/users'), 3000)
    }
  }

  render() {
    return (
      <div className="container-fluid col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Update User</h4>
          <div className="row">
            <div className="col-md-2 mb-3">
              <label>User ID</label>
              <input className="form-control" disabled={true} value={this.state.user_id} />
            </div>
            <div className="col-md-3 mb-3">
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
            <div className="col-md-7 mb-3">
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
                onChange={e => this.setState({ source_code: e.value })}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Role</label>
              <Select
                multi
                options={this.props.roles.map(role => ({
                  role_id: role.role_id, label: role.name, value: role.name, name: role.name,
                }))}
                value={this.state.roles.map(userRole => ({
                  role_id: userRole.role_id, label: userRole.name, value: userRole.name, name: userRole.name,
                }))}
                onChange={e => this.setState({ roles: e })}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Slack Username</label>
              <input className="form-control" type="text" value={this.state.slack_username} onChange={e => this.setState({ slack_username: e.target.value })} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-secondary btn-md btn-block mt-4" type="button" onClick={this.cancelUpdate}>Cancel User Update</button>
            </div>
            <div className="col-md-8">
              <button className="btn btn-primary btn-md btn-block mt-4" type="button" onClick={this.handleUpdate}>Update User</button>
              <div className="valid-feedback d-block text-center mt-2">
                {this.state.message}
              </div>
            </div>
          </div>
        </form>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.all,
    sources: state.sources.sources,
    roles: state.roles,
    userRoles: state.userByID,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllUsers, updateUser, getRoles, getSources, getUserByID }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UpdateUser)
