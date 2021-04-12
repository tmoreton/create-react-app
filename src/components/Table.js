import React, { Component } from 'react'
import ReactTable from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
const CheckboxTable = checkboxHOC(ReactTable)
const INSPIRE_PINK = '#E6168B'

class Table extends Component {
  constructor(props) {
    super(props)
    this.toggleSelection = this.toggleSelection.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.handleRowSelect = this.props.handleRowSelect.bind(this)
    this.state = {
      selection: [],
      selectAll: false,
    }
  }

  toggleSelection(key) {
    let selection = [...this.state.selection]
    const keyIndex = selection.indexOf(key)
    if (keyIndex >= 0) {
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1),
      ]
    } else {
      selection.push(key)
    }
    this.props.handleToggleSelection(selection)
    this.setState({ selection })
  }

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true
    const selection = []
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance()
      const currentRecords = wrappedInstance.getResolvedState().sortedData
      currentRecords.forEach(item => {
        selection.push(item._original[this.props.keyField])
      })
    }
    this.props.handleToggleSelection(selection)
    this.setState({ selectAll, selection })
  }

  isSelected(key) {
    return this.state.selection.includes(key)
  }

  render() {
    const checkboxProps = {
      selectAll: this.state.selectAll,
      isSelected: this.isSelected,
      toggleSelection: this.toggleSelection,
      toggleAll: this.toggleAll,
      selectType: 'checkbox',
      getTdProps: (s,r,c) => {
        if (c.id !== '_selector') {
          return {
            onClick: () => this.props.handleRowSelect(r.original),
            style: {
              cursor: 'pointer',
            },
          }
        } else {
          return {}
        }
      },
      getTrProps: (s, r) => {
        if (r === undefined) {
          return {
            style: {
              backgroundColor: 'inherit',
            },
          }
        }
        const selected = this.isSelected(r.original[this.props.keyField])
        return {
          style: {
            backgroundColor: selected ? INSPIRE_PINK : 'inherit',
            color: selected ? 'white' : 'inherit',
            opacity: selected ? 0.5 : 'inherit',
          },
        }
      },
    }

    return (
      <div>
        <CheckboxTable
          filterable
          className="-striped -highlight"
          columns={this.props.columns}
          data={this.props.data}
          defaultPageSize={25}
          keyField={this.props.keyField}
          ref={r => (this.checkboxTable = r)}
          style={{ height: '500px' }}
          {...checkboxProps}
        />
      </div>
    )
  }
}

export default Table
