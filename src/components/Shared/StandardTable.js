import React from 'react'
import ReactTable from 'react-table'

export default ({ data, onSelect = () => {}, columns, keyField, height = '500px' }) => (<ReactTable
  filterable
  className="-striped -highlight mb-3"
  columns={columns}
  data={data}
  defaultPageSize={100}
  getTdProps={(s,r,c) => {
    if (c.id !== '_selector' && r) {
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
  keyField={keyField}
  style={{ height }}
/>)


