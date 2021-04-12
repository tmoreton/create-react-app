import axios from 'axios'
import filter from 'lodash/filter'
import moment from 'moment'

export function getShifts(sourceCode, type, startDate, endDate) {
  return function(dispatch, getState) {
    let typeCode = type
    if (!sourceCode) sourceCode = getState().user.sourceCode
    if (type === 'approved') typeCode = 'unpaired'

    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/sources/${sourceCode}/${typeCode}_shifts?after_dt=${moment(startDate).format('YYYY-MM-DD')}&before_dt=${moment(endDate).format('YYYY-MM-DD')}`)
      .then((response) => {
        let payload
        switch (type) {
        case 'unpaired':
          payload = response.data.scheduled_shifts
          break
        case 'approved':
          payload = filter(response.data.recorded_shifts, shift => shift.approved_by_user_id !== null)
          break
        default:
          payload = response.data
        }
        dispatch({ type: 'GET_SHIFTS', payload })
      })
      .catch((error) => {
        dispatch({ type: 'GET_SHIFTS', payload: [] })
        throw error
      })
  }
}
