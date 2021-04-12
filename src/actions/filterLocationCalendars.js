import pickBy from 'lodash/pickBy'

export function filterLocationCalendars(filteredLocations, allCalendars) {
  return function(dispatch) {
    const locationCodes = filteredLocations.map(location => location._original.location_code)
    const calendars = pickBy(allCalendars, function(value, locationCode) {
      return locationCodes.includes(locationCode)
    })
    dispatch({ type: 'FILTER_LOCATIONS_CALENDARS', payload: calendars })
  }
}
