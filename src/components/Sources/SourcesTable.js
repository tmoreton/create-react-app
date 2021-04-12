import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSources } from '../../actions/getSources'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import history from '../../history'

class SourcesTable extends Component {
  componentDidMount = () => {
    this.props.getSources()
  }

  goToUpdate = (input) => {
    history.push('/sources/update', {
      edit: input,
    })
  }

  render() {
    const columns = [{
      Header: 'Source Code',
      accessor: 'source_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['source_code'] })
      ),
      filterAll: true,
    }, {
      Header: 'Source ID',
      accessor: 'source_short_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['source_short_code'] })
      ),
      filterAll: true,
    },{
      Header: 'Source Name',
      accessor: 'source_name',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['source_name'] })
      ),
      filterAll: true,
    }, {
      Header: 'Update Source',
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
      <div className="office-table col-md-10 mx-auto">
        <ReactTable 
          filterable 
          className="-striped -highlight mb-3" 
          columns={columns} 
          data={this.props.sources} 
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
          keyField="source_code" 
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.sources,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (SourcesTable)
