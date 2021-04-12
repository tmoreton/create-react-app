import axios from 'axios'

export const getListName = (input) => {
  return { type: 'GET_LIST_NAME', payload: input }
}

export const getZipCodes = (input) => {
  return { type: 'GET_ZIP_CODES', payload: input }
}

export const getTracts = (input) => {
  return { type: 'GET_TRACTS', payload: input }
}

export const getCampaignId = (input) => {
  return { type: 'GET_CAMPAIGN_ID', payload: input }
}

export function getOrganizationId(input) {
  return function(dispatch) {
    dispatch(getCampaigns(input))
    dispatch({ type: 'GET_ORGANIZATION_ID', payload: input })
  }
}

export const getRevenueClassCode = (input) => {
  return { type: 'GET_REVENUE_CLASS_CODE', payload: input }
}

export function getOrganizations() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/territory/organizations`)
      .then((response) => {
        dispatch({ type: 'GET_ORGANIZATIONS', payload: response.data.data })
      })
      .catch((error) => {
        throw error
      })
  }
}

export function getCampaigns(input) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/territory/campaigns?organization_id=${input}`)
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGNS', payload: response.data.data })
      })
      .catch((error) => {
        throw error
      })
  }
}

export function uploadZipList() {
  return function(dispatch, getState) {
    const { zipCodes, listName, organizationId, revenueClassCode, campaignId } = getState().territory
    dispatch({ type: 'CREATE_LIST', payload: 'LOADING' })
    axios.post(`${process.env.REACT_APP_GARCON_API}/territory/lists/zip`, {
      zip_codes: zipCodes.trim().split(/\s*,\s*/),
      list_name: listName,
      organization_id: organizationId,
      revenue_class_code: revenueClassCode,
      campaign_id: campaignId,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'CREATE_LIST', payload: 'SUCCESS' })
        } else {
          dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        }
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        throw error
      })
  }
}

export function uploadCsvList() {
  return function(dispatch, getState) {
    const { zipCodes, listName, revenueClassCode } = getState().territory
    dispatch({ type: 'CREATE_LIST', payload: 'LOADING' })
    axios.post(`${process.env.REACT_APP_GARCON_API}/territory/csv/zip`, {
      zip_codes: zipCodes.trim().split(/\s*,\s*/),
      list_name: listName,
      revenue_class_code: revenueClassCode,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'CREATE_LIST', payload: 'SUCCESS' })
        } else {
          dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        }
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        throw error
      })
  }
}

export function getCount() {
  return function(dispatch, getState) {
    const { tracts } = getState().territory
    axios.get(`${process.env.REACT_APP_GARCON_API}/territory/count?tracts=${tracts}`)
      .then((response) => {
        dispatch({ type: 'GET_COUNT', payload: response.data })
      })
      .catch((error) => {
        throw error
      })
  }
}

export function uploadTractList() {
  return function(dispatch, getState) {
    const { tracts, listName, organizationId } = getState().territory
    dispatch({ type: 'CREATE_LIST', payload: 'LOADING' })
    axios.post(`${process.env.REACT_APP_GARCON_API}/territory/lists`, {
      tracts,
      list_name: listName,
      organization_id: organizationId,
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'CREATE_LIST', payload: 'SUCCESS' })
        } else {
          dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        }
      })
      .catch((error) => {
        dispatch({ type: 'CREATE_LIST', payload: 'FAIL' })
        throw error
      })
  }
}
