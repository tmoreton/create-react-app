import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchAgent } from '../../actions/searchAgent'
import { updateAgent } from '../../actions/updateAgent'
import getSourceOffices from '../../actions/schedules/getSourceOffices'
import getChannels  from  '../../actions/channels/getChannels'
import isEmpty from 'lodash/isEmpty'

class SearchContainer extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      editable: false,
      selected: null,
      statusOptions: ['Active', 'Inactive'],
      status: '',
      office_code: '',
      agent_id: null,
      channel_code: '',
    }
  }

  searchAgent = (e) => {
    e.preventDefault()
    this.props.searchAgent(this.state.search)
  }

  saveEdit = async (e, key) => {
    e.preventDefault()
    if (this.state.status){
      this.props.updateAgent(this.agent_id, 'status', this.state.status)
    }
    if (this.state.office_code){
      this.props.updateAgent(this.agent_id, 'office_code', this.state.office_code)
    }
    if (this.state.channel_code){
      this.props.updateAgent(this.agent_id, 'channel_code', this.state.channel_code)
    }
    this.setState({ editable: false, selected: key })
  }

  cancelEdit = (key) => {
    this.setState({ editable: false, selected: key })
    this.props.searchAgent(this.state.search)
  }

  edit = (key) => {
    this.setState({ editable: true, selected: key })
    this.props.getSourceOffices(this.props.salesAgents[key].source_code)
    this.props.getChannels()
    this.agent_id = this.props.salesAgents[key].agent_id
  }

  editableStatus = (key) => {
    if (this.state.editable && key === this.state.selected){
      return (
        <select className="browser-default custom-select" onChange={e => this.setState ({ status: e.target.value })}>
          <option selected={this.props.salesAgents[key].status === 'Active'} value="Active">Active</option>
          <option selected={this.props.salesAgents[key].status !== 'Active' ? true : null} value="Inactive">Inactive</option>
        </select>
      )
    }
    return this.props.salesAgents[key].status
  }

  editableOffice = (input) => {
    if (this.state.editable && input === this.state.selected){
      return (
        <select className="browser-default custom-select" onChange={e => this.setState ({ office_code: e.target.value })}>
          <option value="" />
          {Object.keys(this.props.offices).map(key =>
            <option key={key} selected={this.props.offices[key].office_code === this.props.salesAgents[input].office_code} value={this.props.offices[key].office_code}>{this.props.offices[key].office_code}</option>
          )}
        </select>
      )
    }
    return this.props.salesAgents[input].office_code
  }

  editableChannelCode = (input) => {
    const sourceCode = this.props.salesAgents[input].source_code
    const showDropDown = (!isEmpty(sourceCode) && sourceCode.toLowerCase().includes('inspire'))
    if (this.state.editable && input === this.state.selected && showDropDown){
      return (
        <select className="browser-default custom-select" onChange={e => this.setState ({ channel_code: e.target.value })}>
          <option value="" />
          {this.props.channels.map(channelObj =>
            <option key={channelObj.channel_code} selected={channelObj.channel_code === this.props.salesAgents[input].channel_code} value={channelObj.channel_code}>{channelObj.channel_code}</option>
          )}
        </select>
      )
    }
    return this.props.salesAgents[input].channel_code
  }

  render() {
    return (
      <div>
        <h4 className="text-center">Edit Sales Agent</h4>
        <div className="input-group mb-3">
          <input aria-describedby="basic-addon2" aria-label="Search Agent" className="form-control" placeholder="Search Agent" type="text" value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
          <div className="input-group-append">
            <button className="btn btn-primary rounded" type="button" onClick={e => this.searchAgent(e)}>Search</button>
          </div>
        </div>
        { !isEmpty(this.props.salesAgents) &&
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Agent Id</th>
                <th scope="col">Channel Code</th>
                <th scope="col">Source Code</th>
                <th scope="col">Office Code</th>
                <th scope="col">Status</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.props.salesAgents).map(key =>(
                <tr key={key}>
                  <td>{this.props.salesAgents[key].agent_id}</td>
                  <td>{this.editableChannelCode(key)}</td>
                  <td>{this.props.salesAgents[key].source_code}</td>
                  <td>{this.editableOffice(key)}</td>
                  <td>{this.editableStatus(key)}</td>
                  <td>
                    {
                      this.state.editable && key === this.state.selected ?
                        <div>
                          <button className="btn btn-primary rounded mr-2" type="button" onClick={this.saveEdit}>Save</button>
                          <button className="btn btn-secondary rounded" type="button" onClick={this.cancelEdit}>Cancel</button>
                        </div>
                        :
                        <button className="btn btn-primary-outline rounded" type="button" onClick={() => this.edit(key)}>Edit</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    salesAgents: state.salesAgents,
    offices: state.sources.offices,
    channels: state.channels,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchAgent, updateAgent, getSourceOffices, getChannels }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
