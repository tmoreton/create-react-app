import React from 'react'

const LowerPriorityCampaignsContext = ({ loadingCampaigns, campaigns }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>Lower Priority Campaigns</strong>
      </div>
      <div className="card-body">
        {loadingCampaigns ? (<div>Loading Campaigns...</div>) : (campaigns)}
      </div>
    </div>
  )
}

export default LowerPriorityCampaignsContext
