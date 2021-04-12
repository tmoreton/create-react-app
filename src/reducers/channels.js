export function channels(state = [], action) {
  switch (action.type) {
  case 'GET_CHANNELS':
    return action.payload
  default:
    return state
  }
}

export function channelPartners(state = [], action) {
  switch (action.type) {
  case 'GET_CHANNEL_PARTNERS':
    return action.payload
  default:
    return state
  }
}
