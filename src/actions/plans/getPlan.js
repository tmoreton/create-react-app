import axios from 'axios'

export default function getPlan(planCode) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_PLAN', payload: true })

    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/plans/${planCode}`)
      .then((response) => {          
        dispatch({ type: 'GET_PLAN', payload: response.data })
        dispatch({ type: 'GETTING_PLAN', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: `An error occured getting plan: ${planCode}.` })
        throw error
      })
  }
}
