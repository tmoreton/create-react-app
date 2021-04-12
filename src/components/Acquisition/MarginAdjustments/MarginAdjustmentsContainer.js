import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MARGIN_ADJUSTMENTS } from '../../../utils/roles'
import startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import history from '../../../history'
import getMarginAdjustments from '../../../actions/marginAdjustments/getMarginAdjustments'
import { changeModule } from '../../../actions/changeModule'
import NavTabs from '../../Shared/NavTabs'

const tabs = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'active',
    label: 'Active',
  },
  {
    key: 'inactive',
    label: 'Inactive',
  },
]

class MarginAdjustmentsContainer extends Component {

  state = {
    tab: 'active',
  }

  componentDidMount() {
    this.props.getMarginAdjustments()
    this.props.changeModule('Margin Adjustments')
  }

  writeAccess() {
    return this.props.roles.some(role => MARGIN_ADJUSTMENTS.WRITE.includes(role.name))
  }

  marginAdjustments() {
    const marginAdjustments = Object.values(this.props.marginAdjustments)
    if (this.state.tab === 'all') {
      return marginAdjustments
    } else if (this.state.tab === 'inactive') {
      return marginAdjustments.filter(mA => !mA.active)
    } else {
      return marginAdjustments.filter(mA => mA.active)
    }
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
  }

  createMarginAdjustment = () => {
    history.push('/margin_adjustments/new')
  }

  handleSectionSelect = (margin_adjustment) => {
    history.push(`/margin_adjustments/${margin_adjustment.margin_adjustment_id}`)
  }

  tableColumns() {
    const columns = []
    const columnsToHide = ['margin_adjustment_id', 'active', 'created_at', 'updated_at']
    const sortedColumns = sortBy(Object.keys(this.marginAdjustments()[0]), (element) => {
      const rank = {
        description : 1,
        plan_code: 2,
        adjustment: 3,
        effective_dt: 4,
        margin_adjustment_segments: 5,
      }
      return rank[element]
    })

    sortedColumns.forEach(column => {
      if (!columnsToHide.includes(column)) {
        const tableColumn = {
          Header: startCase(column),
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => (
            matchSorter(rows, filter.value, { keys: [column] })
          ),
          filterAll: true,
        }
        if (tableColumn.id === 'margin_adjustment_segments') {
          tableColumn.Header = 'Segments'
          tableColumn.minWidth = 200
        }
        if (tableColumn.id === 'adjustment') {
          tableColumn.Header = 'Margin'
          tableColumn.minWidth = 50
        }
        if (tableColumn.id === 'margin_adjustment_segments') tableColumn.Cell = this.renderSegments
        columns.push(tableColumn)
      }
    })
    return columns
  }

  renderSegments = (cellInfo) => {
    const marginAdjustments = this.marginAdjustments()
    const marginAdjustmentSegments = marginAdjustments[cellInfo.index][cellInfo.column.id]
    const segments = marginAdjustmentSegments.map(marginAdjustmentSegment => marginAdjustmentSegment.segment.segment_description).join(', ')
    return <div>{segments}</div>
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Margin Adjustments</h4>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-4">
            <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
          </div>
        </div>
        {isEmpty(this.marginAdjustments()) ? (
          <p>No margin adjustments...</p>
        ) : (
          <div>
            <div className="text-right">
              <small>Tip: Hold shift when sorting to multi-sort!</small>
            </div>
            <ReactTable
              filterable
              className="-striped -highlight mb-3"
              columns={this.tableColumns()}
              data={this.marginAdjustments()}
              defaultPageSize={100}
              getTdProps={(s,r,c) => {
                if (c.id !== '_selector' && !!r) {
                  return {
                    onClick: () => this.handleSectionSelect(r.original),
                    style: {
                      cursor: 'pointer',
                    },
                  }
                } else {
                  return {}
                }
              }}
              keyField="margin_adjustment_id"
              style={{ height: '500px' }}
            />
          </div>
        )}
        {this.writeAccess() && <button className="btn btn-primary" onClick={this.createMarginAdjustment}>Create Margin Adjustment</button>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marginAdjustments: state.marginAdjustments.info,
    roles: state.user.roles,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getMarginAdjustments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarginAdjustmentsContainer)
