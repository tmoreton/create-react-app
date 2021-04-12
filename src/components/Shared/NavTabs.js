import React from 'react'

const NavTabs = ({ tabs, currentTab, onChangeTab }) => {
  return (
    <div className="d-flex justify-content-start">
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        {tabs.map(tab => (
          <label key={tab.key} className={`btn btn-primary ${currentTab === tab.key ? 'active' : ''}`}>
            <input autoComplete="off" id="option1" name="options" type="radio" onChange={() => onChangeTab(tab.key)} />
            {tab.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default NavTabs
