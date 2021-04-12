import axios from 'axios'

export default function getExperimentContext(segments, campaign) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'experiment', loading: true } })

    const segmentIds = segments.map(segment => segment.segment_assignment_id)

    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments/for_segments`, { params: { segments: segmentIds, campaign_id: campaign.campaign_id } })
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT_CONTEXT', payload: response.data })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'experiment', loading: false } })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting campaign for context.' })
        dispatch({ type: 'GETTING_CONTEXT', payload: { context: 'experiment', loading: false } })
        throw error
      })
  }
}
