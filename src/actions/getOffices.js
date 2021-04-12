import axios from 'axios'

export function getOffices() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/offices/all`)
      .then((response) => {
        dispatch({ type: 'GET_OFFICES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured gettng offices.' })
        throw error
      })
  }

}
