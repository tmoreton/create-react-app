import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getPlansForCampaigns() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_PLANS_FOR_CAMPAIGNS', payload: true })

    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/plans/campaigns`)
      .then((response) => {
        const payload = response.data.map(plan => {
          return { ...plan, is_dynamic_rate: false, price_experiment_ids: [] }
        })
        const plans = mapKeys(payload, (plan) => plan.plan_code)
        dispatch({ type: 'GET_PLANS_FOR_CAMPAIGNS', payload: plans })
        dispatch({ type: 'GETTING_PLANS_FOR_CAMPAIGNS', payload: false })
      }).catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting plans.' })
        dispatch({ type: 'GETTING_PLANS_FOR_CAMPAIGNS', payload: false })
        throw error
      })
  }
}
