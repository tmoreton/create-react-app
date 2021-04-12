import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

export default function savePlan(plan = null) {
  return function(dispatch, getState) {
    dispatch({ type: 'SAVING_PLAN', payload: true })

    if (!plan) plan = getState().plan.info

    const body = formatPlan(plan)
    axios.post(`${process.env.REACT_APP_GARCON_API}/offers/plans/${plan.plan_code}`, body)
      .then((response) => {
        dispatch({ type: 'SAVE_PLAN', payload: response.data })
        dispatch({ type: 'SAVING_PLAN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'SAVING_PLAN', payload: false })
        throw error
      })
  }
}

export const formatPlan = (plan) => {
  plan = cloneDeep(plan)
  plan.marketing_highlights = plan.marketing_highlights.filter(highlight => highlight !== '')
  return plan
}
