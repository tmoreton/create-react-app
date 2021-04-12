import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import pickBy from 'lodash/pickBy'
import sortBy from 'lodash/sortBy'
import history from '../../history'
import { changeModule } from '../../actions/changeModule'
import { getSources } from '../../actions/getSources'
import { getSource } from '../../actions/getSource'
import { getSalesAgents } from '../../actions/getSalesAgents'

class SalesAgentsIndex extends Component {

  constructor(props) {
    super(props)
    this.handleViewSchedule = this.handleViewSchedule.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      filtered: this.props.salesAgents,
    }
  }

  componentDidMount() {
    const sourceCode = this.props.sourceCode
    this.props.getSalesAgents(sourceCode)
  }

  componentDidUpdate(prevProps) {
    if (this.props.salesAgents !== prevProps.salesAgents) {
      this.setState({ filtered: this.props.salesAgents })
    }
  }

  handleViewSchedule(salesAgentId) {
    history.push(`/sales_agents/${salesAgentId}/schedule`)
  }

  handleChange(event) {
    const isMatch = (salesAgent) => salesAgent.first_name.match(new RegExp(event.target.value, 'i'))
    this.setState({ filtered: pickBy(this.props.salesAgents, (source) => isMatch(source)) })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <input autoFocus className="form-control" placeholder="Search for a sales agent" type="text" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <th>Name</th>
            <th>Agent Id</th>
            <th>Email</th>
            <th />
          </thead>
          <tbody>
            {sortBy(Object.keys(this.state.filtered)).map(salesAgentId => (
              <tr key={salesAgentId}>
                <td>{this.props.salesAgents[salesAgentId].first_name} {this.props.salesAgents[salesAgentId].last_name}</td>
                <td>{this.props.salesAgents[salesAgentId].agent_id}</td>
                <td>{this.props.salesAgents[salesAgentId].email}</td>
                <td>
                  <a className="text-primary" onClick={() => this.handleViewSchedule(salesAgentId)}>View Schedule</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    salesAgents: state.salesAgents,
    weeksFilter: state.weeksFilter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources, getSource, getSalesAgents, changeModule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesAgentsIndex)
