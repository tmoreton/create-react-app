import axios from 'axios'

export default function clonePlan(planCode) {
  return function(dispatch) {
    dispatch({ type: 'CLONING_PLAN', payload: true })

    axios.post(`${process.env.REACT_APP_GARCON_API}/offers/plans/${planCode}/clone`)
      .then((response) => {
        dispatch({ type: 'SAVE_PLAN', payload: response.data })
        dispatch({ type: 'CLONING_PLAN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: error.response.data })
        dispatch({ type: 'CLONING_PLAN', payload: false })
        throw error
      })
  }
}
