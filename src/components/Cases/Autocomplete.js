import React from 'react'
import { useSelector } from 'react-redux'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'

const Item = ({ entity: { name }, selected }) => {
  if (selected){
    return (
      <div className="autocomplete-select" style={{ backgroundColor: '#F5F5F5' }}>
        <b>@{name}</b>
      </div>
    )
  }
  return (
    <div className="autocomplete-select">
      <b>@{name}</b>
    </div>
  )
}

export default ({ value, onChange }) => {
  const users = useSelector(state => state.users.all)
  return (
    <ReactTextareaAutocomplete
      className="form-control mb-2 w-100"
      listStyle={{ 
        listStyleType: 'none',
        padding: 0,
      }}
      loadingComponent={() => <span>Loading</span>}
      placeholder="@slackUsername to ping teammate..."
      ref={(rta) => { this.rta = rta } }
      trigger={{
        '@': {
          dataProvider: token => {
            return users.filter(u => {
              if (u.slack_username && u.slack_username.includes(token)){
                return true
              }
              return false
            }).map(user => { 
              return { name: user.slack_username }
            })
          },
          component: Item,
          output: (item, trigger) => `${trigger}${item.name}`,
        },
      }}
      value={value}
      onChange={e => onChange(e)}
    />
  )
}
