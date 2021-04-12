import axios from 'axios'

export default function getDynamicPricingAlgorithms() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/dynamic_pricing_algorithms`)
      .then((response) => {
        dispatch({ type: 'GET_DYNAMIC_PRICING', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting dynamic_pricing_algorithms.' })
        throw error
      })
  }
}
