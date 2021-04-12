import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getMarginAdjustments() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_MARGIN_ADJUSTMENTS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/margin_adjustments`)
      .then((response) => {
        const marginAdjustments = mapKeys(response.data, (marginAdjustment) => {
          return marginAdjustment.margin_adjustment_id
        })
        dispatch({ type: 'GET_MARGIN_ADJUSTMENTS', payload: marginAdjustments })
        dispatch({ type: 'GETTING_MARGIN_ADJUSTMENTS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting margin adjustments.' })
        dispatch({ type: 'GETTING_MARGIN_ADJUSTMENTS', payload: false })
        throw error
      })
  }
}
