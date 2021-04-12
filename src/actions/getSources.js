import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import sortBy from 'lodash/sortBy'

export function getSources() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources`)
      .then((response) => {
        const sorted = sortBy(response.data, ['source_code'])
        const sources = mapKeys(sorted, source => {
          return source.source_code
        })
        dispatch({ type: 'GET_SOURCES', payload: sources })
        dispatch({ type: 'GET_SOURCES_ARRAY', payload: response.data })
        dispatch({ type: 'GET_LOCATION_SOURCES', payload: response.data })
      })
      .catch((error) => {
        throw error
      })
  }
}
