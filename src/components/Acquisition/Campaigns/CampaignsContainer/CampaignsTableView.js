import React from 'react'
import ReactTable from 'react-table'

export default ({ data, columns, onSelect }) => (<ReactTable
  filterable
  className="-striped -highlight mb-3"
  columns={columns}
  data={data}
  defaultPageSize={100}
  getTdProps={(s,r,c) => {
    if (c.id !== '_selector') {
      return {
        onClick: () => onSelect(r.original),
        style: {
          cursor: 'pointer',
        },
      }
    } else {
      return {}
    }
  }}
  keyField="campaign_id"
  style={{ height: '500px' }}
/>)


