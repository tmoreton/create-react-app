import axios from 'axios'

export default function createSegment(segment_description, segmentRules) {
  return function(dispatch) {
    dispatch({ type: 'SAVING_SEGMENT', payload: true })

    const data = {
      segment_description,
      segment_rules_attributes: segmentRules,
    }

    axios.post(`${process.env.REACT_APP_GARCON_API}/segments`, data)
      .then((response) => {
        dispatch({ type: 'CREATE_SEGMENT', payload: response.data })
        dispatch({ type: 'SAVING_SEGMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting segments.' })
        dispatch({ type: 'SAVING_SEGMENT', payload: false })
        throw error
      })
  }
}
