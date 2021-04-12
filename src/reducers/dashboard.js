export function dashboard(state = { data: [], graph: [], agents: [] }, action) {
  switch (action.type) {
  case 'GET_DASHBOARD':
    return { ...state, data: action.payload }
  case 'GET_GRAPH':
    return { ...state, graph: action.payload }
  case 'GET_AGENTS':
    return { ...state, agents: action.payload }
  default:
    return state
  }
}
