import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import staticMarketRateId from '../../utils/staticMarketRateId'

export default function getStaticMarketRates() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_STATIC_MARKET_RATES', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/static_market_rates`)
      .then((response) => {
        const staticMarketRates = mapKeys(response.data, (rate) => {
          return staticMarketRateId(rate)
        })
        dispatch({ type: 'GET_STATIC_MARKET_RATES', payload: staticMarketRates })
        dispatch({ type: 'GETTING_STATIC_MARKET_RATES', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting static market rates.' })
        dispatch({ type: 'GETTING_STATIC_MARKET_RATES', payload: false })
        throw error
      })
  }
}
