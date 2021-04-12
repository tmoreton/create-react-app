import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSources } from '../../actions/getSources'
import { createUser } from '../../actions/createUser'
import getChannels from '../../actions/channels/getChannels'
import getSourceOffices from '../../actions/schedules/getSourceOffices'

class UserContainer extends Component {
  constructor() {
    super()
    this.defaultState = {
      email: '',
      source_code: '',
      office_code: '',
      phone: '',
      first_name: '',
      last_name: '',
      agent_id: '',
      channel_code: 'D2D',
      message: '',
      validated: true,
      agent_id_1: '',
      agent_id_2: '',
      agent_id_3: '',
      status: 'Inactive',
    }
    this.vendor_codes = ['INSPIRE', 'SARA_PLUS']

    this.state = this.defaultState
  }

  componentDidMount = () => {
    this.props.getSources()
    this.props.getChannels()
  }

  selectSourceCode = (source) => {
    this.props.getSourceOffices(source)
    this.setState({ source_code: source })
  }

  handleSignup = async (e) => {
    e.preventDefault()
    if (this.validated()){
      const response = await this.props.createUser(this.state)
      if (response.status === 200){
        this.setState(this.defaultState)
        this.setState({ message: 'Agent Successfully Created!' })
      }
    } else {
      this.setState({ validated: false, message: '' })
    }
  }

  updateAgentId = (e) => {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() }, this.formatAgentId)
  }

  formatAgentId = () => {
    const { agent_id_1, agent_id_2, agent_id_3 } = this.state
    const agent_id = `${agent_id_1}-${agent_id_2}-${agent_id_3}`
    this.setState({ agent_id })
  }

  validated = () => {
    if (!this.state.email) {
      return false
    } else if (!this.state.source_code) {
      return false
    } else if (!this.state.channel_code) {
      return false
    } else if (!this.state.office_code) {
      return false
    } else if (!this.state.phone) {
      return false
    } else if (!this.state.first_name) {
      return false
    } else if (!this.state.last_name) {
      return false
    } else if (!this.state.agent_id) {
      return false
    }
    return true
  }

  render() {
    return (
      <form className={!this.state.validated ? 'was-validated' : null}>
        <h4 className="text-center">Create New Sales Agent</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Agent ID</label>
            <div className="input-group">
              <input required className="form-control rounded" maxLength="4" name="agent_id_1" placeholder="TEST" value={this.state.agent_id_1} onChange={e => this.updateAgentId(e)} />
              <p className="m-2">-</p>
              <input required className="form-control rounded" maxLength="3" name="agent_id_2" placeholder="QXE" value={this.state.agent_id_2} onChange={e => this.updateAgentId(e)} />
              <p className="m-2">-</p>
              <input required className="form-control rounded" maxLength="4" name="agent_id_3" placeholder="1234" value={this.state.agent_id_3} onChange={e => this.updateAgentId(e)} />
            </div>
            <div className="invalid-feedback">Required</div>
          </div>
          <div className="col-md-6 mb-3">
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
            <label>Phone</label>
            <input required className="form-control" type="text" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
            <div className="invalid-feedback">Required</div>
          </div>
          <div className="col-md-4 mb-3">
            <label>Status</label>
            <select className="custom-select w-100" value={this.state.status} onChange={e => this.setState({ status: e.target.value })}>
              <option value="Inactive">Inactive</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label>Enrollment App Vendor</label>
            <select className="custom-select w-100" value={this.state.vendor_code} onChange={e => this.setState({ vendor_code: e.target.value })}>
              {Object.keys(this.vendor_codes).map(key =>
                <option key={key} value={this.vendor_codes[key]}>{this.vendor_codes[key]}</option>
              )}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Source Code</label>
            <select required className="custom-select w-100" value={this.state.source_code} onChange={e => this.selectSourceCode(e.target.value)}>
              <option value="" />
              {Object.keys(this.props.sources).map(key =>
                <option key={key} value={this.props.sources[key].source_code}>{this.props.sources[key].source_code}</option>
              )}
            </select>
            <div className="invalid-feedback">Required</div>
          </div>
          <div className="col-md-4 mb-3">
            <label>Office Code</label>
            <select required className="custom-select w-100" value={this.state.office_code} onChange={e => this.setState({ office_code: e.target.value })}>
              <option value="" />
              {Object.keys(this.props.offices).map(key =>
                <option key={key} value={this.props.offices[key].office_code}>{this.props.offices[key].office_code}</option>
              )}
            </select>
            <div className="invalid-feedback">Required</div>
          </div>
          <div className="col-md-4 mb-3">
            <label>Channel Code</label>
            <select required className="custom-select w-100" value={this.state.channel_code} onChange={e => this.setState({ channel_code: e.target.value })}>
              {Object.keys(this.props.channels).map(key =>
                <option key={key} value={this.props.channels[key].channel_code}>{this.props.channels[key].channel_code}</option>
              )}
            </select>
            <div className="invalid-feedback">Required</div>
          </div>
        </div>
        <button className="btn btn-primary btn-md btn-block mt-4" onClick={this.handleSignup}>Create</button>
        <div className="valid-feedback d-block text-center mt-2">
          {this.state.message}
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.all,
    offices: state.sources.offices,
    channels: state.channels,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources, createUser, getChannels, getSourceOffices }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
