import React from 'react'
import CampaignContextInfo from './CampaignContextInfo'

const CampaignContext = ({ loading, campaign }) => {

  const renderCampaign = () => {
    if (!campaign.campaign_id) {
      return <div>No campaign found for context</div>
    }
    return <CampaignContextInfo campaign={campaign} />
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>Campaign</strong>
      </div>
      <div className="card-body">
        {loading ? (<div>Loading Campaign...</div>) : (renderCampaign())}
      </div>
    </div>
  )
}

export default CampaignContext
