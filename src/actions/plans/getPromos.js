import axios from 'axios'

export default function getPromos() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/rewards/promos/all`)
      .then((response) => {
        dispatch({ type: 'GET_PROMOS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting promos.' })
        throw error
      })
  }
}
