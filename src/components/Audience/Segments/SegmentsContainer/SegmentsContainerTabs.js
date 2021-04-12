import React from 'react'
import NavTabs from '../../../Shared/NavTabs'

export default ({ tab, onChangeTab }) => {
  const tabs = [
    {
      key: 'active',
      label: 'Active',
    },
    {
      key: 'inactive',
      label: 'Inactive',
    },
  ]
  return <div className="mb-4"><NavTabs currentTab={tab} tabs={tabs} onChangeTab={onChangeTab} /></div>
}
