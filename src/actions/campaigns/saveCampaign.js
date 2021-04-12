import axios from 'axios'
import formatCampaign from '../../utils/formatCampaign'

export default function saveCampaign(campaign) {
  return function(dispatch) {
    dispatch({ type: 'SAVING_CAMPAIGN', payload: true })

    campaign.campaign_plans_attributes = campaign.campaign_plans_attributes.map((campaign_plan, i) => {
      return {
        campaign_id: campaign.campaign_id,
        plan_code: campaign_plan.plan_code,
        is_dynamic_rate: campaign_plan.is_dynamic_rate,
        price_experiment_ids: campaign_plan.price_experiment_ids,
        display_sequence: i + 1,
      }
    })

    axios.post(`${process.env.REACT_APP_GARCON_API}/campaigns/campaign`, campaign)
      .then((response) => {
        const payload = formatCampaign(response.data)
        dispatch({ type: 'GET_CAMPAIGN', payload })
        dispatch({ type: 'SAVING_CAMPAIGN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: error.response.data })
        throw error
      })
  }
}
