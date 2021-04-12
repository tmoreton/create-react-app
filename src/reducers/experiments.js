export function experiments(state = { info: {}, slugs: [], loading: true }, action) {
  switch (action.type) {
  case 'GETTING_EXPERIMENTS':
    return { ...state, loading: true }
  case 'GET_EXPERIMENTS':
    return { ...state, info: action.payload, loading: false }
  case 'GET_EXPERIMENT_SLUGS':
    return { ...state, slugs: action.payload }
  default:
    return state
  }
}

export function experimentTypes(state = [], action) {
  switch (action.type) {
  case 'GET_EXPERIMENT_TYPES':
    return action.payload
  default:
    return state
  }
}

const initialState = { info: {}, unsavedChanges: false, saving: false, loading: true }

export function experiment(state = initialState, action) {
  switch (action.type) {
  case 'GET_EXPERIMENT':
    return { ...state, info: action.payload, saving: false, loading: false }
  case 'UPDATE_EXPERIMENT':
    return { ...state, info: action.payload, unsavedChanges: true }
  case 'SAVING_EXPERIMENT':
    return { ...state, saving: action.payload, unsavedChanges: false }
  case 'CLEAR_EXPERIMENT':
    return initialState
  default:
    return state
  }
}
