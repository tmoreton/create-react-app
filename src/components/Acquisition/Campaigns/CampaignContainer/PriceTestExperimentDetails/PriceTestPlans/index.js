import React from 'react'
import ExperimentVariationPlans from './ExperimentVariationPlans'

const PriceTestPlans = ({ campaign, experiment, campaignExperiments, campaignPlans, writeAccess, plans, planTestExperiments, replaceCampaignPlans, updateCampaignExperiment }) => {

  const buildExperimentVariationPlans = () => {
    const experiments = {}
    planTestExperiments.forEach(planTestExperiment => {
      const campaignExperiment = campaignExperiments[planTestExperiment.experiment_id]
      if (!campaignExperiment) return

      experiments[planTestExperiment.experiment_id] = { experiment: planTestExperiment, variations: {} }
      experiments[planTestExperiment.experiment_id].variations[campaignExperiment.control.experiment_variation_id] = {}
      experiments[planTestExperiment.experiment_id].variations[campaignExperiment.control.experiment_variation_id].variation = campaignExperiment.control
      experiments[planTestExperiment.experiment_id].variations[campaignExperiment.control.experiment_variation_id].plans = []

      campaignExperiment.control.campaign_experiment_variation_plans.forEach(plan => {
        experiments[planTestExperiment.experiment_id].variations[campaignExperiment.control.experiment_variation_id].plans.push({ ...plan, experiment_id: planTestExperiment.experiment_id })
      })
      campaignExperiment.variations.forEach(variation => {
        experiments[planTestExperiment.experiment_id].variations[variation.experiment_variation_id] = {}
        experiments[planTestExperiment.experiment_id].variations[variation.experiment_variation_id].variation = variation
        experiments[planTestExperiment.experiment_id].variations[variation.experiment_variation_id].plans = []
        variation.campaign_experiment_variation_plans.forEach(plan => {
          experiments[planTestExperiment.experiment_id].variations[variation.experiment_variation_id].plans.push({ ...plan, experiment_id: planTestExperiment.experiment_id })
        })
      })
    })
    return experiments
  }

  const campaignPlansOnIncludeInPriceTest = (checked, plan) => {
    const updatedCampaignPlans = campaign.campaign_plans_attributes.map(campaignPlan => {
      if (campaignPlan.campaign_plan_id === plan.campaign_plan_id) {
        let price_experiment_ids
        if (checked) {
          campaignPlan.price_experiment_ids.push(experiment.experiment_id)
          price_experiment_ids = campaignPlan.price_experiment_ids
        } else {
          price_experiment_ids = campaignPlan.price_experiment_ids.filter(id => id !== experiment.experiment_id)
        }
        campaignPlan.price_experiment_ids = price_experiment_ids
      }
      return campaignPlan
    })
    replaceCampaignPlans(updatedCampaignPlans)
  }

  const planTestPlansOnIncludeInPriceTest = (checked, plan) => {
    const planTestExperiment = campaignExperiments[plan.experiment_id]

    const control = planTestExperiment.control
    const controlPlans = control.campaign_experiment_variation_plans.map(variationPlan => {
      if (variationPlan.campaign_experiment_variation_plan_id === plan.campaign_experiment_variation_plan_id) {
        let price_experiment_ids
        if (checked) {
          variationPlan.price_experiment_ids.push(experiment.experiment_id)
          price_experiment_ids = variationPlan.price_experiment_ids
        } else {
          price_experiment_ids = variationPlan.price_experiment_ids.filter(id => id !== experiment.experiment_id)
        }
        variationPlan.price_experiment_ids = price_experiment_ids
      }
      return variationPlan
    })
    control.campaign_experiment_variation_plans = controlPlans

    const variations = planTestExperiment.variations.map(variation => {
      if (variation.experiment_variation_id !== plan.experiment_variation_id) return variation

      variation.campaign_experiment_variation_plans.map(variationPlan => {
        if (variationPlan.campaign_experiment_variation_plan_id === plan.campaign_experiment_variation_plan_id) {
          let price_experiment_ids
          if (checked) {
            variationPlan.price_experiment_ids.push(experiment.experiment_id)
            price_experiment_ids = variationPlan.price_experiment_ids
          } else {
            price_experiment_ids = variationPlan.price_experiment_ids.filter(id => id !== experiment.experiment_id)
          }
          variationPlan.price_experiment_ids = price_experiment_ids
        }
        return variationPlan
      })
      return variation
    })
    updateCampaignExperiment({ ...planTestExperiment, control, variations })
  }

  const experiments = buildExperimentVariationPlans()
  const experimentVariationPlans = Object.values(experiments)

  return (
    <div>
      <div className="mb-3">
        <h4>
          <strong>Campaign Plans</strong>
        </h4>
        {campaignPlans.map((plan, i) => (
          <div key={`campaign-plan-${plan.plan_code}-${i}`} className="form-check">
            <input
              checked={plan.price_experiment_ids.some(experiment_id => experiment_id === experiment.experiment_id)}
              className="form-check-input mr-3"
              disabled={!writeAccess}
              type="checkbox"
              onChange={(event) => campaignPlansOnIncludeInPriceTest(event.target.checked, plan)}
            />
            <span>{plans.find(p => p.plan_code === plan.plan_code).plan_name} ({plan.plan_code})</span>
          </div>
        ))}
      </div>
      <h4>
        <strong>Plan Test Plans</strong>
      </h4>
      {experimentVariationPlans.length > 0 ? (
        experimentVariationPlans.map(experimentVariationPlan => (
          <div key={`experimentVariationPlan-${experimentVariationPlan.experiment.experiment_id}`}>
            <h5>{experimentVariationPlan.experiment.experiment_name}</h5>
            {Object.values(experimentVariationPlan.variations).map(experimentVariation => (
              <div key={`experimentVariation-${experimentVariation.variation.experiment_variation_id}`} className="mb-3">
                <h6>
                  {experimentVariation.variation.variation_name}
                </h6>
                <ExperimentVariationPlans
                  experiment={experiment}
                  experimentVariation={experimentVariation}
                  planTestPlansOnIncludeInPriceTest={planTestPlansOnIncludeInPriceTest}
                  plans={plans}
                  writeAccess={writeAccess}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>N/A</p>
      )}
    </div>
  )
}


export default PriceTestPlans
