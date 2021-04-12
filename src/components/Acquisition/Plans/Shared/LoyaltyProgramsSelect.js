import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'
import getLoyaltyPrograms from '../../../../actions/plans/getLoyaltyPrograms'
import SectionSelect from '../../../Shared/SectionSelect'

const LoyaltyProgramsSelect = ({
  value,
  onUpdateLoyaltyPrograms,
}) => {
  const dispatch = useDispatch()
  let loyaltyPrograms = useSelector(state => state.planFeatures.loyaltyPrograms)

  useEffect(() => {
    dispatch(getLoyaltyPrograms())
  }, [])

  loyaltyPrograms = sortBy(loyaltyPrograms, loyaltyProgram => loyaltyProgram.loyalty_program_desc)

  return (
    <SectionSelect
      multi
      label="Loyalty Programs"
      labelKey="loyalty_program_desc"
      options={loyaltyPrograms}
      value={value.map(v => v.loyalty_program_code)}
      valueKey="loyalty_program_code"
      onChange={onUpdateLoyaltyPrograms}
    />
  )
}

export default LoyaltyProgramsSelect

LoyaltyProgramsSelect.defaultProps = {
  value: [],
}
