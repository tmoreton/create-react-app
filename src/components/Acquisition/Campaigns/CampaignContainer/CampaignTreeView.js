import React from 'react'

import { Tree } from 'antd'
import history from '../../../../history'

const { TreeNode } = Tree

const renderNode = (campaign, campaigns, isRoot = false) => {
  const children = Object.keys(campaigns)
    .filter(campaignId => campaigns[campaignId].parent_campaign_id === campaign.campaign_id)
    .map(campaignId => campaigns[campaignId])

  const childNodes = children.map(child => renderNode(child, campaigns))

  const title = isRoot
    ? 'Child Campaigns'
    : <a onClick={() => history.push(`/campaigns/${campaign.campaign_id}`)}>{campaign.campaign_name}</a>

  if (!childNodes.length && isRoot) {
    return null
  }
  const node = (<TreeNode title={title}>
    {childNodes}
  </TreeNode>)

  return node
}


export default ({ rootCampaign, campaigns }) => (<Tree>{renderNode(rootCampaign, campaigns, true)}</Tree>)

