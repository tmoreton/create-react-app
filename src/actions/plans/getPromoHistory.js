import axios from 'axios'

export default function getPromoHistory(promo_code) {
  return function (dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/rewards/promos/${promo_code}/history`)
      .then((response) => {
        dispatch({ type: 'GET_REWARD_HISTORY', payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'Error while getting histories for promo' })
        throw err
      })
  }
}
