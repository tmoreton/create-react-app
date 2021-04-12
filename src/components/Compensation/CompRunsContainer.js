import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCompRuns } from '../../actions/Compensation/getCompRuns'
import CompRun from './CompRun'
import history from '../../history'

class CompRunsContainer extends Component {
  componentDidMount() {
    if (this.props.match.params.compRunScheduleCode){
      this.props.getCompRuns(this.props.match.params.compRunScheduleCode)
    }
  }

  compRunsData() {
    return this.props.compRuns
  }

  handleAuditClick(comp_run_schedule_code, comp_run_id) {
    history.push(`/compensation/${comp_run_schedule_code}/runs/${comp_run_id}`)
  }

  render() {
    return (
      <div>
        <h1>COMPENSATION RUNS FOR {this.props.match.params.compRunScheduleCode}</h1>
        {(this.props.compRuns || []).map((compRun, index) => (
          <CompRun key={index} compRun={compRun} handleAuditClick={this.handleAuditClick} />
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compRuns: state.compRuns,
  }
}

const mapDispatchToProps = {
  getCompRuns,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompRunsContainer)
