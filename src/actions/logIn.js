export function logIn() {
  return function(dispatch) {
    dispatch({ type: 'GET_USER', payload: { loading: true } })
  }
}
