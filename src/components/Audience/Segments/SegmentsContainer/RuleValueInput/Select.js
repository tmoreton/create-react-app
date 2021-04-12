import React from 'react'
import Select from 'react-select'

export default ({ rule, onChange, predicate }) => {
  const valuesToRule = (values) => ({
    ...rule,
    rule_type: 'has',
    object: values.map((value) => value.value),
    subject: 'prospect_guid',
    predicate: rule.predicate,
  })

  const options = predicate
    ? predicate.options.map(option => ({ label: `${option.label_column} (${option.value_column})`, value: option.value_column }))
    : []

  return (
    <Select
      multi
      options={options}
      placeholder=""
      value={rule.object}
      onChange={(value) => onChange(valuesToRule(value))}
    />
  )
}
