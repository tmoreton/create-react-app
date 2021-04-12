export function selectLocation(locationCode, locations) {
  return function(dispatch) {
    const selectedLocation = locations[locationCode]
    dispatch({ type: 'GET_LOCATION', payload: selectedLocation })
  }
}
