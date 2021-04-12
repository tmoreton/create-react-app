import axios from 'axios'

export default function getLoyaltyHistory(loyalty_program_code) {
  return function (dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/loyalty_programs/${loyalty_program_code}/history`)
      .then((response) => {
        dispatch({ type: 'GET_REWARD_HISTORY', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'Error while getting histories for loyalty program' })
        throw err
      })
  }
}
