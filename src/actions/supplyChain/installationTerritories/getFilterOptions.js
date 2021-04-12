import axios from 'axios'
import uniqBy from 'lodash/uniqBy'

export default function getFilterOptions() {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    const getMarkets = axios.get(`${process.env.REACT_APP_GARCON_API}/offers/markets`, { params: { exclude_sop: true } })
    const getVendors = axios.get(`${process.env.REACT_APP_GARCON_API}/scheduling/vendors`)

    axios.all([getMarkets, getVendors]).then(axios.spread((marketsResp, vendorsResp) => {
      const marketOptions = marketsResp.data.map(market => { return { label: `${market.market_name} (${market.market_code})`, value: market.market_code } })
      const vendorOptions = vendorsResp.data.map(vendor => { return { label: vendor.vendor_name, value: vendor.vendor_code } })
      const stateOptions = uniqBy(marketsResp.data.map(market => { return { label: market.state_code, value: market.state_code } }), 'label')

      const filterOptions = {
        vendors: vendorOptions,
        markets: marketOptions,
        states: stateOptions,
      }
      dispatch({ type: 'GET_INSTALLER_TERRITORIES_FILTER_OPTIONS', filterOptions })
    })).catch(error => {
      dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
      dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get territory filter options' } })
    })
  }
}
