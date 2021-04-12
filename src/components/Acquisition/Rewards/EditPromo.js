import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeModule } from '../../../actions/changeModule'
import getPromos from '../../../actions/plans/getPromos'
import getPromoHistory from '../../../actions/plans/getPromoHistory'
import SectionInput from '../../Shared/SectionInput'
import updatePromo from '../../../actions/rewards/updatePromo'
import history from '../../../history'
import ReactTable from 'react-table'
import isEmpty from 'lodash/isEmpty'
import Modal from '../../Modal'

class EditPromo extends React.Component {

  constructor() {
    super()
    this.state = {
      modalTerms: '',
      showModal: false,
    }
  }

  componentDidMount = () => {
    this.props.getPromos()
    this.props.getPromoHistory(this.props.match.params.promoCode)
  }

  componentDidUpdate = () => {
    if (this.props.promos.length > 0 && !this.state.promo_code) {
      const promo = this.getPromo()
      this.setState(promo)
    }
  }

  getPromo = () => {
    if (this.props.promos.length === 0) return null
    else {
      const code = this.props.match.params.promoCode
      return this.props.promos.find(promoObj => promoObj.promo_code === code)
    }
  }

  updatePromo = () => {
    this.props.updatePromo(this.state)
  }

  cancel = () => {
    history.push('/rewards')
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  tableColumns = () => {
    const columns = [
      {
        Header: 'Name',
        id: 'name',
        accessor:  props => props.updated_by_user.first_name + ' ' + props.updated_by_user.last_name,
      },
      {
        Header:  'Email',
        id: 'email',
        accessor: props => props.updated_by_user.email,
      },
      {
        Header: 'Updated at',
        id: 'updated_at',
        accessor:  props => new Date(props.updated_at).toLocaleString('en-US'),
      },
      {
        Header: 'Terms Description',
        id: 'terms_desc',
        accessor: props => props.promo_terms_desc,
      },
    ]

    return columns
  }

  handleSectionSelect = (row) => {
    this.setState({
      modalTerms: row.loyalty_program_terms_desc,
      showModal: true,
    })
  }

  render() {
    return (
      <div className="col-md-12 mx-auto text-center">
        <h2 className="text-center">Update Promotion</h2>
        <div className="card mb-3">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-6">
                  <SectionInput readonly className="form-control" label="Program Name" name="promotion_name" value={this.state.promo_name} />
                  <SectionInput readonly className="form-control" label="Program Code" name="code" value={this.state.promo_code} />
                  <SectionInput className="form-control" label="Program Description" name="description" value={this.state.promo_desc} onChange={e => this.setState({ promo_desc: e.target.value })} />
                  <SectionInput readonly className="form-control" label="Redemption Required" name="redemption" value={this.state.redemption_required ? 'Yes' : 'No'} />
                  <SectionInput readonly className="form-control" label="Last Sold Date" name="lastSoldDate" value={this.state.last_sold_dt} />
                  <SectionInput readonly className="form-control" label="Measure" name="measure" value={this.state.promo_measure} />
                  <SectionInput readonly className="form-control" label="Fulfillment Vendor Code" name="fulfillment_vendor" value={this.state.fulfillment_vendor_code} />
                  <SectionInput className="form-control" label="Terms Description" name="terms_desc" rows={20} type="textarea" value={this.state.promo_terms_desc} onChange={e => this.setState({ promo_terms_desc: e.target.value })} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-primary mx-2" onClick={this.updatePromo}>Save</button>
          <button className="btn btn-primary mx-2" onClick={this.cancel}>Cancel</button>
        </div>
        <h4 className="text-center">Update History</h4>
        {this.props.loading ? (<div>Loading</div>) : (isEmpty(this.props.rewardHistory) ? (<p>No History</p>) :
          (<ReactTable columns={this.tableColumns()} data={this.props.rewardHistory} getTdProps={(s, r, c) => {
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
          }} style={{ height: '300px', marginTop: '50px' }} />))}
        <Modal closeModal={this.closeModal} visible={this.state.showModal}><p>{this.state.modalTerms}</p></Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    promos: state.planFeatures.promos,
    rewardHistory: state.planFeatures.rewardHistory,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getPromos, getPromoHistory, updatePromo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPromo)
