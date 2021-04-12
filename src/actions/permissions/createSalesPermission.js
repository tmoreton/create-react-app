import axios from 'axios'
import checkData from '../../utils/checkData'

export const createSalesPermission = (input) => {
  return async(dispatch, getState) => {
    try {
      const userId = getState().user.userId
      const params = {
        tpv_delay: input.tpv_delay,
        loa_required: input.loa_required,
        description: input.description,
        partial_enrollment_enabled: input.partial_enrollment_enabled,
        source_codes: checkData(input.source_codes, 'source_code'),
        channel_codes: checkData(input.channel_codes, 'channel_code'),
        state_codes: checkData(input.state_codes, 'state_code'),
        tpv_vendors: checkData(input.vendor_tpv_type_ids, 'vendor_tpv_type_ids'),
        office_codes: checkData(input.office_codes, 'office_code'),
        active: input.active,
        updated_by_user_id: userId,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/sales/permissions`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating sales permission.' })
      throw error
    }
  }
}
