import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSourceScheduleHistory } from '../../actions/getSourceScheduleHistory'

class PartnerScheduleHistoryContainer extends Component {

  componentDidMount() {
    this.props.getSourceScheduleHistory(this.props.match.params.sourceCode)
  }

  render() {

    if (this.props.scheduleHistory.length === 0) {
      return (
        <div>
          <h4 className="my-2">
            {this.props.source.source_name}
          </h4>
          <p>No history for this partner</p>
        </div>
      )
    }
    return (
      <div className="container-fluid">
        <h4 className="my-2">
          {this.props.source.source_name}
        </h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sales Agent</th>
              <th>Location</th>
              <th>Shift</th>
              <th>Assigned By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.scheduleHistory.map(historyRow => (
              <tr key={`sales-agent-history-${historyRow.location_shift_sales_agent_history_id}`}>
                <td>{historyRow.sales_agent.first_name} {historyRow.sales_agent.last_name}</td>
                <td>{historyRow.location.location_name}</td>
                <td>{new Date(historyRow.start_dt).toLocaleString()}</td>
                <td>{historyRow.user.email}</td>
                <td>{new Date(historyRow.effective_dt).toLocaleString()}</td>
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
    source: state.sources.active,
    scheduleHistory: state.scheduleHistory,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSourceScheduleHistory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerScheduleHistoryContainer)
