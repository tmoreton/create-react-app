import sortBy from 'lodash/sortBy'

export default (campaign) => {
  const plans = campaign.campaign_plans_attributes
  campaign.campaign_plans_attributes = sortBy(plans, ['display_sequence'])
  return campaign
}
