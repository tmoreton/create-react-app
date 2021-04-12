import axios from 'axios'

export default function getLoyaltyPrograms() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/loyalty_programs`)
      .then((response) => {
        dispatch({ type: 'GET_LOYALTY_PROGRAMS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting loyalty programs.' })
        throw error
      })
  }
}
