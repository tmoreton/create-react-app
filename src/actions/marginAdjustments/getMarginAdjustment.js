import axios from 'axios'

export default function getMarginAdjustment(marginAdjustmentId) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_MARGIN_ADJUSTMENT', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/margin_adjustments/${marginAdjustmentId}`)
      .then((response) => {
        dispatch({ type: 'GET_MARGIN_ADJUSTMENT', payload: response.data })
        dispatch({ type: 'GETTING_MARGIN_ADJUSTMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting margin adjustment.' })
        dispatch({ type: 'GETTING_MARGIN_ADJUSTMENT', payload: false })
        throw error
      })
  }
}
