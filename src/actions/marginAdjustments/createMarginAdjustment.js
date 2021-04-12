import axios from 'axios'

export default function createMarginAdjustment() {
  return function(dispatch, getState) {
    dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: true })

    const { marginAdjustment } = getState()

    axios.post(`${process.env.REACT_APP_GARCON_API}/pricing/market_rates/margin_adjustments`, marginAdjustment.info)
      .then((response) => {
        dispatch({ type: 'CREATE_MARGIN_ADJUSTMENT', payload: response.data })
        dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: error.response.data.description })
        dispatch({ type: 'SAVING_MARGIN_ADJUSTMENT', payload: false })
        throw error
      })
  }
}
