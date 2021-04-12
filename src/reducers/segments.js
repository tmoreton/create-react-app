export function segments(state = { info: [], loading: true }, action) {
  switch (action.type) {
  case 'GETTING_SEGMENTS':
    return { ...state, loading: action.payload }
  case 'GET_SEGMENTS':
  case 'UPDATE_SEGMENT':
    return { ...state, info: action.payload }
  case 'CREATE_SEGMENT':
    return { ...state, info: [...state.info, action.payload] }
  default:
    return state
  }
}

export function campaignSegments(state = { info: [], loading: true }, action) {
  switch (action.type) {
  case 'GETTING_CAMPAIGN_SEGMENTS':
    return { ...state, loading: action.payload }
  case 'GET_CAMPAIGN_SEGMENTS':
    return { ...state, info: action.payload }
  default:
    return state
  }
}

export function predicates(state = { info: {}, loading: true }, action) {
  switch (action.type) {
  case 'GETTING_PREDICATES':
    return { ...state, loading: action.payload }
  case 'GET_PREDICATES':
    return { ...state, info: action.payload }
  default:
    return state
  }
}

export function context(state = {
  agent: [],
  segments: [],
  campaigns: [],
  experiment: {},
  loading: {
    agent: false,
    segments: false,
    campaign: false,
    experiment: false,
  } }, action) {
  switch (action.type) {
  case 'GETTING_CONTEXT':
    return { ...state, loading: { ...state.loading, [action.payload.context]: action.payload.loading } }
  case 'GET_AGENT_CONTEXT':
    return { ...state, agent: action.payload }
  case 'GET_SEGMENTS_CONTEXT':
    return { ...state, segments: action.payload }
  case 'GET_CAMPAIGNS_CONTEXT':
    return { ...state, campaigns: action.payload || [] }
  case 'GET_EXPERIMENT_CONTEXT':
    return { ...state, experiment: action.payload }
  default:
    return state
  }
}
