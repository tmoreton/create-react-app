import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export function getChannelLocations(channelCode, callback = () => {}) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/channels/${channelCode}`)
      .then((response) => {
        const locations = mapKeys(response.data, location => {
          return location.location_code
        })
        dispatch({ type: 'GET_LOCATIONS_BY_CHANNEL', payload: { all: locations, tableData: response.data } })
        callback(response.data)
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting locations.' })
        throw error
      })
  }
}
