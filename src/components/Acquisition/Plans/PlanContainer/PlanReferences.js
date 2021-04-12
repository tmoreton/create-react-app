import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'

const PlanReferences= ({ plan }) => {

  const renderOfferKey = (offer, key) => {
    if (key === 'offered_dt') {
      return <td key={`${offer.prospect_address_offer_id}-${key}`}>{moment(offer[key]).format('YYYY-MM-DD')}</td>
    } else if (key === 'campaign_id') {
      return (<td key={`${offer.prospect_address_offer_id}-${key}`}>
        <Link className="text-primary" to={`/campaigns/${offer[key]}`}>
          {offer[key]}
        </Link>
      </td>)
    } else {
      return <td key={`${offer.prospect_address_offer_id}-${key}`}>{offer[key]}</td>
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <strong>Uses</strong>
      </div>
      <div className="card-body">
        <div>
          <div className="row mb-4">
            <div className="col-4">
              <div>
                <h5>Campaigns</h5>
                {isEmpty(plan.campaigns) ? (
                  <p>None</p>
                ) : (
                  plan.campaigns.map(campaign => (
                    <div key={campaign.campaign_id}>
                      <Link className="text-primary" to={`/campaigns/${campaign.campaign_id}`}>{campaign.campaign_name}</Link>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="col-8">
              <div>
                <h5>Offers</h5>
                {isEmpty(plan.recent_offers) ? (
                  <p>No offers have been generated for this plan</p>
                ) : (
                  <div>
                    <p>The last {plan.recent_offers.length} offers generated for this plan</p>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          {Object.keys(plan.recent_offers[0]).map(key => (
                            <td key={`${key}-header`} className="font-weight-bold">{startCase(key)}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {plan.recent_offers.map(offer => (
                          <tr key={`${offer.prospect_address_offer_id}`}>
                            {Object.keys(plan.recent_offers[0]).map(key => (
                              renderOfferKey(offer, key)
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanReferences
