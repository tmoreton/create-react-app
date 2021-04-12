import React, { Component } from 'react'
import startCase from 'lodash/startCase'
import camelCase from 'lodash/camelCase'

export default class CompRunScheduleFormSchedule extends Component {

  constructor(props) {
    super(props)
    this.state = {
      targetEntity: 'source',
    }
  }

  handleChange = (key, event) => {
    const newState = { [key]: event.target.value }
    if ((key === 'sourceCode') || (key === 'channelPartnerCode')) {
      newState.compRunScheduleCode = event.target.value
      newState.compRunScheduleName = startCase(camelCase(event.target.value))
      newState.compRunScheduleDesc = newState.compRunScheduleName
    }
    this.props.updateCompRunSchedule(newState)
  }

  handlePayPeriodEndTypeChange = (event) => {
    this.handleChange('payPeriodEndType', event)
  }

  scheduleName = () => {
    return this.state.compRunSchedule.sourceCode || this.state.compRunSchedule.channelPartnerCode || ''
  }

  setTargetSource = () => {
    this.setState({
      targetEntity: 'source',
    })
    this.handleChange('channelPartnerCode', { target: { value: undefined } })
  }

  setTargetChannelPartner = () => {
    this.setState({
      targetEntity: 'channelPartner',
    })
    this.handleChange('sourceCode', { target: { value: undefined } })
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header mb-2">
          <h4 className="mb-0">Schedule Config</h4>
        </div>
        <div className="ml-2">
          <div className="row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">TARGET:</div>
            <div className="btn-group col-auto mb-2 pl-2" role="group">
              <button className={`btn btn-secondary ${this.state.targetEntity === 'source' ? 'active': ''}`} type="button" onClick={this.setTargetSource}>Source</button>
              <button className={`btn btn-secondary ${this.state.targetEntity === 'channelPartner' ? 'active': ''}`} type="button" onClick={this.setTargetChannelPartner}>Channel Partner</button>
            </div>
          </div>

          <div className={`mb-2 row form-group ${this.state.targetEntity !== 'source' ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">SOURCE:</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-4" disabled={this.state.targetEntity !== 'source'} value={this.props.compRunSchedule.sourceCode || ''} onChange={(e) => this.handleChange('sourceCode', e)}>
                <option value="" />
                {Object.keys(this.props.sources).map((sourceCode, idx) =>
                  <option key={idx}>{sourceCode}</option>
                )}
              </select>
            </div>
          </div>

          <div className={`mb-2 row form-group ${this.state.targetEntity !== 'channelPartner' ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">CHANNEL PARTNER:</div>
            <div className="col pl-0">  
              <select className="ml-2 form-control col-sm-4" disabled={this.state.targetEntity !== 'channelPartner'} value={this.props.compRunSchedule.channelPartnerCode || ''} onChange={(e) => this.handleChange('channelPartnerCode', e)}>
                <option value="" />
                {this.props.channelPartners.map((channelPartner, idx) =>
                  <option key={idx}>{channelPartner.channelPartnerCode}</option>
                )}
              </select>
            </div>
          </div>

          <div className={`mb-2 row form-group d-none ${this.props.compRunSchedule.compRunScheduleName ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">COMP RUN SCHEDULE NAME:</div>
            <div className="col pl-0">
              <div className="ml-2">{this.props.compRunSchedule.compRunScheduleName}</div>
            </div>
          </div>

          <div className="mb-2 row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">PAY PERIOD:</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.payPeriodEndType} onChange={(e) => this.handlePayPeriodEndTypeChange(e)}>
                <option value="" />
                <option value="WEEKLY">Weekly</option>
                <option value="BIWEEKLY">Biweekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
          </div>

          <div className={`mb-2 row form-group ${this.props.compRunSchedule.payPeriodEndType !== 'WEEKLY' ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">DAY OF WEEK:</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.dayOfWeek || ''} onChange={(e) => this.handleChange('dayOfWeek', e)}>
                <option value="" />
                {this.props.dayOfWeeks.map((dayOfWeek, idx) =>
                  <option key={`dayOfWeek-${idx}`} value={dayOfWeek}>{startCase(dayOfWeek)}</option>
                )}
              </select>
            </div>
          </div>

          <div className={`mb-2 row form-group ${this.props.compRunSchedule.payPeriodEndType !== 'MONTHLY' ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">DAY OF MONTH:</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.dayOfMonth || ''} onChange={(e) => this.handleChange('dayOfMonth', e)}>
                <option value="" />
                {this.props.dayOfMonths.map((_e, i) =>
                  <option key={i} value={i + 1}>{i + 1}</option>
                )}
              </select>
            </div>
          </div>

          <div className={`mb-2 row form-group ${this.props.compRunSchedule.payPeriodEndType !== 'BIWEEKLY' ? 'd-none' : ''}`}>
            <div className="text-right mb-2 col-2 align-self-center pr-0">DAYS OF MONTH:</div>
            <div className="col pl-0">
              <div className="ml-2">The 6th and 21st</div>
            </div>
          </div>

          <div className="mb-2 row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">RESCISSION PERIOD (DAYS):</div>
            <div className="col pl-0">
              <input className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.daysToRescind || ''} onChange={(e) => this.handleChange('daysToRescind', e)} />
            </div>
          </div>

          <div className="mb-2 row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">CLAWBACK PERIOD (DAYS):</div>
            <div className="col pl-0">
              <input className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.daysToClawback || ''} onChange={(e) => this.handleChange('daysToClawback', e)} />
            </div>
          </div>

          <div className="mb-2 row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">CLAWBACK {this.props.compRunSchedule.daysToClawback || 0} DAYS FROM:</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.clawbackFromDtField || ''} onChange={(e) => this.handleChange('clawbackFromDtField', e)}>
                <option value="" />
                {this.props.clawbackFromDtFields.map((clawbackFromDtField, idx) =>
                  <option key={idx} value={clawbackFromDtField.value}>{clawbackFromDtField.description}</option>
                )}
              </select>
            </div>
          </div>

          <div className="mb-2 row form-group">
            <div className="text-right mb-2 col-2 align-self-center pr-0">ACTIVE?</div>
            <div className="col pl-0">
              <select className="ml-2 form-control col-sm-2" value={this.props.compRunSchedule.isActive} onChange={(e) => this.handleChange('isActive', e)}>
                <option key="true" value="true">True</option>
                <option key="false" value="false">False</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CompRunScheduleFormSchedule.defaultProps = {
  channelPartnerCodes: ['GIANT_EAGLE', 'REDNERS', 'BRAND'],
  clawbackFromDtFields: [{ value: 'confirmed_start_dt', description: 'Confirmed Start Date' }, { value: 'sale_dt', description: 'Sale Date' }],
  dayOfWeeks: ['monday', 'tuesday'],
  dayOfMonths: [...Array(28)],
}
