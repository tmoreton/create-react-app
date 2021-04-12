import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getPlans({ searchQuery = null, activeOnly = null, attributes = {} }) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_PLANS', payload: true })

    const params = {}
    if (searchQuery) params.search_query = searchQuery
    if (activeOnly !== null) params.active_only = activeOnly
    params.attributes = attributes

    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/plans/all`, { params })
      .then((response) => {
        const payload = mapKeys(response.data, (plan) => plan.plan_code)
        dispatch({ type: 'GET_PLANS', payload })
        dispatch({ type: 'GETTING_PLANS', payload: false })
      }).catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting plans.' })
        throw error
      })
  }
}
