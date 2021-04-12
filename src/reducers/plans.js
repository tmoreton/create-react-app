const initialPlansState = { info: {}, loading: false, deactivating: false }

export function plans(state = initialPlansState, action) {
  switch (action.type) {
  case 'GETTING_PLANS':
    return { ...state, loading: action.payload }
  case 'DEACTIVATING_PLANS':
    return { ...state, deactivating: action.payload }
  case 'GET_PLANS':
    return { ...state, info: action.payload }
  case 'SAVE_PLAN':
    return { ...state, info: { ...state.info, [action.payload.plan_code]: action.payload }, unsavedChanges: false }
  case 'DEACTIVATE_PLANS':
    return { ...state, info: action.payload }
  case 'DEACTIVATE_PLAN':
    return { ...state, info: { ...state.info, [action.payload.plan.plan_code]: action.payload.plan } }
  case 'CLEAR_PLANS':
    return initialPlansState
  default:
    return state
  }
}

const initialPlanState = {
  info: {
    payment_required: false,
    is_ptc_indexed: false,
    is_intro_subscription: false,
    energy_product_code: '100_WIND_NATIONAL',
  },
  planCodeBeingDeactivated: null,
  unsavedChanges: false,
  loading: false,
  saving: false,
  creating: false,
  cloning: false,
  deactivating: false,
  warnings: [],
  errors: [],
}

export function plan(state = initialPlanState, action) {
  switch (action.type) {
  case 'GETTING_PLAN':
    return { ...state, loading: action.payload }
  case 'CREATING_PLAN':
    return { ...state, creating: action.payload, saving: action.payload }
  case 'SAVING_PLAN':
    return { ...state, saving: action.payload }
  case 'CLONING_PLAN':
    return { ...state, cloning: action.payload }
  case 'DEACTIVATING_PLAN':
    return { ...state, deactivating: action.payload.deactivating, planCodeBeingDeactivated: action.payload.planCode }
  case 'GET_PLAN':
  case 'SAVE_PLAN':
    return { ...state, info: action.payload, unsavedChanges: false }
  case 'UPDATE_PLAN':
    return { ...state, info: action.payload, unsavedChanges: true }
  case 'DEACTIVATE_PLAN':
    return { ...state, info: action.payload.plan, warnings: action.payload.warnings, errors: action.payload.errors, planCodeBeingDeactivated: null }
  case 'CLEAR_PLAN':
    return initialPlanState
  default:
    return state
  }
}

export function planFeatures(state = { energyProducts: [], contractDurations: [], contractTypes: [], promos: [], loyaltyPrograms: [], earlyCancellationFees: [], subRates: [], rewardHistory: [], pricingAlgorithms: [] }, action) {
  switch (action.type) {
  case 'GET_ENERGY_PRODUCTS':
    return { ...state, energyProducts: action.payload }
  case 'GET_CONTRACT_DURATIONS':
    return { ...state, contractDurations: action.payload }
  case 'GET_CONTRACT_TYPES':
    return { ...state, contractTypes: action.payload }
  case 'GET_PROMOS':
    return { ...state, promos: action.payload }
  case 'GET_LOYALTY_PROGRAMS':
    return { ...state, loyaltyPrograms: action.payload }
  case 'GET_REWARD_HISTORY':
    return { ...state, rewardHistory: action.payload }
  case 'GET_EARLY_CANCELLATION_FEES':
    return { ...state, earlyCancellationFees: action.payload }
  case 'GET_SUB_RATES':
    return { ...state, subRates: action.payload }
  case 'GET_DYNAMIC_PRICING':
    return { ...state, pricingAlgorithms: action.payload }
  default:
    return state
  }
}
