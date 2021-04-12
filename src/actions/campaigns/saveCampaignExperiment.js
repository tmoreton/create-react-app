import axios from 'axios'

export default function saveCampaignExperiment(experiment, campaign) {
  return function(dispatch) {

    if (experiment.experiment_type === 'PLAN_TEST') {
      const variations = experiment.variations.map(variation => {
        const plans = variation.campaign_experiment_variation_plans.map((plan, i) => {
          return { ...plan, campaign_id: campaign.campaign_id, display_sequence: i + 1 }
        })
        variation.campaign_experiment_variation_plans = plans
        return variation
      })
      experiment.variations = variations
    }

    dispatch({ type: 'SAVING_CAMPAIGN', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/experiments/${experiment.experiment_id}`, experiment)
      .then((response) => {
        dispatch({ type: 'SAVE_CAMPAIGN_EXPERIMENT', payload: response.data })
        dispatch({ type: 'SAVING_CAMPAIGN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'SAVING_CAMPAIGN', payload: false })
        throw error
      })
  }
}
