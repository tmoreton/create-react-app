import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import DashboardContainer from './DashboardContainer'
import Chart from './Chart'
import Table from './Table'

class Dashboard extends Component {

  componentDidMount() {
    this.props.changeModule('Dashboard')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12 mx-auto text-center">
          <h2 className="p-2">Sales Dashboard</h2>
          <DashboardContainer />
          <h4 className="pt-5">Order Trend</h4>
          <Chart data={this.props.graph} />
          <h4 className="pt-5">Agent Full Order List</h4>
          <Table data={this.props.dashboard} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard.data,
    graph: state.dashboard.graph,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
