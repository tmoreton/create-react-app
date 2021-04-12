import React, { Component } from 'react'
import { getSalesPermissions } from '../../actions/permissions/getSalesPermissions'
import matchSorter from 'match-sorter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import history from '../../history'

class PermissionsTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [{
        channel_codes: '',
        description: '',
        loa_required: this.props.salesPermissions,
        office_codes: '',
        source_codes: '',
        state_codes: '',
        tpv_delay: '',
        partial_enrollment_enabled: '',
        vendor_ids: '',
      }],
    }
  }

  componentDidMount = async () => {
    this.props.getSalesPermissions()
  }

  goToUpdate = (input) => {
    history.push('/permissions/update', {
      edit: input,
    })
  }

  render() {
    const tpvTypes = ['Mobile Web', 'Phone IVR', 'Live Agent', 'Internal']
    const columns = [{
      Header: 'Description',
      accessor: 'description',
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['description'] })
      ),
      filterAll: true,
    }, {
      Header: 'Channels',
      accessor: 'channel_codes',
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['channel_codes'] })
      ),
      Cell: row =>
        row.original.channel_codes !== null ?
          ( row.original.channel_codes.map(channel =>
            (<ul key={channel} className="list-group list-group-flush">
              <li>{channel}</li>
            </ul>
            ))
          ): (<span>No channel code</span>),
      filterAll: true,
    }, {
      Header: 'Sources',
      accessor: 'source_codes',
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['source_codes'] })
      ),
      filterAll: true,
      Cell: row =>
        row.original.source_codes !== null ?
          (row.original.source_codes.map(source =>
            (<ul key={source} className="list-group list-group-flush">
              <li>{source}</li>
            </ul>
            ))
          ): (<span>No source code</span>),
    }, {
      Header: 'Offices',
      accessor: 'office_codes',
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['office_codes'] })
      ),
      filterAll: true,
      Cell: row =>
        row.original.office_codes !== null ?
          (row.original.office_codes.map(office =>
            (<ul key={office} className="list-group list-group-flush">
              <li>{office}</li>
            </ul>
            ))
          ): (<span>No office provided</span>),
    }, {
      Header: 'States',
      accessor: 'state_codes',
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['state_codes'] })
      ),
      filterAll: true,
      Cell: row =>
        row.original.state_codes !== null ?
          ( row.original.state_codes.map(state =>
            (<ul key={state} className="list-group list-group-flush">
              <li>{state}</li>
            </ul>
            ))
          ): (<span>No states provided</span>),
    }, {
      Header: 'TPVs',
      accessor: 'vendor_tpv_type_ids',
      Cell: row =>
        row.original.vendor_tpv_type_ids !== null ?
          ( row.original.vendor_tpv_type_ids.map(tpv =>
            (<ul key={tpv} className="list-group list-group-flush">
              <li>{tpvTypes[(parseInt(tpv, 10) - 1)]}</li>
            </ul>
            ))
          ): (<span>No TPV provided</span>),
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['vendor_tpv_type_ids'] })
      ),
      filterAll: true,
    }, {
      id: 'loa_required',
      Header: 'LOA?',
      accessor: row => { return row.loa_required ? 'Yes' : 'No' },
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['loa_required'] })
      ),
      filterAll: true,
    }, {
      id: 'tpv_delay',
      Header: 'TPV Delay?',
      accessor: row => { return row.tpv_delay ? 'Yes' : 'No' },
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['tpv_delay'] })
      ),
      filterAll: true,
    }, {
      id: 'partial_enrollment_enabled',
      Header: 'Partial?',
      accessor: row => { return row.partial_enrollment_enabled ? 'Yes' : 'No' },
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['partial_enrollment_enabled'] })
      ),
      filterAll: true,
    }, {
      id: 'active',
      Header: 'Status',
      accessor: row => { return row.active ? 'Active' : 'Inactive' },
      filterMethod: (filter, rows) => (
        matchSorter (rows, filter.value, { keys: ['active'] })
      ),
      filterAll: true,
    },
    {
      Header: 'Update Permission',
      accessor: 'edit',
      Cell: row => (
        <div className="row justify-content-md-center">
          <button className="btn btn-primary btn-md mr-2" onClick={() => this.goToUpdate(row.original)}>Edit</button>
        </div>
      ),
    },
    ]

    return (
      <div className="permissions-table">
        <h4 className="text-center">Existing Sales Permissions</h4>
        { this.props.salesPermissions.length &&
        <ReactTable
          filterable
          className="-striped -highlight mb-3"
          columns={columns}
          data={this.props.salesPermissions}
          defaultPageSize={10}
          getTdProps={(c, r) => {
            if (c.id !== '_selector') {
              return {
                onClick: () => this.goToUpdate(r.original),
                style: {
                  cursor: 'pointer',
                },
              }
            } else {
              return {}
            }
          }}
          keyField="description"
        />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    salesPermissions: state.salesPermissions.all,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSalesPermissions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsTable)
