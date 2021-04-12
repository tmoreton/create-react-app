import mapKeys from 'lodash/mapKeys'

export default function filterLocations(filteredLocations) {
  return function(dispatch) {
    const locations = mapKeys(filteredLocations.map(location => location._original), location => {
      return location.location_code
    })
    dispatch({ type: 'FILTER_LOCATIONS', payload: locations })
  }
}
