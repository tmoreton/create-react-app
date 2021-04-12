import axios from 'axios'

export const getDashboard = (agents, fromDate, toDate) => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/sales/dashboard/agent/${agents}?from_dt=${fromDate}&to_dt=${toDate}`)
      dispatch({ type: 'GET_DASHBOARD', payload: response.data })
      const arr = []
      response.data.reverse().forEach(x => {
        const index = arr.findIndex(y => y.order_dt === x.order_dt)
        if (index >= 0){
          arr[index] = { order_dt: arr[index].order_dt, count: arr[index].count += 1 }
        } else {
          arr.push({ order_dt: x.order_dt, count: 1 })
        }
      })
      dispatch({ type: 'GET_GRAPH', payload: arr.reverse() })
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'Error getting agent dashboard orders' })
      throw error
    }
  }
}
