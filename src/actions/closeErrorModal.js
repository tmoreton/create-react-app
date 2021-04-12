export function closeErrorModal() {
  return function(dispatch) {
    dispatch({ type: 'DISMISS_ERROR', payload: null })
  }
}
