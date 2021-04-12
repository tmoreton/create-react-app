import React from 'react'
import startCase from 'lodash/startCase'
import PromosSelect from '../../Shared/PromosSelect'
import SectionCheckbox from '../../../../Shared/SectionCheckbox'

const PlanPromos = ({
  readonly,
  plan,
  onUpdatePromos,
}) => {
  const getPlanPromos = () => {
    if (plan.plan_promos && plan.plan_promos.length > 0) {
      return plan.plan_promos
    } else {
      return []
    }
  }

  const planPromos = getPlanPromos()

  const updateRequiresInstallation = (promo, event) => {
    return plan.plan_promos.map(p => {
      if (p.promo_code === promo.promo_code) p.requires_installation = event.target.checked
      return p
    })
  }

  const renderPromos = () => {
    if (!readonly) {
      return (
        <div className="row">
          <div className="col-6">
            <PromosSelect
              value={planPromos}
              onUpdatePromos={(value) => onUpdatePromos('plan_promos', value)}
            />
          </div>
          <div className="col-6">
            {planPromos.map(promo => (
              <SectionCheckbox
                key={`requires-installation-${promo.promo_code}`}
                checked={promo.requires_installation}
                label={`Does ${promo.promo_desc} require installation?`}
                onChange={(event) => onUpdatePromos('plan_promos', updateRequiresInstallation(promo, event))}
              />
            ))}
          </div>
        </div>
      )
    }

    if (planPromos.length === 0) return <p>None</p>

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(planPromos[0]).map(key => (
              <td key={`${key}-header`} className="font-weight-bold">{startCase(key)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {planPromos.map(promo => (
            <tr key={`${promo.promo_code}`}>
              {Object.keys(planPromos[0]).map(key => (
                <td key={`${promo.promo_code}-${key}`}>{promo[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="mb-4">
      <div className="mb-2">
        <h5 className="mb-0">Promos</h5>
        <small>Promos attached to this plan</small>
      </div>
      {renderPromos()}
    </div>
  )
}

export default PlanPromos
