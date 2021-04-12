export function toggleTableSelection(selection, allLocations) {
  return function(dispatch) {
    const payload = allLocations.filter(location => {
      return selection.includes(location.location_code)
    })
    dispatch({ type: 'TOGGLE_TABLE_SELECION', payload })
  }
}
