import React from 'react'
import isEmpty from 'lodash/isEmpty'

const PlanErrors = ({
  deactivatingPlan,
  confirmDeactivate,
  errors,
  warnings,
  deactivatePlan,
  dismissConfirm,
}) => {

  if (deactivatingPlan) {
    return (
      <div className="text-center my-3">
        <h5 className="text-danger">Deactivating plan...</h5>
      </div>
    )
  }

  if (confirmDeactivate && !deactivatingPlan) {
    return (
      <div>
        {!isEmpty(errors) && (
          <div className="card mb-4">
            <div className="card-header bg-danger">
              <h5 className="text-white">Errors:</h5>
            </div>
            <div className="card-body">
              {errors.map((error, i) => (
                <div key={`error-${i}`}>{error}</div>
              ))}
            </div>
          </div>
        )}
        {!isEmpty(warnings) && (
          <div className="card mb-4">
            <div className="card-header bg-warning">
              <h5 className="text-white">Warnings:</h5>
            </div>
            <div className="card-body">
              {warnings.map((warning, i) => (
                <div key={`warning-${i}`}>{warning}</div>
              ))}
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center mb-2">
          {isEmpty(errors) ? 'Are you sure you want to deactivate plan?' : 'Please fix errors before deactivating plan.'}
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-danger mr-1" disabled={!isEmpty(errors)} onClick={deactivatePlan}>
            Confirm
          </button>
          <button className="btn btn-secondary" onClick={dismissConfirm}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default PlanErrors
