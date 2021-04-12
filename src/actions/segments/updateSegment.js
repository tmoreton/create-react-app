import axios from 'axios'

export default function updateSegment(segment_assignment_id, segment_description, segmentRules) {
  return function(dispatch, getState) {
    dispatch({ type: 'SAVING_SEGMENT', payload: true })

    const data = {
      segment_description,
      segment_rules_attributes: segmentRules,
    }

    axios.put(`${process.env.REACT_APP_GARCON_API}/segments/${segment_assignment_id}`, data)
      .then((response) => {
        const payload = getState().segments.info.map(segment => {
          if (segment.segment_assignment_id === segment_assignment_id) {
            segment = response.data
          }
          return segment
        })
        dispatch({ type: 'UPDATE_SEGMENT', payload })
        dispatch({ type: 'SAVING_SEGMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured updating segment.' })
        dispatch({ type: 'SAVING_SEGMENT', payload: false })
        throw error
      })
  }
}
