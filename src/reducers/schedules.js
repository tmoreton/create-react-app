import moment from 'moment'

export function locationsToSchedule(state = { selection: [], selectAll: false }, action) {
  switch (action.type) {
  case 'TOGGLE_TABLE_SELECION':
    return { ...state, selection: action.payload }
  default:
    return state
  }
}

const BLANK_LOCATION_SCHEDULE = { location_code: {}, shifts: {}, schedule_descs: [] }
export function locationSchedule(state = BLANK_LOCATION_SCHEDULE, action) {
  switch (action.type) {
  case 'GET_LOCATION_SCHEDULE':
    return action.payload
  case 'CLEAR_LOCATION_SCHEDULE':
    return BLANK_LOCATION_SCHEDULE
  default:
    return state
  }
}

export function locationsCalendars(state = { calendars: {}, filteredCalendars: {}, loading: false }, action) {
  switch (action.type) {
  case 'GET_LOCATION_CALENDAR':
    return { ...state, calendars: { ...state.calendars, ...action.payload }, filteredCalendars: { ...state.calendars, ...action.payload } }
  case 'GET_LOCATIONS_CALENDARS':
    return { ...state, calendars: { ...state.calendars, ...action.payload }, filteredCalendars: { ...state.calendars, ...action.payload } }
  case 'FILTER_LOCATIONS_CALENDARS':
    return { ...state, filteredCalendars: action.payload }
  case 'RESET_CALENDARS_FILTER':
    return { ...state, filteredCalendars: state.calendars }
  case 'LOADING_LOCATIONS_CALENDARS':
    return { ...state, loading: action.payload }
  default:
    return state
  }
}

export function sourceOfficeFilter(state = null, action) {
  switch (action.type) {
  case 'SET_SOURCE_OFFICE_FILTER':
    return action.payload
  default:
    return state
  }
}

export function sourceLocationsCalendars(state = { calendars: {}, filteredCalendars: {}, loading: false }, action) {
  switch (action.type) {
  case 'GET_SOURCE_LOCATIONS_CALENDARS':
    return { ...state, calendars: { ...state.calendars, ...action.payload }, filteredCalendars: { ...state.calendars, ...action.payload } }
  case 'LOADING_SOURCE_LOCATIONS_CALENDARS':
    return { ...state, loading: action.payload }
  default:
    return state
  }
}

export function dailyCalendars(state = { calendars: {}, loading: false }, action) {
  switch (action.type) {
  case 'GET_DAILY_CALENDARS':
    return { ...state, calendars: action.payload }
  case 'GET_DAILY_CALENDAR':
    return { ...state, calendars: { ...state.calendars, ...action.payload } }
  case 'LOADING_DAILY_CALENDARS':
    return { ...state, loading: action.payload }
  default:
    return state
  }
}

export function salesAgentsCalendars(state = { calendars: {}, loading: false }, action) {
  switch (action.type) {
  case 'GET_SALES_AGENTS_CALENDARS':
    return { ...state, calendars: action.payload }
  case 'GET_SALES_AGENTS_CALENDAR':
    return { ...state, calendars: { ...state.calendars, ...action.payload } }
  case 'LOADING_SALES_AGENTS_CALENDARS':
    return { ...state, loading: action.payload }
  default:
    return state
  }
}

export function weeksFilter(state = { startDt: moment(new Date()), endDt: moment(new Date()).add({ days: 14 }), startWorkWeek: 'sunday' }, action) {
  switch (action.type) {
  case 'SET_WEEKS_FILTER':
    return action.payload
  default:
    return state
  }
}

export function locations(state = { all: {}, filtered: {}, tableData: [{}], active: {}, sources: [], salesLocations: [], salesLocation: {}, types: [], partners: [] }, action) {
  switch (action.type) {
  case 'GET_LOCATIONS':
    return { ...state, all: action.payload, filtered: action.payload }
  case 'GET_SALES_LOCATIONS':
    return { ...state, salesLocations: action.payload }
  case 'GET_SALES_LOCATION_CODE':
    return { ...state, salesLocation: action.payload }
  case 'GET_LOCATION_TYPES':
    return { ...state, types: action.payload }
  case 'GET_PARTNERS':
    return { ...state, partners: action.payload }
  case 'GET_LOCATION_SOURCES':
    return { ...state, sources: action.payload }
  case 'FILTER_LOCATIONS':
    return { ...state, filtered: action.payload }
  case 'RESET_LOCATIONS_FILTER':
    return { ...state, filtered: state.all }
  case 'GET_LOCATIONS_BY_CHANNEL':
    return { ...state, all: action.payload.all, filtered: action.payload.all, tableData: action.payload.tableData }
  case 'GET_LOCATION':
    return { ...state, active: action.payload }
  default:
    return state
  }
}

export function sources(state = { all: [], active: {}, offices: {}, sources: [] }, action) {
  switch (action.type) {
  case 'GET_SOURCES':
    return { ...state, all: action.payload }
  case 'GET_SOURCE':
    return { ...state, active: action.payload }
  case 'GET_SOURCE_OFFICES':
    return { ...state, offices: action.payload }
  case 'GET_SOURCES_ARRAY':
    return { ...state, sources: action.payload }
  default:
    return state
  }
}

export function vendorTPV(state = [], action) {
  switch (action.type) {
  case 'GET_VENDOR_TPV':
    return action.payload
  default:
    return state 
  }
}

export function scheduleHistory(state = [], action) {
  switch (action.type) {
  case 'GET_SOURCE_SCHEDULE_HISTORY':
    return action.payload
  default:
    return state
  }
}

export function salesPermissions(state = { all:[], salesPermission: [] }, action) {
  switch (action.type) {
  case 'GET_SALES_PERMISSIONS':
    return { ...state, all: action.payload }
  case 'GET_SALES_PERMISSION':
    return { ...state, salesPermission: action.payload }
  default:
    return state
  }
}

export function salesAgents(state = {}, action) {
  switch (action.type) {
  case 'GET_SALES_AGENTS':
    return action.payload
  default:
    return state
  }
}

export function offices(state = [], action) {
  switch (action.type) {
  case 'GET_OFFICES':
    return action.payload
  default:
    return state
  }
}

export function roles(state = [], action) {
  switch (action.type) {
  case 'GET_ROLES':
    return action.payload
  default:
    return state
  }
}

export function userByID(state = [], action) {
  switch (action.type) {
  case 'GET_USER_BY_ID':
    return action.payload
  default:
    return state
  }
}

export function shift(state = { info: null, saving: false }, action) {
  switch (action.type) {
  case 'GET_SHIFT':
    return { ...state, info: action.payload }
  case 'SAVING_SHIFT':
    return { ...state, saving: action.payload }
  default:
    return state
  }
}

export function shifts(state = [], action) {
  switch (action.type) {
  case 'GET_SHIFTS':
    return action.payload
  default:
    return state
  }
}

export function territory(state = { revenueClassCode: 'RESI', organizations: [], campaigns: [], status: null, campaignId: null, listId: null, listName: null, zipCodes: '', organizationId: null, tracts: [], count: 0 }, action) {
  switch (action.type) {
  case 'GET_ORGANIZATIONS':
    return { ...state, organizations: action.payload }
  case 'CREATE_LIST':
    return { ...state, status: action.payload }
  case 'GET_LIST_ID':
    return { ...state, listId: action.payload }
  case 'GET_LIST_NAME':
    return { ...state, listName: action.payload }
  case 'GET_ZIP_CODES':
    return { ...state, zipCodes: action.payload }
  case 'GET_TRACTS':
    return { ...state, tracts: action.payload }
  case 'GET_ORGANIZATION_ID':
    return { ...state, organizationId: action.payload }
  case 'GET_COUNT':
    return { ...state, count: action.payload }
  case 'GET_REVENUE_CLASS_CODE':
    return { ...state, revenueClassCode: action.payload }
  case 'GET_CAMPAIGNS':
    return { ...state, campaigns: action.payload }
  case 'GET_CAMPAIGN_ID':
    return { ...state, campaignId: action.payload }
  default:
    return state
  }
}
