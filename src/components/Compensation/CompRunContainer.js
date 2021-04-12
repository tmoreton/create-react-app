import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCompRun } from '../../actions/Compensation/getCompRun'
import { getCompRunData } from '../../actions/Compensation/getCompRunData'
import 'react-table/react-table.css'

class CompRunContainer extends Component {
  constructor() {
    super()
    this.state = { selected: new Set([54431]) }
  }

  componentDidMount() {
    if (this.props.match.params.compRunId){
      this.props.getCompRun(this.props.match.params.compRunId)
      this.props.getCompRunData(this.props.match.params.compRunId)
    }
  }

  onDuplicateCheck = key => {
    return key
  }

  onRowClick = compRunCompId => {
    return compRunCompId
  }

  onCheckboxClick = compRunCompId => {
    const newState = Object.assign({}, this.state)
    if (newState.selected.has(compRunCompId)) {
      newState.selected.delete(compRunCompId)
    }
    else {
      newState.selected.add(compRunCompId)
    }
    this.setState(newState)
  }

  isRowSelected = rowID => {
    return this.state.selected.has(rowID)
  }


  compRunData() {
    const modified = this.props.compRunData.map(p => {
      if (p.comp_rule != null) {
        p.comp_rule_stringified = p.comp_rule.rules.map(r => r.subject + ' ' + r.predicate + ' ' + r.object + ',  \n')
      }
      else {
        p.comp_rule_stringified = ''
      }
      return p
    })
    return modified
  }

  payablePercentage() {
    return Math.round((this.props.compRun.total_payable_comps / this.props.compRun.total_comps) * 100)
  }

  compRunDataColumns() {
    return [
      {
        id: 'checkbox',
        accessor: '',
        Cell: ({ original }) => {
          return (
            <input
              alt={original.comp_run_comp_id}
              checked={this.state.selected.has(original.comp_run_comp_id)}
              className="checkbox"
              type="checkbox"
              onChange={() => this.onCheckboxClick(original.comp_run_comp_id)}
            />
          )
        },
        Header: () => {
          return (
            <input
              checked={this.state.selectAll === 1}
              className="checkbox"
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2
                }
              }}
              type="checkbox"
              onChange={() => this.onSelectAllClick()}
            />
          )
        },
        sortable: false,
        width: 45,
      },
      { Header: 'IE Account ID', accessor: 'account_id' },
      { Header: 'Confirmation Code', accessor: 'tpv_confirmation_code' },
      { Header: 'Payment Period End Date', accessor: 'comp_period_end_dt' },
      { Header: 'Comp Date', accessor: 'comp_trigger_dt' },
      { Header: 'Channel', accessor: 'channel_code' },
      { Header: 'Type', accessor: 'comp_type_code' },
      { Header: 'Sale Date', accessor: 'sale_dt' },
      { Header: 'Location', accessor: 'location_name' },
      { Header: 'Sales Rep ID', accessor: 'rep_id' },
      { Header: 'Sales Rep', accessor: 'rep_first_name' },
      { Header: 'Sales Rep Office', accessor: 'office_code' },
      { Header: 'Avg Annual Usage', accessor: 'acq_avg_annual_usage' },
      { Header: 'Amount', accessor: 'comp_amt' },
      // { Header: 'Usage', accessor: 'comp_rule' },
      { Header: 'Status', accessor: 'comp_status_code' },
      { Header: 'Reason', accessor: 'comp_status_reason' },
      { Header: 'Comp Status Reason', accessor: 'other_status_reason' },
      { Header: 'Account Offer Reason', accessor: 'account_offer_reason' },
      { Header: 'Account Status', accessor: 'status_group' },
      { Header: 'Status Details', accessor: 'account_status_message' },
      { Header: 'Account Status2', accessor: 'account_status' },
      { Header: 'Payable Reason', accessor: 'payable_reason' },
      { Header: 'Not Payable Reason', accessor: 'notpayable_reason' },
      { Header: 'Start Date', accessor: 'confirmed_start_dt' },
      { Header: 'End Date', accessor: 'confirmed_drop_dt' },
      { Header: 'Drop Request Date', accessor: 'comp_clawback_dt' },
      { Header: 'First Name', accessor: 'first_name' },
      { Header: 'Last Name', accessor: 'last_name' },
      { Header: 'Business Name', accessor: 'business_name' },
      // { Header: 'Valid Email', accessor: '' },
      { Header: 'Primary Phone', accessor: 'primary_phone' },
      { Header: 'State', accessor: 'service_state' },
      { Header: 'Market', accessor: 'market_code' },
      { Header: 'Rate Class', accessor: 'revenue_class_code' },
      { Header: 'Rate Sub Class', accessor: 'rate_class' },
      { Header: 'External ID', accessor: 'xref_id' },
      { Header: 'Plan Name', accessor: 'plan_name' },
      { Header: 'Plan Description', accessor: 'plan_description' },
      { Header: 'Contract Type', accessor: 'contract_type_code' },
      { Header: 'Internal Comp Run Comp ID', accessor: 'comp_run_comp_id }' },
    ]
  }

  render() {
    return (
      <div>
        <h2>Compensation Run {this.props.match.params.compRunId}</h2>
        <h3>Inspire Energy Holdings, LLC</h3>
        <p>Sales Compensation Report</p>
        <div className="font-weight-bold">Channel Partner: {this.props.compRun.comp_run_schedule_name}</div>
        <div className="font-weight-bold">Comp Type: </div>

        <div>Status: {this.props.compRun.comp_run_status_code}</div>
        <div>Total Comps in Run: {this.props.compRun.total_comps}</div>
        <div>Payable Comps: {this.props.compRun.total_payable_comps}</div>
        <div>Pay %: {this.props.compRun.payable_percentage}</div>

        <div>Average Annual Usage: {this.props.compRun.avg_annual_usage}</div>

        <div>Total Comp Amount: ${this.props.compRun.total_comp_amt}</div>

        <div className="mt-2 font-weight-bold">Payment Terms</div>
        <table>
          <thead>Quantity</thead>
          <thead>Description</thead>
          <thead>Per Unit</thead>
          <thead>Total</thead>
          <tr><td /></tr>
        </table>

        <div className="mt-2 font-weight-bold">Additional Compensation</div>
        <table>
          <thead>Quantity</thead>
          <thead>Description</thead>
          <thead>Per Unit</thead>
          <thead>Total</thead>
          <tr><td /></tr>
        </table>

        <div className="mt-2 font-weight-bold">Lost/Replacement Equipment</div>
        <table>
          <thead>Quantity</thead>
          <thead>Description</thead>
          <thead>Per Unit</thead>
          <thead>Total</thead>
          <tr><td /></tr>
        </table>

        <div>DEV Selected: {Array.from(this.state.selected).join(', ')}</div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compRun: state.compRun,
    compRunData: state.compRunData,
  }
}

const mapDispatchToProps = {
  getCompRun,
  getCompRunData,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompRunContainer)
