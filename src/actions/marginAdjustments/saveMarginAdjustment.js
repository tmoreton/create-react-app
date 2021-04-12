import axios from 'axios'

export default function saveMarginAdjustment() {
  return function(dispatch, getState) {
    dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: true })

    const { marginAdjustment } = getState()

    axios.put(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/margin_adjustments/${marginAdjustment.info.margin_adjustment_id}`, marginAdjustment.info)
      .then((response) => {
        dispatch({ type: 'SAVE_MARGIN_ADJUSTMENT', payload: response.data })
        dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: error.response.data })
        dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: false })
        throw error
      })
  }
}
