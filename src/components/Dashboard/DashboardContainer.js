import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { getDashboard } from '../../actions/getDashboard'
import { getOfficeAgents } from '../../actions/getOfficeAgents'

class DashboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      agent_id: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.userId !== prevProps.user.userId){
      this.props.getOfficeAgents(this.props.user.userId)
    }
    if (this.props.agents !== prevProps.agents){
      this.props.getDashboard(this.props.agents, this.state.fromDate, this.state.toDate)
    }
  }

  getOfficeDashboard(){
    const { fromDate, toDate, agent_id } = this.state
    if (agent_id === ''){
      this.props.getDashboard(this.props.agents, fromDate, toDate)
    } else {
      this.props.getDashboard(agent_id, fromDate, toDate)
    }
  }

  render() {
    return (
      <div className="text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Agents</label>
            <select className="custom-select w-100" value={this.state.agent_id} onChange={e => this.setState({ agent_id: e.target.value })}>
              <option value="">All</option>
              {Object.keys(this.props.agents).map(key =>
                <option key={key} value={this.props.agents[key]}>{this.props.agents[key]}</option>
              )}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label>Start Date</label>
            <input className="custom-select w-100" name="from_dt" placeholder="Start Date" type="date" value={this.state.fromDate} onChange={e => this.setState({ fromDate: e.target.value })} />
          </div>
          <div className="col-md-3 mb-3">
            <label>End Date</label>
            <input className="custom-select w-100" name="to_dt" placeholder="End Date" type="date" value={this.state.toDate} onChange={e => this.setState({ toDate: e.target.value })} />
          </div>
          <div className="col-md-2 mt-4">
            <button className="btn btn-primary btn-md" onClick={() => this.getOfficeDashboard()}>Search</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    agents: state.dashboard.agents,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDashboard, getOfficeAgents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
