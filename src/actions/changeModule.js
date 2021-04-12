export function changeModule(module, extra = null) {
  return function(dispatch) {
    let title = 'Lighthouse'
    if (module) title += ` | ${module}`
    if (extra) title += ` | ${extra}`
    window.document.title = title
    dispatch({ type: 'CHANGE_MODULE', payload: module })
  }
}
