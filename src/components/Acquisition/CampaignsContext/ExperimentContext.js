import React from 'react'
import { Link } from 'react-router-dom'

const ExperimentContext = ({ loading, experiment, campaign }) => {

  const renderTest = (type, test) => {
    test = experiment[test]
    return (
      <div>
        <div className="mb-2">
          <strong><u>{type} Test</u></strong>
        </div>
        {test ? (
          <div>
            <Link to={`/campaigns/${campaign.campaign_id}?experiment_id=${test.experiment_id}#${test.experiment_id}`}>
              <h6 className="text-primary">{test.experiment_name}</h6>
            </Link>
            <div>
              Description: {test.experiment_description}
            </div>
          </div>
        ) : (
          <div>
            None
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        <strong>Experiment</strong>
      </div>
      <div className="card-body">
        {loading ? (<div>Loading Experiment...</div>) : (
          <div className="row">
            <div className="col-4 offset-2 mb-3">
              {renderTest('Plan', 'plan_test')}
            </div>
            <div className="col-4">
              {renderTest('Price', 'price_test')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperimentContext
