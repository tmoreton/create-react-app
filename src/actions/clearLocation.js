export function clearLocation() {
  return function(dispatch) {
    dispatch({ type: 'GET_LOCATION', payload: {} })
    dispatch({ type: 'CLEAR_LOCATION_SCHEDULE' })
  }
}
