import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import history from '../../history'

class LocationContainer extends Component {

  goToCreate = (input) => {
    history.push('/locations/create', {
      edit: input,
    })
  }

  render() {
    const columns = [{
      Header: 'Type',
      accessor: 'sales_location_type_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['sales_location_type_code'] })
      ),
      filterAll: true,
    },{
      Header: 'Channel',
      accessor: 'channel_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['channel_code'] })
      ),
      filterAll: true,
    },{
      Header: 'Partner',
      accessor: 'channel_partner_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['channel_partner_code'] })
      ),
      filterAll: true,
    }, {
      Header: 'Name',
      accessor: 'location_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['location_name'] })
      ),
      filterAll: true,
    }, { 
      id: 'location_active',
      Header: 'Status',
      accessor: row => { return row.location_active ? 'Active' : 'Inactive' },
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['location_active'] })
      ),
      filterAll: true,
    }, {
      Header: 'Description',
      accessor: 'location_desc',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['location_desc'] })
      ),
      filterAll: true,
    }, {
      Header: 'Address',
      accessor: 'address',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['address'] })
      ),
      filterAll: true,
    }, {
      Header: 'City',
      accessor: 'city',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['city'] })
      ),
      filterAll: true,
    }, {
      Header: 'State',
      accessor: 'state_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['state_code'] })
      ),
      filterAll: true,
    }, {
      Header: 'Zip',
      accessor: 'zip_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['zip_code'] })
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
          <h2 className="text-center w-100">Locations</h2>
          <button className="btn btn-primary rounded mb-3 mr-3" type="button" onClick={() => history.push('/locations/create')}>Create Location</button>
        </div>
        <ReactTable
          filterable
          className="-striped -highlight mb-3"
          columns={columns}
          data={this.props.locations}
          defaultFiltered={[{ id: 'location_active', value: 'Active' }]}
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
    locations: state.locations.salesLocations,
  }
}

export default connect(mapStateToProps, null)(LocationContainer)
