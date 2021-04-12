import React from 'react'

export default ({ rule, onChange }) => {
  const ruleType = rule.rule_type || 'greater'
  const ruleValue = rule.object ? rule.object : [0]

  const options = [
    { value: 'greater', label: 'Greater than' },
    { value: 'less', label: 'Less than' },
  ]

  const onChangeRuleType = (e) => {
    onChangeRule(e.target.value, null)
  }

  const onChangeRuleValue = (e) => {
    onChangeRule(null, e.target.value)
  }

  const onChangeRule = (newRuleType, newRuleValue) => {
    onChange({
      ...rule,
      rule_type: newRuleType || ruleType,
      object: newRuleValue ? [newRuleValue] : ruleValue,
      subject: 'prospect_guid',
      predicate: rule.predicate,
    })
  }

  return (
    <div>
      <select
        className="mx-3"
        options={options}
        placeholder=""
        value={ruleType}
        onChange={onChangeRuleType}
      >
        {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
      </select>
      <input
        type="number"
        value={rule.object ? rule.object[0] : ruleValue[0]}
        onChange={onChangeRuleValue}
      />
    </div>
  )
}
