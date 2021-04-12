import React from 'react'
import startCase from 'lodash/startCase'
import LoyaltyProgramsSelect from '../../Shared/LoyaltyProgramsSelect'

const PlanLoyaltyPrograms = ({
  readonly,
  plan,
  onUpdateLoyaltyPrograms,
}) => {
  const getPlanLoyaltyPrograms = () => {
    if (plan.plan_loyalty_programs && plan.plan_loyalty_programs.length > 0) {
      return plan.plan_loyalty_programs
    } else {
      return []
    }
  }

  const planLoyaltyPrograms = getPlanLoyaltyPrograms()

  const renderLoyaltyPrograms = () => {
    if (!readonly) {
      return (
        <div className="row">
          <div className="col-6">
            <LoyaltyProgramsSelect
              value={planLoyaltyPrograms}
              onUpdateLoyaltyPrograms={(value) => onUpdateLoyaltyPrograms('plan_loyalty_programs', value)}
            />
          </div>
        </div>
      )
    }

    if (planLoyaltyPrograms.length === 0) return <p>None</p>

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(planLoyaltyPrograms[0]).map(key => (
              <td key={`${key}-header`} className="font-weight-bold">{startCase(key)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {planLoyaltyPrograms.map(loyaltyProgram => (
            <tr key={`${loyaltyProgram.loyalty_program_code}`}>
              {Object.keys(planLoyaltyPrograms[0]).map(key => (
                <td key={`${loyaltyProgram.loyalty_program_code}-${key}`}>{loyaltyProgram[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <div className="mb-2">
        <h5 className="mb-0">Loyalty Programs</h5>
        <small>Loyalty programs attached to this plan</small>
      </div>
      {renderLoyaltyPrograms()}
    </div>
  )
}

export default PlanLoyaltyPrograms
