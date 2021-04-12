import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'
import getPromos from '../../../../actions/plans/getPromos'
import SectionSelect from '../../../Shared/SectionSelect'

const PromosSelect = ({
  value,
  onUpdatePromos,
}) => {
  const dispatch = useDispatch()
  let promos = useSelector(state => state.planFeatures.promos)

  useEffect(() => {
    dispatch(getPromos())
  }, [])

  promos = sortBy(promos, promo => promo.promo_desc)

  return (
    <SectionSelect
      multi
      label="Promos"
      labelKey="promo_desc"
      options={promos}
      value={value.map(v => v.promo_code)}
      valueKey="promo_code"
      onChange={onUpdatePromos}
    />
  )
}

export default PromosSelect

PromosSelect.defaultProps = {
  value: [],
}
