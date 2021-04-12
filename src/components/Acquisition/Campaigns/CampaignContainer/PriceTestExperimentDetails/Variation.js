import React from 'react'
import percentAllocationOptions from '../../../../../utils/percentAllocationOptions'
import SectionInput from '../../../../Shared/SectionInput'
import SectionSelect from '../../../../Shared/SectionSelect'

const Variation = ({ control, index, writeAccess, variation, distributeEvenly, onUpdateVariation, onDeleteVariation }) => {

  const notValidMarginAdjuster = isNaN(parseFloat(variation.config.margin_adjuster))

  const marginAdjuster = (margin) => {
    return parseFloat(margin) * 100.0
  }

  const marginAdjusterText = (margin) => {
    const sum = marginAdjuster(margin) + 3
    let string = '3 '
    string += marginAdjuster(margin) >= 0 ? '+ ' : '- '
    string += `${Math.abs(marginAdjuster(margin))} = `
    string += `${sum} cents`
    return string
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-4">
          <SectionInput
            label="Name"
            readonly={!writeAccess}
            type="text"
            value={variation.variation_name || ''}
            onChange={(event) => onUpdateVariation(variation, 'variation_name', event.target.value)}
          />
          {(distributeEvenly) ? (
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
              onChange={(event) => onUpdateVariation(variation, 'percent_allocation', event.target.value)}
            />
          )}
        </div>
        {control ? (
          <div className="col-8">
            <div className="row">
              <div className="col">
                <SectionInput
                  readonly
                  label="Margin Adjustment"
                  type="text"
                  value={variation.config.margin_adjuster.toString() || ''}
                  onChange={(event) => onUpdateVariation(variation, 'config', { margin_adjuster: event.target.value })}
                />
              </div>
              <div className="col-4">
                0 cents
              </div>
            </div>
          </div>
        ) : (
          <div className="col-8">
            <div className="row">
              <div className="col">
                <SectionInput
                  label="Margin Adjustment"
                  readonly={!writeAccess}
                  type="text"
                  value={variation.config.margin_adjuster || ''}
                  onChange={(event) => onUpdateVariation(variation, 'config', { margin_adjuster: event.target.value })}
                />
              </div>
              <div className="col-4">
                {notValidMarginAdjuster ? (
                  <span className="text-danger">Please enter a valid adjuster</span>
                ) : (
                  <div>
                    <div>{marginAdjusterText(variation.config.margin_adjuster)}</div>
                    <div className="font-size-10">*There&apos;s a 3 cent default adder</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-4 text-right">
          {(writeAccess && !control) && (<a className="text-primary" onClick={() => onDeleteVariation(index)}>Delete Variation</a>)}
        </div>
      </div>
    </li>
  )
}

export default Variation
