import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export function getLocations() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations`)
      .then((response) => {
        const locations = mapKeys(response.data, location => {
          return location.location_code
        })
        dispatch({ type: 'GET_LOCATIONS', payload: locations })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting locations.' })
        throw error
      })
  }
}
