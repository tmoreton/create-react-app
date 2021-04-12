const initialState = {
  loading: false,
  saving: false,
  correspondenceTemplates: [],
  currentCorrespondenceTemplate: {},
  currentCorrespondenceTemplateHistories: [],
  currentCorrespondenceTemplateHistory: { user: {} },
  currentCorrespondenceTemplateHistoryDiff: {},
}

export function correspondenceTemplates(state = initialState, action) {
  switch (action.type){
  case 'GET_CORRESPONDENCE_TEMPLATES':
    return { ...state, correspondenceTemplates: action.payload, loading: false }
  case 'GET_CORRESPONDENCE_TEMPLATE':
    return { ...state, currentCorrespondenceTemplate: action.payload, loading: false, saving: false }
  case 'GET_CORRESPONDENCE_TEMPLATE_HISTORIES':
    return { ...state, currentCorrespondenceTemplateHistories: action.payload, loading: false }
  case 'GET_CORRESPONDENCE_TEMPLATE_HISTORY':
    return { ...state, currentCorrespondenceTemplateHistory: action.history, currentCorrespondenceTemplateHistoryDiff: action.diff, loading: false }
  case 'LOADING_CORRESPONDENCE_TEMPLATES':
    return { ...state, loading: action.loading }
  case 'SAVING_CORRESPONDENCE_TEMPLATE':
    return { ...state, saving: action.saving }
  default:
    return state
  }
}
