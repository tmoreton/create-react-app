import axios from 'axios'

export default function deactivatePlan({ planCode = null, confirm = false } = {}) {
  return function(dispatch, getState) {

    dispatch({ type: 'DEACTIVATING_PLAN', payload: { planCode, deactivating: true } })

    planCode = planCode || getState().plan.info.plan_code

    axios.delete(`${process.env.REACT_APP_GARCON_API}/offers/plans/${planCode}`, { params: { confirm } })
      .then((response) => {
        dispatch({ type: 'DEACTIVATE_PLAN', payload: { plan: response.data.plan, warnings: response.data.warnings, errors: response.data.errors } })
        dispatch({ type: 'DEACTIVATING_PLAN', payload: { deactivating: false } })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'A server error occured deactivating plan.' })
        dispatch({ type: 'DEACTIVATING_PLAN', payload: false })
        throw error
      })
  }
}
