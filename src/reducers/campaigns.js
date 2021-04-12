export function campaigns(state = {}, action) {
  switch (action.type) {
  case 'GET_CAMPAIGNS':
    return action.payload
  default:
    return state
  }
}

export function campaignPhoneNumbers(state = [], action) {
  switch (action.type) {
  case 'GET_CAMPAIGN_PHONE_NUMBERS':
    return action.payload
  default:
    return state
  }
}

export function campaignPlans(state = { info: {}, loading: false }, action) {
  switch (action.type) {
  case 'GETTING_PLANS_FOR_CAMPAIGNS':
    return { ...state, loading: action.payload }
  case 'GET_PLANS_FOR_CAMPAIGNS':
    return { ...state, info: action.payload }
  default:
    return state
  }
}


const info = {
  campaign_experiments_attributes: [],
  campaign_segments_attributes: [],
  campaign_plans_attributes: [],
}
export function campaign(state = { info, experiments: {}, saving: false, unsavedChanges: false }, action) {
  switch (action.type) {
  case 'GET_CAMPAIGN':
    return { ...state, info: action.payload }
  case 'UPDATE_CAMPAIGN':
    return { ...state, info: action.payload, unsavedChanges: true }
  case 'CLEAR_CAMPAIGN':
    return { ...state, info, unsavedChanges: false }
  case 'GET_CAMPAIGN_EXPERIMENT':
    return { ...state, experiments: { ...state.experiments, [action.payload.experiment_id]: { ...action.payload, unsavedChanges: false } } }
  case 'SAVE_CAMPAIGN_EXPERIMENT':
    return { ...state, experiments: { ...state.experiments, [action.payload.experiment_id]: { ...action.payload, unsavedChanges: false } } }
  case 'UPDATE_CAMPAIGN_EXPERIMENT':
    return { ...state, experiments: { ...state.experiments, [action.payload.experiment.experiment_id]: { ...action.payload.experiment, unsavedChanges: action.payload.unsavedChanges } } }
  case 'SAVING_CAMPAIGN':
    return { ...state, saving: action.payload, unsavedChanges: false }
  default:
    return state
  }
}
