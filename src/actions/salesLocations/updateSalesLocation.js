/* global alert: false */
import axios from 'axios'

export default (input) => {
  return async(dispatch) => {
    try {
      const offices = input.offices.length > 0 && Object.prototype.hasOwnProperty.call(input.offices[0], 'office_code') ? input.offices.map(office => office.office_code) : input.offices
      const sources = input.sources.length > 0 && Object.prototype.hasOwnProperty.call(input.sources[0], 'source_code') ? input.sources.map(source => source.source_code) : input.sources

      const params = {
        'sales_location_code': input.sales_location_code,
        'location_code': input.location_code,
        'from_date': input.from_date,
        'to_date': input.to_date,
        'workable_hours': input.workable_hours,
        sources,
        offices,
      }
      const response = await axios.post(`${process.env.REACT_APP_GARCON_API}/offers/locations/sales_locations/${input.sales_location_code}`,params)
      if (response.status === 200){
        alert('Updated Sales Event')
        window.location.href = '/events'
      }
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating Location.' })
      throw error
    }
  }
}
