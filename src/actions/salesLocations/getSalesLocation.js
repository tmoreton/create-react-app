import axios from 'axios'

export const getSalesLocations = () => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/offers/locations/sales_locations`)
      dispatch({ type: 'GET_SALES_LOCATIONS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating Location.' })
      throw error
    }
  }
}

export const getSalesLocation = (sales_location_code) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/offers/locations/sales_locations/${sales_location_code}`)
      return response.data
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating Location.' })
      throw error
    }
  }
}

export function getLocationTypes() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/locations/sales_location_types`)
      .then((response) => {
        dispatch({ type: 'GET_LOCATION_TYPES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting location types.' })
        throw error
      })
  }
}
