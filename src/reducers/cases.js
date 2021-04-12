export function cases(state = { all: [], case: {} }, action){
  switch (action.type) {
  case 'GET_CASES':
    return { ...state, all: action.payload }
  case 'GET_CASE':
    return { ...state, case: action.payload }
  case 'CLEAR_CASE':
    return { ...state, case: {} }
  default:
    return state
  }
}
