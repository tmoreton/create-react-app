import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCompRunsSummary } from '../../actions/Compensation/getCompRunsSummary'
import { getCompRunSchedules } from '../../actions/Compensation/getCompRunSchedules'
import history from '../../history'
import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import { getCompColumns } from './CompColumns'
import { changeModule } from '../../actions/changeModule'

class CompensationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
    }
  }

  componentDidMount() {
    this.props.changeModule('Compensation')
    this.props.getCompRunSchedules()
    this.getCompColumns()
  }

  handleNewScheduleClick = () => {
    history.push('/compensation/schedules/new')
  }

  getCompColumns = () => {
    const types = getCompColumns()
    const columns = types.map(type => {
      return {
        Header: type.Header,
        id: type.id,
        func: type.func,
        accessor: type.id,
        filterMethod: (filter, rows) => (
          matchSorter(rows, filter.value, { keys: [type.id] })
        ),
        filterAll: true,
        Cell: row => {
          if (row.column.func){
            const schedule_code = row.original.comp_run_schedule_code
            const comp_run_id = row.original.latest_comp_run && row.original.latest_comp_run.comp_run_id
            return <button className="btn btn-primary pt-0 pb-0" onClick={() => row.column.func(schedule_code, comp_run_id)}>{row.column.id}</button>
          } else {
            return `${row.original[row.column.id]}`
          }          
        },
      }
    })
    this.setState({ columns })
  }

  render() {
    return (
      <div>
        <h1>Compensation</h1>
        <button className="btn btn-dark mr-1 mb-2 ml-2" onClick={this.handleNewScheduleClick}>Create New Schedule</button>
        <h2 className="mt-3">Schedules</h2>
        <ReactTable
          filterable
          className="-striped -highlight mb-3"
          columns={this.state.columns}
          data={this.props.compRunSchedules}
          defaultFiltered={[]}
          defaultPageSize={25}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compRunSchedules: state.compRunSchedules.compRunSchedules,
    baseCompAttributes: state.compRunSchedules.baseCompAttributes,
  }
}

const mapDispatchToProps = {
  getCompRunsSummary,
  getCompRunSchedules,
  changeModule,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompensationContainer)
