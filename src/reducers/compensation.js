export function compRunsSummary(state = { compRunsSummary: [] }, action) {
  switch (action.type){
  case 'COMP_RUNS_SUMMARY':
    return { ...state, compRunsSummary: action.payload.comp_runs }
  default:
    return state
  }
}
export function compRunSchedules(state = { compRunSchedules: [], compAttributes: [], compAttributeValues: [] }, action) {
  switch (action.type){
  case 'COMP_RUN_SCHEDULES':
    return { ...state, compRunSchedules: action.payload }
  case 'COMP_ATTRIBUTES':
    return { ...state, compAttributes: action.payload }
  case 'COMP_ATTRIBUTE_VALUES':
    return { ...state, compAttributeValues: action.payload }
  default:
    return state
  }
}

export function compRun(state = [], action) {
  switch (action.type){
  case 'COMP_RUN':
    return action.payload.comp_run || []
  default:
    return state
  }
}

export function compRuns(state = [], action) {
  switch (action.type){
  case 'COMP_RUNS':
    return action.payload
  default:
    return state
  }
}

export function compRules(state = [], action) {
  switch (action.type){
  case 'COMP_RULES':
    return action.payload
  default:
    return state
  }
}

export function compRunData(state = [], action) {
  switch (action.type){
  case 'COMP_RUN_DATA':
    return action.payload
  default:
    return state
  }
}

export function compRunDataDuplicates(state = [], action) {
  switch (action.type){
  case 'COMP_RUN_DATA_DUPLICATES':
    return {
      // Duplicate removal based on key(s)
    }
  default:
    return state
  }
}

export function defaultPaymentRules(state = {}, action) {
  switch (action.type){
  case 'GET_DEFAULT_PAYMENT_RULES':
    return { ...state, defaultPaymentRules: action.payload }
  default:
    return state
  }
}

const defaultCompRunSchedule = {
  compRunScheduleName: '',
  compRunScheduleCode: '',
  compRunScheduleDesc: '',
  payPeriodEndType: 'WEEKLY',
  dayOfWeek: 'tuesday',
  dayOfMonth: 8,
  daysToRescind: 7,
  daysToClawback: 7,
  clawbackFromDtField: 'confirmed_start_dt',
  statusTransitionSetCode: 'MANAGER_PAYEE_APPROVAL',
  daysFromCompRunToPayment: 7,
  firstDayOfWeek: 'monday',
  shouldGenerateCompRunReport: true,
  active: true,
}
export function compRunSchedule(state = { compRunSchedule: defaultCompRunSchedule, paymentRules: [], saving: false }, action) {
  if (action && action.payload && action.payload.sourceCode) {
    action.payload.channelPartnerCode = undefined
  }
  if (action && action.payload && action.payload.channelPartnerCode) {
    action.payload.sourceCode = undefined
  }
  switch (action.type){
  case 'COMP_RUN_SCHEDULE_SAVING':
    return { ...state, saving: true }
  case 'COMP_RUN_SCHEDULE':
    return { ...state, compRunSchedule: action.payload }
  case 'COMP_RUN_SCHEDULE_PAYMENT_RULES':
    return { ...state, paymentRules: action.payload }
  case 'UPDATE_COMP_RUN_SCHEDULE':
    return {
      ...state,
      compRunSchedule: {
        ...state.compRunSchedule,
        ...action.payload,
      },
    }
  case 'UPDATE_COMP_RUN_SCHEDULE_PAYMENT_RULES':
    return { ...state, paymentRules: action.payload }
  case 'COMP_RUN_SCHEDULE_CREATED':
    return { ...state, compRunSchedule: action.payload }
  case 'COMP_RUN_SCHEDULE_UPDATED':
    return { ...state, compRunSchedule: action.payload }
  case 'COMP_RUN_SCHEDULE_PAYMENT_RULES_CREATED':
    return { ...state, paymentRules: action.payload, saving: false }
  case 'COMP_RUN_SCHEDULE_PAYMENT_RULES_UPDATED':
    return { ...state, paymentRules: action.payload, saving: false }
  default:
    return state
  }
}

const defaultCompRunScheduleBonusRulesState = {
  bonuses: [],
  loading: false,
  bonusTypes: [],
}

export function compRunScheduleBonusRules(state = defaultCompRunScheduleBonusRulesState, action) {
  switch (action.type) {
  case 'GET_COMP_RUN_SCHEDULE_BONUS_RULES':
    return { ...state, bonuses: action.payload, loading: false }
  case 'LOADING_COMP_RUN_SCHEDULE_BONUS_RULES':
    return { ...state, loading: action.loading }
  case 'UPDATE_COMP_RUN_SCHEDULE_BONUS_RULE':
    return { ...state, loading: false, bonuses: updateCompRunScheduleBonusRule(state.bonuses, action.payload) }
  case 'GET_COMP_BONUS_TYPES':
    return { ...state, bonusTypes: action.payload }
  case 'CREATE_COMP_RUN_SCHEDULE_BONUS_RULE':
    return { ...state, bonuses: [...state.bonuses, action.payload], loading: false }
  default:
    return state
  }
}

function updateCompRunScheduleBonusRule(bonuses, updatedBonus) {
  const filteredBonuses = bonuses.filter(bonus => {
    return bonus.comp_run_schedule_bonus_rule_id !== updatedBonus.comp_run_schedule_bonus_rule_id
  })

  return [updatedBonus, ...filteredBonuses]
}


