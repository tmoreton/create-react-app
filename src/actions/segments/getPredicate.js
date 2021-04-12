import axios from 'axios'

export default function getPredicate(predicate) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_PREDICATE', payload: true })

    if (predicate === '') {
      dispatch({ type: 'GET_PREDICATE', payload: [] })
      dispatch({ type: 'GETTING_PREDICATE', payload: false })
    } else {
      axios.get(`${process.env.REACT_APP_GARCON_API}/segments/predicates/${predicate}`)
        .then((response) => {
          dispatch({ type: 'GET_PREDICATE', payload: { options: response.data, predicate } })
          dispatch({ type: 'GETTING_PREDICATE', payload: false })
        })
        .catch((error) => {
          dispatch({ type: 'SHOW_ERROR', payload: `An error occured getting predicate for ${predicate}.` })
          dispatch({ type: 'GETTING_PREDICATE', payload: false })
          throw error
        })
    }
  }
}
