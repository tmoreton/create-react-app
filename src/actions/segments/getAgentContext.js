import axios from 'axios'

export default function getSegmentsContext(params) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'agent', loading: true } })

    axios.get(`${process.env.REACT_APP_GARCON_API}/sales/recent_requests`, { params })
      .then((response) => {
        dispatch({ type: 'GET_AGENT_CONTEXT', payload: response.data })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'agent', loading: false } })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting segments for context.' })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'agents', loading: false } })
        throw error
      })
  }
}
