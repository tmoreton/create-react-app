export function staticMarketRates(state = { info: {}, savedRateId: null, loading: true, saving: false }, action) {
  switch (action.type) {
  case 'GETTING_STATIC_MARKET_RATES':
    return { ...state, loading: action.payload }
  case 'SAVING_STATIC_MARKET_RATE':
    return { ...state, saving: action.payload }
  case 'UPDATE_STATIC_MARKET_RATE_SAVED':
    return { ...state, savedRateId: action.payload }
  case 'GET_STATIC_MARKET_RATES':
    return { ...state, info: action.payload }
  case 'UPDATE_STATIC_MARKET_RATE':
    return { ...state, info: { ...state.info, [action.payload.id]: action.payload.staticMarketRate } }
  default:
    return state
  }
}
