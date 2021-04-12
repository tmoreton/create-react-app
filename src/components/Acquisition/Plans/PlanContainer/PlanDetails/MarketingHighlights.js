import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MarketingHighlights = ({
  readonly,
  plan,
  onUpdatePlan,
}) => {

  const onUpdateMarketingHighlight = (index, value) => {
    const marketingHighlights = plan.marketing_highlights.map((highlight, i) => {
      if (index === i) highlight = value
      return highlight
    })
    onUpdatePlan('marketing_highlights', marketingHighlights)
  }

  const addHighlight = () => {
    if (!plan.marketing_highlights) {
      onUpdatePlan('marketing_highlights', ['100% Clean Energy'])
    } else {
      onUpdatePlan('marketing_highlights', [...plan.marketing_highlights, ''])
    }
  }

  const removeHighlight = (i) => {
    const marketingHighlights = plan.marketing_highlights
    marketingHighlights.splice(i, 1)
    onUpdatePlan('marketing_highlights', marketingHighlights)
  }

  return (
    <div>
      <div className="row form-group">
        <div className="col-4 text-right">
          <label className="font-weight-bold mr-2">
            Marketing Highlights {!plan.plan_code && '*'}
          </label>
        </div>
        <div className="col">
          {plan.marketing_highlights && plan.marketing_highlights.map((highlight, i) => (
            <div key={`highlight-${i}`} className="row mb-1">
              <div className="col-10">
                <input
                  className={`form-control form-control-sm ${readonly && 'text-muted bg-muted'}`}
                  readOnly={readonly}
                  type="textarea"
                  value={highlight}
                  onChange={(event) => onUpdateMarketingHighlight(i, event.target.value)}
                />
              </div>
              <div className="col">
                {!readonly && (
                  <a onClick={() => removeHighlight(i)}>
                    <FontAwesomeIcon className="feather" icon="trash" size="2x" />
                  </a>
                )}
              </div>
            </div>
          ))}
          {!readonly && ( <button className="badge p-1" onClick={addHighlight}>Add Highlight</button> ) }
        </div>
      </div>
    </div>
  )
}

export default MarketingHighlights
