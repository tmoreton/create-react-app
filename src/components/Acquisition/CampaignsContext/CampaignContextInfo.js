import React from 'react'
import { Link } from 'react-router-dom'

const CampaignContextInfo = ({ campaign }) => {
  return (
    <div className="mb-3">
      <Link className="text-primary" to={`/campaigns/${campaign.campaign_id}`}>
        <h6 className="text-primary">{campaign.campaign_name}</h6>
      </Link>
      <div>Preference sequence: {campaign.preference_sequence || 'None'}</div>
    </div>
  )
}

export default CampaignContextInfo
