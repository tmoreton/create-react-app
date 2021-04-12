import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getAllUsers from '../../actions/Users/getAllUsers'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import history from '../../history'

class UsersTable extends Component {

  componentDidMount = () => {
    this.props.getAllUsers()
  }

  goToUpdate = (input) => {
    history.push('/users/update', {
      edit: input,
    })
  }

  render() {
    const columns = [{
      Header: 'User ID',
      accessor: 'user_id',
      width: 80,
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['user_id'] })
      ),
      filterAll: true,
    }, {
      Header: 'Email Address',
      accessor: 'email',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['email'] })
      ),
      filterAll: true,
    }, {
      Header: 'Last Name',
      accessor: 'last_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['last_name'] })
      ),
      filterAll: true,
    }, {
      Header: 'First Name',
      accessor: 'first_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['first_name'] })
      ),
      filterAll: true,
    }, {
      Header: 'Source',
      accessor: 'source_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['source_name'] })
      ),
      filterAll: true,
    }, {
      Header: 'Active?',
      id: 'is_active',
      accessor: props => { return props.is_active ? 'Yes' : 'No' }, 
      width: 75,
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['is_active'] })
      ),
      filterAll: true,
    }, {
      Header: 'Update User',
      accessor: 'edit',
      width: 125,
      Cell: row => (
        <div className="row justify-content-md-center">
          <button className="btn btn-primary btn-md mr-2" onClick={() => this.goToUpdate(row.original)}>Edit</button>
        </div>
      ),
    },
    ]
    return (
      <div className="office-table col-md-12 mx-auto">
        <ReactTable 
          filterable 
          className="-striped -highlight mb-3" 
          columns={columns} 
          data={this.props.users} 
          defaultPageSize={20}
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
          keyField="external_id" 
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.all,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllUsers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UsersTable)
