import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../history'
import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import { STATIC_MARKET_RATES } from '../../../utils/roles'
import staticMarketRateId from '../../../utils/staticMarketRateId'
import { changeModule } from '../../../actions/changeModule'
import getStaticMarketRates from '../../../actions/staticMarketRates/getStaticMarketRates'
import updateStaticMarketRate from '../../../actions/staticMarketRates/updateStaticMarketRate'
import dismissStaticMarketRateSaved from '../../../actions/staticMarketRates/dismissStaticMarketRateSaved'

class StaticMarketRatesContainer extends Component {

  state = {}

  componentDidMount() {
    this.props.changeModule('Static Market Rates')
    this.props.getStaticMarketRates()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saving !== this.props.saving && !this.props.saving) {
      setTimeout(() => {
        this.props.dismissStaticMarketRateSaved()
      }, 3000)
    }
  }

  writeAccess() {
    return this.props.roles.some(role => STATIC_MARKET_RATES.WRITE.includes(role.name))
  }

  staticMarketRates() {
    return Object.values(this.props.staticMarketRates)
  }

  tableColumns() {
    const columns = []
    const columnsToHide = [
      'static_market_rate_id',
      'market_rate_id',
      'start_dt',
      'end_dt',
      'market_rate_code',
      'created_at',
      'updated_at',
    ]

    Object.keys(this.staticMarketRates()[0]).forEach(column => {
      if (!columnsToHide.includes(column)) {
        const tableColumn = {
          Header: column,
          id: column,
          accessor: column,
          filterMethod: (filter, rows) => (
            matchSorter(rows, filter.value, { keys: [column] })
          ),
          filterAll: true,
        }
        if (column === 'rate') tableColumn.Cell = this.renderEditable
        columns.push(tableColumn)
      }
    })
    return columns
  }

  renderEditable = (cellInfo) => {
    const staticMarketRates = this.staticMarketRates()
    return (
      <div
        suppressContentEditableWarning
        contentEditable={this.writeAccess()}
        dangerouslySetInnerHTML={{
          __html: staticMarketRates[cellInfo.index][cellInfo.column.id],
        }}
        style={{ backgroundColor: '#fff' }}
        onBlur={e => {
          const data = [...staticMarketRates]
          const originalRate = cellInfo.original.rate
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
          if (originalRate !== e.target.innerHTML) {
            this.props.updateStaticMarketRate(cellInfo.original, originalRate, e.target.innerHTML)
          }
        }}
      />
    )
  }

  createStaticMarketRate() {
    history.push('/static_market_rates/new')
  }

  render() {
    const staticMarketRates = this.staticMarketRates()
    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Static Market Rates</h4>
        </div>
        {this.props.loading ? (
          <div>Loading static market rates...</div>
        ) : (
          staticMarketRates.length === 0 ? (
            <p>No static market rates</p>
          ) : (
            <div>
              <div className="text-right">
                <small>Tip: Hold shift when sorting to multi-sort!</small>
              </div>
              <ReactTable
                filterable
                className="-striped -highlight mb-3"
                columns={this.tableColumns()}
                data={staticMarketRates}
                defaultPageSize={100}
                getTdProps={(s,r,c) => {
                  if (c.id === 'rate') {
                    return {
                      style: {
                        cursor: 'pointer',
                      },
                    }
                  } else {
                    return {}
                  }
                }}
                getTrProps={(state, rowInfo) => {
                  if (!rowInfo) return {}
                  if (staticMarketRateId(rowInfo.original) === this.props.savedRateId) {
                    return {
                      style: { backgroundColor: '#c8f2d2' },
                    }
                  }
                  return {}
                }}
                keyField="static_market_rate_id"
                style={{ height: '500px' }}
              />
            </div>
          )
        )}
        {(!this.props.loading && this.writeAccess()) && <button className="btn btn-primary" onClick={this.createStaticMarketRate}>Create Static Market Rate</button>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    staticMarketRates: state.staticMarketRates.info,
    savedRateId: state.staticMarketRates.savedRateId,
    loading: state.staticMarketRates.loading,
    saving: state.staticMarketRates.saving,
    roles: state.user.roles,
  }
}

const mapDispatchToProps = {
  changeModule,
  getStaticMarketRates,
  updateStaticMarketRate,
  dismissStaticMarketRateSaved,
}

export default connect(mapStateToProps, mapDispatchToProps)(StaticMarketRatesContainer)
