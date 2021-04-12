import axios from 'axios'
import filter from 'lodash/filter'

export function approveShift(shiftId) {
  return function(dispatch, getState) {
    const shifts = filter(getState().shifts, shift => shift.recorded_shift_id !== shiftId)
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/shifts/${shiftId}/approve_shift`, {})
      .then(() => {
        dispatch({ type: 'GET_SHIFTS', payload: shifts })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured approving the shift.' })
        throw error
      })
  }
}
