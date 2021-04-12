import axios from 'axios'

export default function getCampaignContext(segments) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'campaign', loading: true } })

    const segmentIds = segments.map(segment => segment.segment_assignment_id)

    axios.get(`${process.env.REACT_APP_GARCON_API}/campaigns/for_segments`, { params: { segments: segmentIds } })
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGNS_CONTEXT', payload: response.data })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'campaign', loading: false } })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting campaign for context.' })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'campaign', loading: false } })
        throw error
      })
  }
}
