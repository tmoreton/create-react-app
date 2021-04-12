import React from 'react'
import SectionInput from '../../../../Shared/SectionInput'
import SectionSelect from '../../../../Shared/SectionSelect'
import percentAllocationOptions from '../../../../../utils/percentAllocationOptions'

const Variation = ({ control, variation, distributeEvenly, writeAccess, onUpdateVariation }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h5>{control ? 'Control' : 'Variation'}</h5>
      </div>
      <div className="col-4">
        <SectionInput
          label="Name"
          readonly={!writeAccess}
          type="text"
          value={variation.variation_name}
          onChange={(event) => onUpdateVariation('variation_name', event.target.value)}
        />
        {distributeEvenly ? (
          <div className="row form-group mb-1">
            <div className="col text-right">
              <label className="font-weight-bold mr-2">
                Traffic Distribution
              </label>
            </div>
            <div className="col">
              Distributed Evenly
            </div>
          </div>
        ) : (
          <SectionSelect
            label="Traffic Distribution"
            labelKey="label"
            options={percentAllocationOptions}
            readonly={!writeAccess}
            value={variation.percent_allocation}
            valueKey="value"
            onChange={(event) => onUpdateVariation('percent_allocation', event.target.value)}
          />
        )}
      </div>
      <div className="col-8 row form-group">
        <div className="col-6 text-right">
          <label className="font-weight-bold mr-2">
            Feature {variation.config.feature_enabled ? 'Enabled' : 'Disabled'}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Variation
