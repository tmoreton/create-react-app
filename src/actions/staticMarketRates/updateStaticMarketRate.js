import axios from 'axios'
import staticMarketRateId from '../../utils/staticMarketRateId'

export default function updateStaticMarketRate(staticMarketRate, originalRate, rate) {
  return function(dispatch) {

    const newStaticMarketRate = {
      market_code: staticMarketRate.market_code,
      revenue_class_code: staticMarketRate.revenue_class_code,
      plan_code: staticMarketRate.plan_code,
      rate,
    }

    dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/static_market_rates`, { ...newStaticMarketRate })
      .then((response) => {
        const id = staticMarketRateId(response.data)
        dispatch({ type: 'UPDATE_STATIC_MARKET_RATE_SAVED', payload: id })
        dispatch({ type: 'UPDATE_STATIC_MARKET_RATE', payload: { staticMarketRate: response.data, id } })
        dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: false })
      })
      .catch((error) => {
        staticMarketRate.rate = originalRate
        dispatch({ type: 'UPDATE_STATIC_MARKET_RATE', payload: { staticMarketRate, id: staticMarketRateId(staticMarketRate) } })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'SAVING_STATIC_MARKET_RATE', payload: false })
        throw error
      })
  }
}
