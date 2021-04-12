import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const DeactivatePlans = ({
  deactivating,
  viewDeactivatingAllPlans,
  plans,
  confirmDeactivate,
  planCodeBeingDeactivated,
}) => {

  if (deactivating) return <h5 className="text-danger">Checking for ability to deactivate plans...</h5>

  const errors = (plan) => {
    return plan.errors ? plan.errors : []
  }
  const warnings = (plan) => {
    return plan.warnings ? plan.warnings : []
  }
  const hasErrors = (plan) => {
    return errors(plan).length > 0
  }

  const deactivateText = (plan) => {
    if (planCodeBeingDeactivated === plan.plan_code) return 'Deactivating...'
    if (hasErrors(plan)) return 'Cannot Deactivate. Please resolve errors.'
    if (plan.is_active) return 'Deactivate'
    return 'Inactive'
  }

  return (
    viewDeactivatingAllPlans && (
      plans.map((plan, planI) => (
        <div key={`deactivating-plan-${plan.plan_code}}`} className={'row align-items-center p-2' + (planI % 2 === 0 ? ' bg-muted' : ' bg-white')}>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <h4 className="mb-0">{plan.plan_name}</h4>
              <Link className="text-primary" target="_blank" to={`/plans/${plan.plan_code}`}>
                <FontAwesomeIcon className="feather" icon={faEdit} size="2x" />
              </Link>
            </div>
            <div className="mb-3">
              <small className="text-muted">{plan.plan_code}</small>
            </div>
            {plan.is_active && (
              <div>
                <div className="mb-2">
                  <h5 className="text-danger">Errors:</h5>
                  {errors(plan).map((error, i) => (
                    <div key={`error-${i}`}>{error}</div>
                  ))}
                </div>
                <div>
                  <h5 className="text-warning">Warnings:</h5>
                  {warnings(plan).map((warning, i) => (
                    <div key={`warning-${i}`}>{warning}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="col-6">
            <a
              className="text-danger"
              disabled={hasErrors(plan)}
              onClick={() => confirmDeactivate(plan.plan_code)}>
              {deactivateText(plan)}
            </a>
          </div>
        </div>
      ))
    )
  )
}

export default DeactivatePlans
