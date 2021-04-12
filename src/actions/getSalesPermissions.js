import axios from 'axios'

export function getSalesPermissions() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/sales/permissions`)
      .then((response) => {
        dispatch({ type: 'GET_SALES_PERMISSIONS', payload: response.data })
      })
            
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting sales offices.' })
        throw error
      })
  }
}
