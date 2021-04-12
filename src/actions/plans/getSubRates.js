import axios from 'axios'

export default function getSubRates() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates?unit_of_measure=Month`)
      .then((response) => {
        dispatch({ type: 'GET_SUB_RATES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting subscription rates.' })
        throw error
      })
  }
}
