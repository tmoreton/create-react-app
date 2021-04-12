import React from 'react'

export default function CompRule({ compRule }) {

  function predicate(old) {
    switch (old) {
    case 'has':
      return 'is'
    case 'greater':
      return 'is greater than'
    case 'less':
      return 'is less than'
    default:
      return old
    }
  }

  return (
    <div>
      <div><h4>{compRule.comp_type_code} - {compRule.rule_desc}</h4></div>

      {(compRule.comp_rules).map((comp_rule) => (
        <div key={compRule.comp_rule_id} className="mb-4">
          <b>
            {(comp_rule.comp_currency === 'dollars') && (comp_rule.comp_coefficient == null) ? '$' : null}
            {comp_rule.comp_coefficient == null ? comp_rule.comp_amount : comp_rule.comp_coefficient }
            {comp_rule.comp_currency !== 'dollars' ? comp_rule.comp_currency : null}
          </b>
          <b> if {comp_rule.comp_status_reason}</b>

          {comp_rule.rules.map((rule, index) => (
            <span key={index}>
              <div>{index !== 0 ? 'AND' : null}</div>
              <div>
                {rule.subject} {predicate(rule.predicate)} {JSON.stringify(rule.object)}
              </div>
            </span>

          ))}
        </div>
      ))}
    </div>
  )
}
