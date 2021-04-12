import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getChannelPartners } from  '../../actions/channels/getChannelPartners'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import history from '../../history'

class ChannelPartnersTable extends Component {
  componentDidMount = () => {
    this.props.getChannelPartners()
  }

  goToUpdate = (input) => {
    history.push('/channelpartners/update', {
      edit: input,
    })
  }

  render() {
    const columns = [{
      Header: 'Partner Code',
      accessor: 'channelPartnerCode',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['channelPartnerCode'] })
      ),
      filterAll: true,
    }, {
      Header: 'Tracking ID',
      accessor: 'trackingCode',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['trackingCode'] })
      ),
      filterAll: true,
    }, {
      Header: 'Partner Name',
      accessor: 'channelPartnerName',
      filterMethod: (filter, rows) => (
        matchSorter(rows, filter.value, { keys: ['channelPartnerName'] })
      ),
      filterAll: true,
    }, {
      Header: 'Update Channel Partner',
      accessor: 'edit',
      width: 175,
      Cell: row => (
        <div className="row justify-content-md-center">
          <button className="btn btn-primary btn-md mr-2" onClick={() => this.goToUpdate(row.original)}>Edit</button>
        </div>
      ),
    },
    ]

    return (
      <div className="office-table col-md-10 mx-auto">
        <ReactTable 
          filterable 
          className="-striped -highlight mb-3" 
          columns={columns} 
          data={this.props.channelPartners} 
          defaultPageSize={10} 
          getTdProps={(c, r) => {
            if (c.id !== '_selector') {
              return {
                onClick: () => this.goToUpdate(r.original),
                style: {
                  cursor: 'pointer',
                },
              }
            } else {
              return {}
            }
          }}
          keyField="channel_partner_code" 
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelPartners: state.channelPartners,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChannelPartners }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ChannelPartnersTable)
