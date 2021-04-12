import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import qs from 'qs'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import orderBy from 'lodash/orderBy'
import isEmpty from 'lodash/isEmpty'
import history from '../../../history'

class AgentContext extends Component {

  state = {
    show: false,
  }

  setContext = (request) => {
    const keys = this.props.predicates.map(predicate => predicate.segment_predicate.predicate)
    const context = {}
    keys.forEach(key => context[key] = request[key])
    history.push(`/campaigns_context?${qs.stringify(context, { arrayFormat: 'repeat' })}`)
    this.props.setContext(context)
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show })
  }

  date(date) {
    date = moment(date)
    return `${date.format('LL')} ${date.format('h:mm a')}`
  }

  renderHeader() {
    return Array.from(Array(8)).map((x,i) => <th key={`th-${i}`}>hi</th>)
  }

  tableColumns() {
    const columns = []
    const header = [
      {
        Header: 'Campaign',
        id: 'campaign_name',
      },
      {
        Header: 'Agent',
        id: 'agent_id',
      },
      {
        Header: 'Source',
        id: 'source_code',
      },
      {
        Header: 'Channel',
        id: 'channel_code',
      },
      {
        Header: 'Market',
        id: 'market_code',
      },
      {
        Header: 'Revenue Class',
        id: 'revenue_class_code',
      },
      {
        Header: 'Zip Code',
        id: 'zip_code',
      },
      {
        Header: 'Date',
        id: 'request_dt',
      },
      {
        Header: '',
        id: 'see_context',
      },
    ]
    header.forEach(column => {
      const tableColumn = {
        Header: column.Header,
        id: column.id,
        accessor: column.id,
        filterMethod: (filter, rows) => (
          matchSorter(rows, filter.value, { keys: [column.id] })
        ),
        filterAll: true,
      }
      if (column.id === 'campaign_name') tableColumn.Cell = this.renderCampaign
      if (column.id === 'request_dt') tableColumn.Cell = this.renderDate
      if (column.id === 'see_context') tableColumn.Cell = this.renderSeeContext
      columns.push(tableColumn)
    })
    return columns
  }

  renderCampaign = (cellInfo) => {
    return (
      <Link rel="noopener noreferrer" target="_blank" to={`/campaigns/${cellInfo.original.campaign_id}`}>
        {cellInfo.original.campaign_name || 'Campaign'}
      </Link>
    )
  }

  renderDate = (cellInfo) => {
    return this.date(cellInfo.original.request_dt)
  }

  renderSeeContext = (cellInfo) => {
    return <a className="text-primary" onClick={() => this.setContext(cellInfo.original)}>Use as context</a>
  }

  renderTable() {
    if (this.props.loadingContext) return 'Loading...'

    return isEmpty(this.props.agentRequests) ? (
      <div>
        <p>{isEmpty(this.props.context) ? 'Set at least one property to see requests' : 'No requests found'}</p>
      </div>
    ) : (
      <ReactTable
        filterable
        className="-striped -highlight mb-3"
        columns={this.tableColumns()}
        data={orderBy(this.props.agentRequests, ['request_dt'],['desc'])}
        defaultPageSize={25}
        style={{ height: '300px' }}
      />
    )
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between">
          <strong>Recent Agent Requests</strong>
          <a className="text-primary" onClick={this.toggleShow}>{this.state.show ? 'Hide' : 'Show'}</a>
        </div>
        {this.state.show ? <div className="card-body">{this.renderTable()}</div> : null}
      </div>

    )
  }
}

function mapStateToProps(state){
  return {
    agentRequests: state.context.agent,
    predicates: Object.values(state.predicates.info),
    loadingContext: state.context.loading.agent,
  }
}

export default connect(mapStateToProps)(AgentContext)
