export function clearUser() {
  return function(dispatch) {
    dispatch({ type: 'CLEAR_USER', payload: null })
  }
}
