import axios from 'axios'

export function getVendorTPV() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/sales/tpv_types`)
      .then((response) => {
        dispatch({ type: 'GET_VENDOR_TPV', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting TPV Types.' })
        throw error
      })
  }
}
