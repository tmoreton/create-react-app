import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function deactivatePlans({ plans = [], confirm = false } = {}) {
  return function(dispatch) {

    dispatch({ type: 'DEACTIVATING_PLANS', payload: true })

    plans = Object.values(plans)
    const plan_codes = plans.map(plan => plan.plan_code)

    const params = { confirm, plan_codes }

    axios.delete(`${process.env.REACT_APP_GARCON_API}/offers/plans/bulk`, { params })
      .then((response) => {
        const payload = mapKeys(response.data, (plan) => plan.plan_code)

        dispatch({ type: 'DEACTIVATE_PLANS', payload })
        dispatch({ type: 'DEACTIVATING_PLANS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'A server error occured deactivating plans.' })
        dispatch({ type: 'DEACTIVATING_PLANS', payload: false })
        throw error
      })
  }
}
