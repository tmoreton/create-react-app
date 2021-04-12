import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOffices } from '../../actions/getOffices'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'

class OfficeTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [{
        office_code: '',
        source_code: '',
      }],
    }
  }

  componentDidMount = () => {
    this.props.getOffices()
  }

  render() {
    const columns = [{
      Header: 'Office Name',
      accessor: 'office_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['office_code'] })
      ),
      filterAll: true,
    }, {
      Header: 'Source Code',
      accessor: 'source_code',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['source_code'] })
      ),
      filterAll: true,
    },
    ]

    return (
      <div className="office-table col-md-7 mx-auto">
        <ReactTable filterable className="-striped -highlight mb-3" columns={columns} data={this.props.offices} defaultPageSize={10} keyField="office_code" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    offices: state.offices,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getOffices }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeTable)
