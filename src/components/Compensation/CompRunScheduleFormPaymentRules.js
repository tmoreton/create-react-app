// Add compStatusCode to each rule
// Add include_default_rules t

import React, { Component } from 'react'
import { connect } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getCompAttributeValues from '../../actions/Compensation/getCompAttributeValues'

class CompRunScheduleFormPaymentRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentRuleId: [],
      compRuleId: [],
    }
  }

  componentDidMount() {
    this.props.getCompAttributeValues()
  }

  addPaymentRule = () => {
    const newPaymentRule =
      {
        compTypeCode: 'ORDER',
        compRules: [],
      }
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules.push(newPaymentRule)
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  addCompRule = (paymentRuleId) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    const newCompRule = {
      compCurrency: 'dollars',
      compStatusCode: 'PAYABLE',
      compStatusReason: '',
      rules: [],
    }
    if (paymentRules[paymentRuleId].compTypeCode === 'RESIDUAL') {
      newCompRule.compCoefficient = 0.0
      newCompRule.compVariable = 'usage_total_num'
    }
    paymentRules[paymentRuleId].compRules.push(newCompRule)

    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  addDefaultPaymentRules = (paymentRuleId, compTypeCode) => {
    const defaultPaymentRules = cloneDeep(this.props.defaultPaymentRules)
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules[paymentRuleId].compRules = defaultPaymentRules[lowerCase(compTypeCode)] || []

    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  duplicateCompRule = (paymentRuleId, compRuleId) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    const oldCompRule = cloneDeep(paymentRules[paymentRuleId].compRules[compRuleId])
    paymentRules[paymentRuleId].compRules.splice(compRuleId, 0, oldCompRule)

    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  addCondition = (paymentRuleId, compRuleId) => {
    const newCondition = {
      subject: '',
      object: '',
      predicate: '',
    }
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules[paymentRuleId].compRules[compRuleId].rules.push(newCondition)

    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  isInt = (value) => {
    if (isNaN(value)) {
      return false
    }
    var x = parseFloat(value)
    return (x | 0) === x
  }

  updatePaymentRule = (paymentRuleId, key, event) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules[paymentRuleId][key] = event.target.value
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  updateCompRule = (paymentRuleId, compRuleId, key, event) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    let value = event.target.value
    if (key === 'compAmount' && value) { value = parseFloat(value || '0') }
    if (key === 'compCoefficient' && value && parseFloat(value) !== 0) { value = parseFloat(value || '0.0') }

    paymentRules[paymentRuleId].compRules[compRuleId][key] = value
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  updateRule = (paymentRuleId, compRuleId, ruleId, key, event) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    let value = event.target.value
    if (value === 'true' || value === 'false') {
      value = value === 'true' ? true : false
    } else {
      value = this.isInt(value) ? parseInt(value, 10) : value
    }
    paymentRules[paymentRuleId].compRules[compRuleId].rules[ruleId][key] = value
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  deletePaymentRule = (paymentRuleId) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules.splice(paymentRuleId, 1)
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  deleteCompRule = (paymentRuleId, compRuleId) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules[paymentRuleId].compRules.splice(compRuleId, 1)
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  deleteRule = (paymentRuleId, compRuleId, ruleId) => {
    const paymentRules = cloneDeep(this.props.paymentRules)
    paymentRules[paymentRuleId].compRules[compRuleId].rules.splice(ruleId, 1)
    this.props.updateCompRunSchedulePaymentRules(paymentRules)
  }

  showTab = (id, key) => {
    const arr = this.state[key]
    if (!arr.includes(id)){
      arr.push(id)
    } else {
      const index = this.state.paymentRuleId.indexOf(id)
      arr.splice(index, 1)
    }
    this.setState({ [key]: arr })
  }

  showDropwdown = (rule, paymentRuleId, compRuleId, ruleId) => {
    const attr = this.props.compAttributeValues
    const type = rule.subject && attr[rule.subject] && attr[rule.subject].type
    if (type === 'date'){
      return <input className="custom-select w-100" placeholder="Date" type="date" value={rule.object} onChange={(e) => this.updateRule(paymentRuleId, compRuleId, ruleId, 'object', e)} />
    } else if (type === 'bool' || type === 'string'){
      return (
        <select className="form-control"  value={rule.object} onChange={(e) => this.updateRule(paymentRuleId, compRuleId, ruleId, 'object', e)}>
          <option value="" />
          {attr[rule.subject].values.map((val, id) => {
            return <option key={id} value={val}>{val}</option>
          })}
        </select>
      )
    } else {
      return <input className="form-control" value={rule.object || ''} onChange={(e) => this.updateRule(paymentRuleId, compRuleId, ruleId, 'object', e)} />
    }
  }

  render() {
    return (
      <div>
        <div className="mb-2 card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Rulesets</h4>
            <button className="btn btn-dark" onClick={this.addPaymentRule}>+ Add Ruleset</button>
          </div>
          {this.props.paymentRules.map((paymentRule, paymentRuleId) =>
            (<div key={paymentRuleId} className="border-bottom">
              <button className="bg-light border-0 w-100 d-flex justify-content-between align-items-center" onClick={() => this.showTab(paymentRuleId, 'paymentRuleId')}>
                <h5 className="text-left p-3 m-0">{paymentRule.ruleDesc}</h5>
                { this.state.paymentRuleId.includes(paymentRuleId) ? <i className="fa fa-chevron-up pr-3" /> : <i className="fa fa-chevron-down pr-3" /> }
              </button>
              <div className={!this.state.paymentRuleId.includes(paymentRuleId) && 'collapse'} id={`${paymentRuleId}`}>
                <div className="m-2">
                  <div className="row form-group">
                    <div className="col-2 text-right align-self-center pr-0">Comp Type:</div>
                    <div className="col pl-0">
                      <select className="ml-2 form-control col-sm-2" disabled={paymentRule.compRules && paymentRule.compRules.length > 0} value={paymentRule.compTypeCode} onChange={(e) => this.updatePaymentRule(paymentRuleId, 'compTypeCode', e)}>
                        {this.props.compTypes.map((compType, idx) =>
                          <option key={`compTypes-${idx}`} value={compType}>{startCase(lowerCase(compType))}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                {paymentRule.compRules.map((compRule, compRuleId) =>
                  (<div key={compRuleId} className="border m-2">
                    <button className="bg-light border-0 w-100 d-flex justify-content-between align-items-center p-3" onClick={() => this.showTab(`${paymentRuleId}-${compRuleId}`, 'compRuleId')}>
                      <div>
                        <p className="text-left m-0"><b>Rule {compRuleId+1}: {compRule.compStatusReason}</b></p>
                        <p className="text-left m-0">Comp Amount: ${compRule.compAmount}; Comp Status: {compRule.compStatusCode}</p>
                      </div>
                      { this.state.compRuleId.includes(`${paymentRuleId}-${compRuleId}`) ? <i className="fa fa-chevron-up pr-3" /> : <i className="fa fa-chevron-down pr-3" /> }
                    </button>
                    <div className={!this.state.compRuleId.includes(`${paymentRuleId}-${compRuleId}`) && 'collapse'} id={`${paymentRuleId}-${compRuleId}`}>
                      <div className="p-3">
                        <div className="row form-group">
                          <div className="col-2 text-right align-self-center pr-0">Comp Amount: $</div>
                          <div className="col pl-0">
                            <input className="ml-2 form-control col-sm-2" type="text" value={compRule.compAmount} onChange={(e) => this.updateCompRule(paymentRuleId, compRuleId, 'compAmount', e)} />
                          </div>
                        </div>
                        { paymentRule.compTypeCode === 'RESIDUAL' &&
                          <div className="row form-group">
                            <div className="col-2 text-right align-self-center pr-0">Comp Coefficient: </div>
                            <div className="col pl-0">
                              <input className="ml-2 form-control col-sm-2" type="text" value={compRule.compCoefficient} onChange={(e) => this.updateCompRule(paymentRuleId, compRuleId, 'compCoefficient', e)} />
                            </div>
                          </div>
                        }
                        { paymentRule.compTypeCode === 'RESIDUAL' &&
                          <div className="row form-group">
                            <div className="col-2 text-right align-self-center pr-0">Coefficient Multiplier Field: </div>
                            <div className="col pl-0">
                              <input className="ml-2 form-control col-sm-2" disabled={true} type="text" value={compRule.compVariable} />
                            </div>
                          </div>
                        }
                        <div className="row form-group">
                          <div className="col-2 text-right align-self-center pr-0">Comp Status:</div>
                          <div className="col pl-0">
                            <select className="ml-2 form-control col-sm-2" value={compRule.compStatusCode} onChange={(e) => this.updateCompRule(paymentRuleId, compRuleId, 'compStatusCode', e)}>
                              <option key="PAYABLE" value="PAYABLE">Payable</option>
                              <option key="NOT_PAYABLE" value="NOT_PAYABLE">Not Payable</option>
                            </select>
                          </div>
                        </div>
                        <div className="row form-group">
                          <div className="col-2 text-right align-self-center pr-0">Comp Status Description:</div>
                          <div className="col pl-0">
                            <input className="ml-2 form-control col-sm-2" type="text" value={compRule.compStatusReason} onChange={(e) => this.updateCompRule(paymentRuleId, compRuleId, 'compStatusReason', e)} />
                          </div>
                        </div>
                        <div>Conditions:</div>
                        {compRule.rules.map((rule, ruleId) => {
                          return (
                            <div key={`paymentRule-${compRuleId}-compRule-${ruleId}`}>
                              <div className="mb-2 d-flex">
                                <div title="Subject">
                                  <select className="form-control" value={rule.subject || ''} onChange={(e) => this.updateRule(paymentRuleId, compRuleId, ruleId, 'subject', e)}>
                                    <option />
                                    {Object.entries(this.props.compAttributeValues).map((subject, idx) => 
                                      <option key={`paymentRule-${compRuleId}-compRule-${ruleId}-subject-${idx}`} value={subject.value}>{subject[0] == null ? 'null' : subject[0]}</option>                                        
                                    )}
                                  </select>
                                </div>
                                <div className="ml-4" title="Verb">
                                  <select className="form-control" value={rule.predicate || ''} onChange={(e) => this.updateRule(paymentRuleId, compRuleId, ruleId, 'predicate', e)}>
                                    <option />
                                    {this.props.predicates.map((predicate, idx) =>
                                      <option key={`paymentRule-${compRuleId}-compRule-${ruleId}-predicate-${idx}`} value={predicate.value}>{predicate.description}</option>
                                    )}
                                  </select>
                                </div>
                                <div className="ml-4" title="Object">
                                  { this.showDropwdown(rule, paymentRuleId, compRuleId, ruleId)}
                                </div>
                                <button className="btn btn-danger ml-2 mt-1 mb-1 pt-0 pb-0" onClick={() => this.deleteRule(paymentRuleId, compRuleId, ruleId)}><FontAwesomeIcon className="feather" icon="trash" size="2x" /></button>
                              </div>
                              <div className="d-block mt-2">{(compRule.rules.length > 0) && (ruleId < compRule.rules.length - 1) ? 'AND' : null}</div>
                            </div>
                          )
                        })}
                        <button className="btn btn-dark ml-2 mt-4 pt-0 pb-0" onClick={() => this.addCondition(paymentRuleId, compRuleId)}>+ Add Condition</button>
                        <button className="btn btn-dark ml-2 mt-4 pt-0 pb-0" onClick={() => this.duplicateCompRule(paymentRuleId, compRuleId)}>+ Duplicate Rule</button>
                        <button className="btn btn-danger mt-4 ml-1 pt-0 pb-0" onClick={() => this.deleteCompRule(paymentRuleId, compRuleId)}><FontAwesomeIcon className="feather" icon="trash" size="2x" /> Rule</button>
                      </div>
                    </div>
                  </div>)
                )}
                <div className="bg-light p-3 d-flex justify-content-end">
                  <button className="btn btn-dark mr-3" onClick={() => this.addCompRule(paymentRuleId)}>+ Add Rule</button>
                  {paymentRule.compRules.length === 0 && (<button className="btn btn-dark mr-3" onClick={() => this.addDefaultPaymentRules(paymentRuleId, paymentRule.compTypeCode)}>+ Add Default Rules for {startCase(lowerCase(paymentRule.compTypeCode))}</button>)}
                  <button className="btn btn-danger" onClick={() => this.deletePaymentRule(paymentRuleId)}>- Delete {startCase(lowerCase(paymentRule.compTypeCode))} Ruleset</button>
                </div>
              </div>
            </div>)
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compAttributeValues: state.compRunSchedules.compAttributeValues,
  }
}

const mapDispatchToProps = {
  getCompAttributeValues,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompRunScheduleFormPaymentRules)

CompRunScheduleFormPaymentRules.defaultProps = {
  compTypes: ['ORDER', 'RESIDUAL', 'ORDER_RESIDUAL', 'INSTALLATION', 'BONUS'],
  predicates: [
    { value: 'has', description: 'has' },
    { value: 'eq', description: '=' },
    { value: 'less', description: '<' },
    { value: 'greater', description: '>' },
  ],
}
