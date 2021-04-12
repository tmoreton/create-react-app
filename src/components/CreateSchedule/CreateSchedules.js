import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import matchSorter from 'match-sorter'
import qs from 'qs'
import startCase from 'lodash/startCase'
import Table from '../Table'

class CreateSchedules extends Component {

  hasSelectedLocations() {
    return this.props.locationsToSchedule.length > 0
  }

  tableColumns() {
    const columns = []
    const columnsToHide = ['location_code', 'created_at', 'updated_at']

    Object.keys(this.props.locationsTableData[0]).forEach(column => {
      if (!columnsToHide.includes(column)) {
        columns.push({
          Header: startCase(column),
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => (
            matchSorter(rows, filter.value, { keys: [column] })
          ),
          filterAll: true,
        })
      }
    })
    return columns
  }

  render() {
    return (
      <div className="my-3">
        <Table
          columns={this.tableColumns()}
          data={this.props.locationsTableData}
          handleRowSelect={this.props.handleLocationSelect}
          handleToggleSelection={this.props.handleToggleSelection}
          keyField="location_code"
          selection={this.props.locationsToSchedule}
        />
        <Link
          className={'my-2 btn btn-' + (this.hasSelectedLocations() ? 'primary' : 'outline-secondary')}
          disabled={!this.hasSelectedLocations()}
          to={{
            pathname: `/schedules/channels/${this.props.channelCode}/create`,
            search: `${qs.stringify({ locationsToSchedule: this.props.locationsToSchedule.map(location => location.location_code) }, { arrayFormat: 'repeat' })}`,
          }}
        >
          Create
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locationsTableData: state.locations.tableData,
    locationsToSchedule: state.locationsToSchedule.selection,
  }
}

export default connect(mapStateToProps)(CreateSchedules)
