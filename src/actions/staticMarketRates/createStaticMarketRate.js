import axios from 'axios'
import staticMarketRateId from '../../utils/staticMarketRateId'

export default function createStaticMarketRate(staticMarketRate) {
  return function(dispatch) {
    dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/static_market_rates`, { ...staticMarketRate })
      .then((response) => {
        dispatch({ type: 'UPDATE_STATIC_MARKET_RATE_SAVED', payload: staticMarketRateId(response.data) })
        dispatch({ type: 'CREATE_STATIC_MARKET_RATE', payload: response.data })
        dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: false })
        throw error
      })
  }
}
