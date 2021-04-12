import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import matchSorter from 'match-sorter'
import startCase from 'lodash/startCase'
import cloneDeep from 'lodash/cloneDeep'
import { changeModule } from '../../../actions/changeModule'
import StandardTable from '../../Shared/StandardTable.js'
import NavTabs from '../../Shared/NavTabs'
import getDispositions from '../../../actions/mx/getDispositions'
import updateDisposition from '../../../actions/mx/updateDisposition'

const tabs = [
  {
    key: 'inactive',
    label: 'Inactive',
  },
  {
    key: 'active',
    label: 'Active',
  },
]

class Dispositions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'active',
    }
  }

  componentDidMount() {
    this.props.getDispositions()
    this.props.changeModule('Dispositions')
  }

  onUpdateDisposition(disposition, column, value) {
    const updatedDisposition = cloneDeep(disposition)
    updatedDisposition[column] = value
    this.props.updateDisposition(updatedDisposition)
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
  }

  columns() {
    const filterableColumnNames = ['disposition_code', 'disposition_desc']
    const filterableColumns = filterableColumnNames.map(column => {
      return {
        Header: startCase(column),
        id: column,
        accessor: (row) => {
          return row[column]
        },
        filterMethod: (filter, rows) => (
          matchSorter(rows, filter.value, { keys: [column] })
        ),
        filterAll: true,
      }
    })

    const updatableColumnNames = ['is_active', 'is_retention_success', 'is_retention_fail', 'is_sale_success', 'is_sale_fail', 'send_csat']
    const updatableColumns = updatableColumnNames.map(column => {
      return {
        Header: startCase(column),
        id: column,
        accessor: (row) => {
          return <input checked={row[column]} type="checkbox" onChange={(event) => this.onUpdateDisposition(row, column, event.target.checked)} />
        },
        sortMethod: (a, b) => {
          return b.props.checked - a.props.checked
        },
        filterable: false,
      }
    })

    return [...filterableColumns, ...updatableColumns]
  }

  data() {
    return this.props.dispositions.filter(disposition => {
      return disposition.is_active === (this.state.tab === 'active')
    })
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    return (<Fragment>
      <h1>Dispositions</h1>
      <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
      <br />
      <StandardTable
        columns={this.columns()}
        data={this.data()}
        height="600px"
        keyField="disposition_id"
      />
    </Fragment>)
  }
}

function mapStateToProps({ dispositions }) {
  return {
    loading: dispositions.loading,
    dispositions: dispositions.dispositions,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getDispositions, updateDisposition }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dispositions)
