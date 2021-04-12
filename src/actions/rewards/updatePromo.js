import axios from 'axios'
import history from '../../history'

export default function updatePromo(promoObj) {
  return function (dispatch) {
    axios.put(`${process.env.REACT_APP_GARCON_API}/rewards/promos/${promoObj.promo_code}`, promoObj)
      .then(() => {
        history.push('/rewards')
      })
      .catch(() => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured updating promo' })
      })
  }
}
