const campaignWriteAccessRoles = ['Admin', 'CampaignEditor']
const campaignReadAccessRoles = ['CampaignViewer', ...campaignWriteAccessRoles]

export const EXPERIMENTS = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const SEGMENTS = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const CAMPAIGNS = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const CAMPAIGNS_CONTEXT = {
  READ: ['SalesManager', 'SalesQA', 'Operations', ...campaignReadAccessRoles],
  WRITE: campaignWriteAccessRoles,
}

export const STATIC_MARKET_RATES = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const MARGIN_ADJUSTMENTS = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const PLANS = {
  READ: campaignReadAccessRoles,
  WRITE: campaignWriteAccessRoles,
}

export const INSTALLATION_TERRITORIES = {
  READ: ['Admin', 'SupplyChainViewer'],
}

export const REWARDS = {
  READ: ['Admin', 'Marketing', 'Regulatory'],
}
