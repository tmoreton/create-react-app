import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export function getSources() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources`)
      .then((response) => {
        const sources = mapKeys(response.data, source => {
          return source.source_code
        })
        dispatch({ type: 'GET_SOURCES', payload: sources })
      })
      .catch((error) => {
        throw error
      })
  }
}
