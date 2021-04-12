import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'
import getContractTypes from '../../../../actions/plans/getContractTypes'
import getContractDurations from '../../../../actions/plans/getContractDurations'
import getEarlyCancellationFees from '../../../../actions/plans/getEarlyCancellationFees'
import PromosSelect from '../Shared/PromosSelect'
import LoyaltyProgramsSelect from '../Shared/LoyaltyProgramsSelect'
import SectionInput from '../../../Shared/SectionInput'
import SectionSelect from '../../../Shared/SectionSelect'

const PlansSearch = ({
  searchQuery,
  attributes,
  onUpdateSearchQuery,
  onUpdateAttributes,
  onSearchPlans,
}) => {
  const dispatch = useDispatch()
  let contractTypes = useSelector(state => state.planFeatures.contractTypes)
  let contractDurations = useSelector(state => state.planFeatures.contractDurations)
  let earlyCancellationFees = useSelector(state => state.planFeatures.earlyCancellationFees)

  useEffect(() => {
    dispatch(getContractTypes())
    dispatch(getContractDurations())
    dispatch(getEarlyCancellationFees())
  }, [])

  contractTypes = contractTypes.map(contractType => {
    return {
      label: contractType.contract_type_name,
      value: contractType.contract_type_code,
    }
  })

  const parseDuration = (duration) => parseInt(duration.contract_duration.match(/\d+/)[0], 10)
  contractDurations = sortBy(contractDurations, parseDuration).map(contractDuration => {
    return {
      label: contractDuration.contract_duration_name,
      value: contractDuration.contract_duration,
    }
  })

  earlyCancellationFees = earlyCancellationFees.map(earlyCancellationFee => {
    return {
      label: earlyCancellationFee.early_cancellation_fee_desc,
      value: earlyCancellationFee.early_cancellation_fee_code,
    }
  })

  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Search Plans</strong>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <SectionInput label="Plan Name/Code" type="text" value={searchQuery} onChange={onUpdateSearchQuery} />
            <SectionSelect
              multi
              label="Structure"
              labelKey="label"
              options={contractTypes}
              value={attributes.contract_type_code}
              valueKey="value"
              onChange={(value) => onUpdateAttributes('contract_type_code', value)}
            />
            <SectionSelect
              multi
              label="Term Length"
              labelKey="label"
              options={contractDurations}
              value={attributes.contract_duration}
              valueKey="value"
              onChange={(value) => onUpdateAttributes('contract_duration', value)}
            />
            <SectionSelect
              multi
              label="Early Cancellation Fee"
              labelKey="label"
              options={earlyCancellationFees}
              value={attributes.early_cancellation_fee_code}
              valueKey="value"
              onChange={(value) => onUpdateAttributes('early_cancellation_fee_code', value)}
            />
            <div className="row form-group align-items-center">
              <div className="col-4 text-right">
                <label className="font-weight-bold mr-2 mb-0">
                  PTC Indexed?
                </label>
              </div>
              <div className="col">
                <input
                  checked={!!attributes.is_ptc_indexed}
                  type="checkbox"
                  onChange={(event) => onUpdateAttributes('is_ptc_indexed', event.target.checked)}
                />
              </div>
            </div>
            <PromosSelect
              value={attributes.promos}
              onUpdatePromos={(value) => onUpdateAttributes('promos', value)}
            />
            <LoyaltyProgramsSelect
              value={attributes.loyalty_programs}
              onUpdateLoyaltyPrograms={(value) => onUpdateAttributes('loyalty_programs', value)}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={onSearchPlans}>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlansSearch
