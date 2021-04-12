import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import history from '../../history'

class EventContainer extends Component {

  goToCreate = (input) => {
    history.push('/events/create', {
      edit: input,
    })
  }

  render() {
    const columns = [{
      Header: 'Event',
      accessor: 'location_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['location_name'] })
      ),
      filterAll: true,
    },{
      Header: 'From Date',
      accessor: 'from_date',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['from_date'] })
      ),
      filterAll: true,
    },{
      Header: 'To Date',
      accessor: 'to_date',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['to_date'] })
      ),
      filterAll: true,
    }, {
      Header: 'Type of Location',
      accessor: 'sales_location_type_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['sales_location_type_code'] })
      ),
      filterAll: true,
    }, {
      Header: 'Workable Hours',
      accessor: 'workable_hours',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['workable_hours'] })
      ),
      filterAll: true,
    }, {
      Header: 'Edit',
      accessor: 'edit',
      Cell: () => <button className="btn btn-primary-outline rounded" type="button">Edit</button>,
    }]

    return (
      <div className="col-md-12 mx-auto">
        <div className="d-flex">
          <div />
          <h2 className="text-center w-100">Sales Events</h2>
          <button className="btn btn-primary rounded mb-3 mr-3" type="button" onClick={() => history.push('/events/create')}>Create Event</button>
        </div>
        <ReactTable
          filterable
          className="-striped -highlight mb-3"
          columns={columns}
          data={this.props.events}
          defaultPageSize={10}
          getTdProps={(s,r,c) => {
            if (c.id !== '_selector') {
              return {
                onClick: () => this.goToCreate(r.original),
                style: {
                  cursor: 'pointer',
                },
              }
            } else {
              return {}
            }
          }}
          keyField="location_name"
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.locations.salesLocations,
  }
}

export default connect(mapStateToProps, null)(EventContainer)
