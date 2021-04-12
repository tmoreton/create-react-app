import React from 'react'

const COMP = ({ experiment, experimentVariation, writeAccess, plans, planTestPlansOnIncludeInPriceTest }) => {
  return (
    <div>
      {experimentVariation.plans.map(plan => (
        <div key={`campaign_experiment_variation_plan_id-${plan.campaign_experiment_variation_plan_id}`}>
          <input
            checked={plan.price_experiment_ids.some(experiment_id => experiment_id === experiment.experiment_id)}
            className="mr-3"
            disabled={!writeAccess}
            type="checkbox"
            onChange={(event) => planTestPlansOnIncludeInPriceTest(event.target.checked, plan)}
          />
          <span>{plans.find(p => p.plan_code === plan.plan_code).plan_name} ({plan.plan_code})</span>
        </div>
      ))}
    </div>
  )
}

export default COMP
