const initialState = {
  loading: false,
  dispositions: [],
}

export function dispositions(state = initialState, action) {
  switch (action.type){
  case 'GET_DISPOSITIONS':
    return { ...state, dispositions: action.payload, loading: false }
  case 'LOADING_DISPOSITIONS':
    return { ...state, loading: action.loading }
  case 'UPDATE_DISPOSITION':
    return { ...state, dispositions: updateDisposition(state.dispositions, action.payload), loading: false }
  default:
    return state
  }
}

function updateDisposition(allDispositions, updatedDisposition) {
  const filteredDispositions = allDispositions.filter(disposition => {
    return disposition.disposition_id !== updatedDisposition.disposition_id
  })

  return [updatedDisposition, ...filteredDispositions]
}
