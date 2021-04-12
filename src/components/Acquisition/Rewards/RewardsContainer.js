import React from 'react'
import getPromos from '../../../actions/plans/getPromos'
import getLoyaltyPrograms from '../../../actions/plans/getLoyaltyPrograms'
import history from '../../../history'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { changeModule } from '../../../actions/changeModule'
import isEmpty from 'lodash/isEmpty'

class RewardsContainer extends React.Component {

  componentDidMount() {
    this.props.changeModule('Rewards')
    this.props.getLoyaltyPrograms()
    this.props.getPromos()
  }

  rewards() {
    return this.props.loyalty_programs.concat(this.props.promos)
  }

  tableColumns() {
    const columns = [{
      Header: 'Name',
      id: 'Name',
      accessor: properties => properties.promo_name || properties.loyalty_program_name,
    }, {
      Header: 'Code',
      id: 'Code',
      accessor: properties => properties.promo_code || properties.loyalty_program_code,
    }, {
      Header: 'Description',
      id: 'Description',
      accessor: properties => properties.promo_desc || properties.loyalty_program_desc,
    },
    {
      Header: 'Terms Description Present',
      id: 'DescriptionPresent',
      accessor: properties => {
        if (!isEmpty(properties.promo_terms_desc)|| !isEmpty(properties.loyalty_program_terms_desc)) return 'Yes'
        return 'No'
      } },
    {
      Header: 'Redemption Required',
      id: 'RedemptionRequired',
      accessor: d => { return d.redemption_required ? 'Yes' : 'No' },
    }, {
      Header: 'Type',
      id: 'Type',
      accessor: d => { return d.loyalty_program_name ? 'Loyalty Program' : 'Promo'},
    }, {
      Header: 'Last Sold Date',
      id: 'LastSoldDate',
      accessor: 'last_sold_dt',
    }, {
      Header: 'Measure',
      id: 'Measure',
      accessor: props => props.promo_measure || props.loyalty_program_measure,
    },
    {
      Header: 'Fulfillment Vendor Code',
      id: 'FullfillmentVendorCode',
      accessor: 'fulfillment_vendor_code',
    },
    {
      Header: 'Updated at',
      id: 'UpdatedAt',
      accessor: props => {
        if (props.history){
          return new Date(props.history.updated_at).toLocaleString('en-US')
        }
      },
    },
    {
      Header: 'Updated by',
      id: 'UpdatedBy',
      accessor: props => { if (props.updated_by_user) return props.updated_by_user.first_name + ' ' + props.updated_by_user.last_name },
    },
    {
      Header: 'Edit',
      accessor: 'edit',
      Cell: () => <button className="btn btn-primary-outline rounded" type="button">Edit</button>,
    },
    ]
    return columns
  }

  handleSectionSelect = (reward) => {
    if (reward['loyalty_program_code']) {
      history.push(`/rewards/editLoyaltyProgram/${reward.loyalty_program_code}`)
    }
    else {
      history.push(`/rewards/editPromo/${reward.promo_code}`)
    }
  }

  render() {
    const rewards = this.rewards()
    return (
      <div>
        <div className="mb-3">
          <h4 className="text-center h2">Rewards</h4>
        </div>
        {this.props.loading ? (<div>Loading</div>) : (rewards.length === 0 ? (<p>No rewards</p>) :
          (<ReactTable columns={this.tableColumns()} data={rewards} getTdProps={(s, r, c) => {
            if (c.id !== '_selector' && !!r) {
              return {
                onClick: () => this.handleSectionSelect(r.original),
                style: {
                  cursor: 'pointer',
                },
              }
            } else {
              return {}
            }
          }} style={{ height: '600px' }} />))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    loyalty_programs: state.planFeatures.loyaltyPrograms,
    promos: state.planFeatures.promos,
  }
}

const mapDispatchToProps = {
  changeModule,
  getLoyaltyPrograms,
  getPromos,
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardsContainer)
