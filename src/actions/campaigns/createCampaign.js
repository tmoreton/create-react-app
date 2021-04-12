export default function createCampaign() {
  return function(dispatch) {
    const campaign = {
      campaign_experiments_attributes: [],
      campaign_segments_attributes: [],
      campaign_plans_attributes: [],
    }

    dispatch({ type: 'GET_CAMPAIGN', payload: campaign })
  }
}
