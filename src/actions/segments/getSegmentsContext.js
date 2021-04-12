import axios from 'axios'

export default function getSegmentsContext(params) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'segments', loading: true } })

    axios.get(`${process.env.REACT_APP_GARCON_API}/segments/for_context`, { params })
      .then((response) => {
        dispatch({ type: 'GET_SEGMENTS_CONTEXT', payload: response.data })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'segments', loading: false } })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting segments for context.' })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'segments', loading: false } })
        throw error
      })
  }
}
