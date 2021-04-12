import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import SectionSelect from '../../Shared/SectionSelect'
import SectionInput from '../../Shared/SectionInput'
import getCompBonusTypes from '../../../actions/Compensation/Bonuses/getCompBonusTypes'
import { getCompRunSchedules } from '../../../actions/Compensation/getCompRunSchedules'

// Allowed props:
// compRunScheduleBonusRule
// readOnly (true/false)
// onUpdateField (method takes value, field name, valid=true)
class CompBonusDetailsForm extends Component {
  componentDidMount() {
    this.props.getCompBonusTypes()
    this.props.getCompRunSchedules()
  }

  bonusType() {
    return this.props.bonusTypes.find(bonusType => bonusType.bonus_type_code === this.props.compRunScheduleBonusRule.bonus_type_code)
  }

  renderDynamicFields() {
    const bonusType = this.bonusType()
    if (!get(bonusType, 'required_fields')) {
      return null
    }

    return bonusType.required_fields.map(field => {
      if (field.options) {
        return (<SectionSelect
          key={field.name}
          label={startCase(field.name)}
          options={field.options}
          readonly={this.props.readOnly}
          value={get(this.props.compRunScheduleBonusRule, `bonus_rules.params.${[field.name]}`)}
          onChange={(event) => this.props.onUpdateField(event.target.value, `bonus_rules.params.${field.name}`) }
        />)
      } else {
        return (<SectionInput
          key={field.name}
          label={startCase(field.name)}
          readonly={this.props.readOnly}
          type={field.type}
          value={get(this.props.compRunScheduleBonusRule, `bonus_rules.params.${[field.name]}`)}
          onChange={(event) => this.props.onUpdateField(event.target.value, `bonus_rules.params.${field.name}`) }
        />)
      }
    })
  }

  renderRescissionContent() {
    const bonus = this.props.compRunScheduleBonusRule
    let rescissionContent = null
    const active = <h5 className={'text-info'} style={{ padding: '10px' }}>This bonus is active</h5>
    const activeWithRescission = <h5 className={'text-warning'} style={{ padding: '10px' }}>We will continue to look for sales for this bonus through {moment(bonus.rescission_end_dt).format('L')}</h5>
    const inactive = <h5 className={'text-danger'} style={{ padding: '10px' }}>This bonus has ended</h5>
    const activeInFuture = <h5 className={'text-info'} style={{ padding: '10px' }}>This bonus has not started yet</h5>

    if (this.props.readOnly) {
      if (bonus.is_active) {
        if (bonus.rescission_end_dt) {
          rescissionContent = activeWithRescission
        } else {
          rescissionContent = active
        }
      } else if (bonus.is_active_in_future) {
        // Inactive bonus - in future
        rescissionContent = activeInFuture
      } else {
        // Inactive bonus - not in future
        if (bonus.rescission_end_dt) {
          rescissionContent = inactive
        } else {
          rescissionContent = inactive
        }
      }
    }

    return rescissionContent
  }

  render() {
    const endDate = this.props.compRunScheduleBonusRule.bonus_rule_end_dt || !this.props.readOnly ? <SectionInput label="End Date" readonly={this.props.readOnly} type="date" value={this.props.compRunScheduleBonusRule.bonus_rule_end_dt} onChange={(value) => this.props.onUpdateField(value, 'bonus_rule_end_dt') } /> : null
    const deactivatedDate = this.props.compRunScheduleBonusRule.deactivated_dt ? <SectionInput label="Deactivated Date" readonly={true} type="date" value={this.props.compRunScheduleBonusRule.deactivated_dt} /> : null

    return (
      <div>
        <SectionSelect
          label="Comp Run Schedule Code"
          labelKey="comp_run_schedule_name"
          options={this.props.schedules}
          readonly={this.props.readOnly}
          value={this.props.compRunScheduleBonusRule.comp_run_schedule_code}
          valueKey="comp_run_schedule_code"
          onChange={(event) => this.props.onUpdateField(event.target.value, 'comp_run_schedule_code') }
        />
        <SectionSelect
          label="Bonus Type Code"
          labelKey="bonus_type_name"
          options={this.props.bonusTypes}
          readonly={this.props.readOnly}
          value={this.props.compRunScheduleBonusRule.bonus_type_code}
          valueKey="bonus_type_code"
          onChange={(event) => this.props.onUpdateField(event.target.value, 'bonus_type_code') }
        />
        <SectionInput label="Description" readonly={this.props.readOnly} type="textarea" value={this.props.compRunScheduleBonusRule.bonus_rule_desc || ''} onChange={(event) => this.props.onUpdateField(event.target.value, 'bonus_rule_desc') } />
        <SectionInput label="Start Date" readonly={this.props.readOnly} type="date" value={this.props.compRunScheduleBonusRule.bonus_rule_start_dt} onChange={(value) => this.props.onUpdateField(value, 'bonus_rule_start_dt') } />
        {this.renderDynamicFields()}
        {endDate}
        {deactivatedDate}
        {this.renderRescissionContent()}
      </div>
    )
  }
}

function mapStateToProps({ compRunScheduleBonusRules, compRunSchedules }) {
  return {
    loading: compRunScheduleBonusRules.loading,
    bonusTypes: compRunScheduleBonusRules.bonusTypes,
    schedules: compRunSchedules.compRunSchedules,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompBonusTypes, getCompRunSchedules }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompBonusDetailsForm)
