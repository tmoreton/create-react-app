import { combineReducers } from 'redux'
import {
  locationsToSchedule,
  locationSchedule,
  locationsCalendars,
  sourceLocationsCalendars,
  salesAgentsCalendars,
  dailyCalendars,
  weeksFilter,
  locations,
  offices,
  roles,
  sources,
  scheduleHistory,
  salesAgents,
  shift,
  shifts,
  territory,
  sourceOfficeFilter,
  salesPermissions,
  userByID,
  vendorTPV,
} from './schedules'
import {
  campaigns,
  campaignPhoneNumbers,
  campaignPlans,
  campaign,
} from './campaigns'
import {
  experiments,
  experiment,
  experimentTypes,
} from './experiments'
import {
  campaignSegments,
  segments,
  predicates,
  context,
} from './segments'
import {
  staticMarketRates,
} from './staticMarketRates'
import {
  marginAdjustments,
  marginAdjustment,
} from './marginAdjustments'
import {
  compRunsSummary,
  compRunSchedules,
  compRunSchedule,
  defaultPaymentRules,
  compRun,
  compRuns,
  compRules,
  compRunData,
  compRunDataDuplicates,
  compRunScheduleBonusRules,
} from './compensation'
import {
  channels,
  channelPartners,
} from './channels'
import {
  plans,
  plan,
  planFeatures,
} from './plans'
import {
  installationTerritories,
} from './supplyChain'
import {
  dispositions,
} from './mx'
import {
  correspondenceTemplates,
} from './correspondence'
import {
  dashboard,
} from './dashboard'
import {
  cases,
} from './cases'

const DEFAULT_USER = { loggedIn: false, userId: null, email: null, sourceCode: null, roles: [], loading: false, userLoaded: false }
function user(state = DEFAULT_USER, action) {
  switch (action.type) {
  case 'GET_USER':
    return { ...state, ...action.payload, userLoaded: true }
  case 'CLEAR_USER':
    return DEFAULT_USER
  default:
    return state
  }
}

function users(state = { all: [], selected: {} }, action){
  switch (action.type) {
  case 'GET_ALL_USERS':
    return { ...state, all: action.payload }
  case 'GET_SELECTED_USER':
    return { ...state, selected: action.payload }
  default:
    return state
  }
}

function activeModule(state = null, action) {
  switch (action.type) {
  case 'CHANGE_MODULE':
    return action.payload
  default:
    return state
  }
}

function error(state = { show: false, message: '', headline: null }, action) {
  switch (action.type) {
  case 'SHOW_ERROR':
    return { show: true, message: action.payload.message, headline: action.payload.headline }
  case 'DISMISS_ERROR':
    return { show: false, message: '', headline: null }
  default:
    return state
  }
}

const rootReducer = combineReducers({
  user,
  activeModule,
  error,
  roles,
  sources,
  scheduleHistory,
  salesPermissions,
  salesAgents,
  offices,
  vendorTPV,
  shift,
  locations,
  locationsToSchedule,
  locationSchedule,
  locationsCalendars,
  sourceLocationsCalendars,
  salesAgentsCalendars,
  dailyCalendars,
  weeksFilter,
  shifts,
  campaigns,
  campaignPhoneNumbers,
  campaignPlans,
  plans,
  plan,
  planFeatures,
  campaign,
  experiments,
  experiment,
  experimentTypes,
  channels,
  channelPartners,
  territory,
  sourceOfficeFilter,
  campaignSegments,
  segments,
  predicates,
  context,
  staticMarketRates,
  marginAdjustments,
  marginAdjustment,
  compRunsSummary,
  compRunSchedules,
  compRunSchedule,
  compRun,
  compRuns,
  compRules,
  compRunData,
  compRunDataDuplicates,
  compRunScheduleBonusRules,
  defaultPaymentRules,
  installationTerritories,
  dispositions,
  dashboard,
  correspondenceTemplates,
  cases,
  users,
  userByID,
})

export default rootReducer
