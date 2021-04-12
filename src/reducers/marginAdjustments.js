export function marginAdjustments(state = { info: {}, loading: true }, action) {
  switch (action.type) {
  case 'GETTING_MARGIN_ADJUSTMENTS':
    return { ...state, loading: action.payload }
  case 'GET_MARGIN_ADJUSTMENTS':
    return { ...state, info: action.payload }
  case 'CREATE_MARGIN_ADJUSTMENT':
  case 'SAVE_MARGIN_ADJUSTMENT':
    return { ...state, info: { ...state.info, [action.payload.margin_adjustment_id]: action.payload } }
  default:
    return state
  }
}

const initialState = { info: { margin_adjustment_segments: [] }, loading: true, saving: false, unsavedChanges: false }
export function marginAdjustment(state = { info: { margin_adjustment_segments: [] }, loading: true, saving: false, unsavedChanges: false }, action) {
  switch (action.type) {
  case 'GETTING_MARGIN_ADJUSTMENT':
    return { ...state, loading: action.payload }
  case 'SAVING_MARGIN_ADJUSTMENT':
    return { ...state, saving: action.payload }
  case 'GET_MARGIN_ADJUSTMENT':
  case 'CREATE_MARGIN_ADJUSTMENT':
  case 'SAVE_MARGIN_ADJUSTMENT':
    return { ...state, info: action.payload, unsavedChanges: false }
  case 'UPDATE_MARGIN_ADJUSTMENT':
    return { ...state, info: action.payload, unsavedChanges: true }
  case 'CLEAR_MARGIN_ADJUSTMENT':
    return initialState
  default:
    return state
  }
}
