import React from 'react'
import PlanPromos from './PlanPromos'
import PlanLoyaltyPrograms from './PlanLoyaltyPrograms'

const PlanRewards = ({ readonly, plan, onUpdateAttributes }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <strong>Rewards</strong>
      </div>
      <div className="card-body">
        <PlanPromos
          plan={plan}
          readonly={readonly}
          onUpdatePromos={onUpdateAttributes}
        />
        <PlanLoyaltyPrograms
          plan={plan}
          readonly={readonly}
          onUpdateLoyaltyPrograms={onUpdateAttributes}
        />
      </div>
    </div>
  )
}

export default PlanRewards
