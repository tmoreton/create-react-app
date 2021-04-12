export default function clearLogin() {
  return function(dispatch) {
    dispatch({ type: 'GET_USER', payload: { loading: false } })
  }
}
