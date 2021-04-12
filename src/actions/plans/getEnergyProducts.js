import axios from 'axios'

export default function getEnergyProducts() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/energy_products`)
      .then((response) => {
        dispatch({ type: 'GET_ENERGY_PRODUCTS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting energy products.' })
        throw error
      })
  }
}
