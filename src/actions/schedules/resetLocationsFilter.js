export default function resetLocationsFilter() {
  return function(dispatch) {
    dispatch({ type: 'RESET_LOCATIONS_FILTER', payload: {} })
  }
}
