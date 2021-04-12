import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getPredicates() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_PREDICATES', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/segments/predicates`)
      .then((response) => {
        const payload = mapKeys(response.data, data => data.segment_predicate.predicate)
        dispatch({ type: 'GET_PREDICATES', payload })
        dispatch({ type: 'GETTING_PREDICATES', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting predicates.' })
        dispatch({ type: 'GETTING_PREDICATES', payload: false })
        throw error
      })
  }
}
