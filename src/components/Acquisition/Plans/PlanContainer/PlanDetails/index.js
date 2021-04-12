import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import startCase from 'lodash/startCase'
import isEmpty from 'lodash/isEmpty'
import inputOptions from '../../../../../utils/inputOptions'
import getContractTypes from '../../../../../actions/plans/getContractTypes'
import getContractDurations from '../../../../../actions/plans/getContractDurations'
import getEarlyCancellationFees from '../../../../../actions/plans/getEarlyCancellationFees'
import getDynamicPricingAlgorithms from '../../../../../actions/plans/getDynamicPricingAlgorithms'
import getSubRates from '../../../../../actions/plans/getSubRates'
import SectionInput from '../../../../Shared/SectionInput'
import SectionSelect from '../../../../Shared/SectionSelect'
import SectionCheckbox from '../../../../Shared/SectionCheckbox'
import MarketingHighlights from './MarketingHighlights'

const DEFAULT_ENERGY_PRODUCTS = [
  {
    label: '100% National Wind',
    value: '100_WIND_NATIONAL',
  },
  {
    label: '100% National Wind (REC Only)',
    value: '100_WIND_NATIONAL_REC',
  },
]

const PlanDetails = ({
  readonly,
  plan,
  onUpdatePlan,
  onClonePlan,
  onDeletePlan,
}) => {
  const dispatch = useDispatch()
  const contractTypes = useSelector(state => state.planFeatures.contractTypes)
  const contractDurations = useSelector(state => state.planFeatures.contractDurations)
  const earlyCancellationFees = useSelector(state => state.planFeatures.earlyCancellationFees)
  const subRates = useSelector(state => state.planFeatures.subRates)
  const pricingAlgorithms = useSelector(state => state.planFeatures.pricingAlgorithms)
  
  const planInputs = [
    {
      required: false,
      readonly: true,
      field: 'plan_code',
      type: 'text',
    },
    {
      required: true,
      readonly,
      field: 'plan_name',
      type: 'text',
    },
    {
      required: false,
      readonly,
      field: 'plan_description',
      type: 'textarea',
    },
  ]

  useEffect(() => {
    if (isEmpty(contractTypes)) dispatch(getContractTypes())
    if (isEmpty(contractDurations)) dispatch(getContractDurations())
    if (isEmpty(earlyCancellationFees)) dispatch(getEarlyCancellationFees())
    if (isEmpty(subRates)) dispatch(getSubRates())
    dispatch(getDynamicPricingAlgorithms())
  }, [])

  const contractTypeOptions = inputOptions({
    options: contractTypes,
    label: (contractType) => contractType.contract_type_name,
    value: 'contract_type_code',
  })
  const parseDuration = (duration) => parseInt(duration.contract_duration.match(/\d+/)[0], 10)
  const contractDurationOptions = inputOptions({
    options: contractDurations,
    label: (contractDuration) => contractDuration.contract_duration_name,
    value: 'contract_duration',
    sort: parseDuration,
  })

  const earlyCancellationFeeOptions = inputOptions({
    options: earlyCancellationFees,
    label: (earlyCancellationFee) => earlyCancellationFee.early_cancellation_fee_desc,
    value: 'early_cancellation_fee_code',
  })

  const minSubRateOptions = inputOptions({
    options: subRates,
    label: (minSubRate) => minSubRate.rate,
    value: 'rate',
  })

  const pricingAlgorithmOptions = inputOptions({
    options: pricingAlgorithms,
    label: (pricingAlgorithm) => pricingAlgorithm.algorithm_description,
    value: 'dynamic_pricing_algorithm_code',
  })

  const showRequired = (required) => {
    return !plan.plan_code && required
  }

  const renderDelete = () => {
    if (!plan.plan_code) {
      return <span className="text-danger font-weight-bold">Unsaved</span>
    } else if (!readonly && plan.is_active) {
      return (
        <a className="text-danger" onClick={onDeletePlan}>Deactivate</a>
      )
    } else if (!plan.is_active) {
      return <span className="text-danger font-weight-bold">Inactive</span>
    } else {
      return <a className="text-info mr-4" onClick={onClonePlan}>Clone</a>
    }
  }

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <strong>Plan Details</strong>
          {renderDelete()}
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-6 mr-1">
              <div className="mb-5">
                {planInputs.map(input => (
                  <SectionInput
                    key={input.field}
                    label={`${startCase(input.field)} ${showRequired(input.required) ? '*' : ''}`}
                    readonly={input.readonly || readonly}
                    type={input.type}
                    value={plan[input.field]}
                    onChange={!input.readonly ? (event) => onUpdatePlan(input.field, event.target.value) : null}
                  />
                ))}
                <MarketingHighlights
                  plan={plan}
                  readonly={readonly}
                  onUpdatePlan={onUpdatePlan}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <strong>Plan Features</strong>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <SectionSelect
                label={`Contract Type ${showRequired(true) && '*'}`}
                labelKey="label"
                options={contractTypeOptions}
                readonly={readonly}
                value={plan.contract_type_code}
                valueKey="value"
                onChange={(event) => onUpdatePlan('contract_type_code', event.target.value)}
              />
              <SectionSelect
                label={`Contract Duration ${showRequired(true) && '*'}`}
                labelKey="label"
                options={contractDurationOptions}
                readonly={readonly}
                value={plan.contract_duration}
                valueKey="value"
                onChange={(event) => onUpdatePlan('contract_duration', event.target.value)}
              />
              <SectionSelect
                label={'Early Cancellation Fee'}
                labelKey="label"
                options={earlyCancellationFeeOptions}
                readonly={readonly}
                value={plan.early_cancellation_fee_code}
                valueKey="value"
                onChange={(event) => onUpdatePlan('early_cancellation_fee_code', event.target.value)}
              />
              <SectionSelect
                label={'Minimum Subscription Rate'}
                labelKey="label"
                options={minSubRateOptions}
                readonly={plan.contract_type_code === undefined || plan.contract_type_code !== 'subscription' || readonly}
                value={plan.min_sub_rate}
                valueKey="value"
                onChange={(event) => onUpdatePlan('min_sub_rate', event.target.value)}
              />
              <SectionSelect
                label={`Energy Product ${showRequired(true) && '*'}`}
                labelKey="label"
                options={DEFAULT_ENERGY_PRODUCTS}
                readonly={readonly}
                value={plan.energy_product_code}
                valueKey="value"
                onChange={(event) => onUpdatePlan('energy_product_code', event.target.value)}
              />
              <SectionSelect
                label={'Dynamic Pricing Algorithm'}
                labelKey="label"
                options={pricingAlgorithmOptions}
                readonly={readonly}
                value={plan.dynamic_pricing_algorithm_code}
                valueKey="value"
                onChange={(event) => onUpdatePlan('dynamic_pricing_algorithm_code', event.target.value)}
              />
              <SectionCheckbox
                checked={plan.is_ptc_indexed}
                label="PTC Index Enabled"
                readonly={readonly}
                title="Is this plan indexed to the price to compare?"
                onChange={(event) => onUpdatePlan('is_ptc_indexed', event.target.checked)}
              />
              <SectionCheckbox
                checked={plan.payment_required}
                label="Payment Required"
                readonly={readonly}
                title="Do we need to collect a credit card to complete the sale."
                onChange={(event) => onUpdatePlan('payment_required', event.target.checked)}
              />
              <SectionCheckbox
                checked={plan.plan_promos && plan.plan_promos.some(promo => promo.requires_installation)}
                label="Schedule Required"
                readonly={true}
                title="If at least one promo has installation required, then the plan will have scheduling required."
                onChange={(event) => onUpdatePlan('payment_required', event.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanDetails
