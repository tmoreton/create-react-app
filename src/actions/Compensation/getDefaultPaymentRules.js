import axios from 'axios'
import camelCaseKeysDeep from '../../utils/camelCaseKeysDeep'

export function getDefaultPaymentRules() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/default_payment_rules`, {})
      .then((response) => {
        dispatch({ type: 'GET_DEFAULT_PAYMENT_RULES', payload: camelCaseKeysDeep(response.data) })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting defaultPaymentRules.' })
        throw error
      })
  }
}
