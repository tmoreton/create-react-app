export default function setWeeksFilter(weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'SET_WEEKS_FILTER', payload: weeksFilter })
  }
}
