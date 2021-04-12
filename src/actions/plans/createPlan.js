import axios from 'axios'
import { formatPlan } from './savePlan'

export default function createPlan() {
  return function(dispatch, getState) {
    dispatch({ type: 'CREATING_PLAN', payload: true })

    const plan = formatPlan(getState().plan.info)
    axios.post(`${process.env.REACT_APP_GARCON_API}/offers/plans`, plan)
      .then((response) => {
        dispatch({ type: 'SAVE_PLAN', payload: response.data })
        dispatch({ type: 'CREATING_PLAN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'CREATING_PLAN', payload: false })
        throw error
      })
  }
}
