import React, { Component } from 'react'
import { connect } from 'react-redux'
import startCase from 'lodash/startCase'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import resetLocationsFilter from '../actions/schedules/resetLocationsFilter'

class LocationSearch extends Component {

  constructor(props) {
    super(props)
    this.onFilteredChange = this.onFilteredChange.bind(this)
  }

  onFilteredChange(event) {
    if (event.length === 0) {
      this.props.resetLocationsFilter()
    }
  }

  setColumns() {
    const columns = []
    const columnsToHide = ['location_code', 'location_desc', 'created_at', 'updated_at']
    Object.keys(this.props.locationsTableData[0]).forEach(column => {
      if (!columnsToHide.includes(column)) {
        columns.push({
          Header: startCase(column),
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => {
            const filteredLocations = matchSorter(rows, filter.value, { keys: [column] })
            this.props.handleFilter(filteredLocations)
            return filteredLocations
          },
          filterAll: true,
        })
      }
    })
    return columns
  }

  render() {
    const columns = this.setColumns()
    return (
      <div className="my-3">
        <ReactTable
          filterable
          className="hide-table-rows"
          columns={columns}
          data={this.props.locationsTableData}
          minRows={1}
          showPagination={false}
          onFilteredChange={this.onFilteredChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    locationsTableData: state.locations.tableData,
  }
}

const mapDispatchToProps = {
  resetLocationsFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch)
