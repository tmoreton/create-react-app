import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeModule } from '../../../actions/changeModule'
import getLoyaltyPrograms from '../../../actions/plans/getLoyaltyPrograms'
import getLoyaltyHistory from '../../../actions/plans/getLoyaltyHistory'
import SectionInput from '../../Shared/SectionInput'
import history from '../../../history'
import updateLoyaltyProgram from '../../../actions/rewards/updateLoyalty'
import ReactTable from 'react-table'
import isEmpty from 'lodash/isEmpty'
import Modal from '../../Modal'

class EditLoyalty extends React.Component {

  constructor() {
    super()
    this.state = {
      modalTerms: '',
      showModal: false,
    }
  }

  componentDidMount = () => {
    this.props.getLoyaltyPrograms()
    this.props.getLoyaltyHistory(this.props.match.params.loyaltyProgramCode)
  }

  componentDidUpdate = () => {
    if (this.props.loyalty_programs.length > 0 && !this.state.loyalty_program_code) {
      const loyaltyProgram = this.getLoyaltyProgram()
      this.setState(loyaltyProgram)
    }
  }

  getLoyaltyProgram = () => {
    if (this.props.loyalty_programs.length === 0) return null
    else {
      const code = this.props.match.params.loyaltyProgramCode
      return this.props.loyalty_programs.find(loyaltyObj => loyaltyObj.loyalty_program_code === code)
    }
  }

  updateLoyalty = () => {
    this.props.updateLoyaltyProgram(this.state)
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
        accessor: props => props.loyalty_program_terms_desc,
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
        <h2 className="text-center">Update Loyalty Program</h2>
        <div className="card mb-3">
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-6">
                  <SectionInput readonly className="form-control" label="Program Name" name="name" value={this.state.loyalty_program_name} />
                  <SectionInput readonly className="form-control" label="Program Code" name="code" value={this.state.loyalty_program_code} />
                  <SectionInput className="form-control" label="Program Description" name="description" value={this.state.loyalty_program_desc} onChange={e => this.setState({ loyalty_program_desc: e.target.value })} />
                  <SectionInput readonly className="form-control" label="Redemption Required" name="redemption" value={this.state.redemption_required ? 'Yes' : 'No'} />
                  <SectionInput readonly className="form-control" label="Last Sold Date" name="lastSoldDate" value={this.state.last_sold_dt} />
                  <SectionInput readonly className="form-control" label="Measure" name="measure" value={this.state.loyalty_program_measure} />
                  <SectionInput readonly className="form-control" label="Fulfillment Vendor Code" name="fulfillment_vendor" value={this.state.fulfillment_vendor_code} />
                  <SectionInput className="form-control" label="Terms Description" name="terms_desc" rows={20} type="textarea" value={this.state.loyalty_program_terms_desc} onChange={e => this.setState({ loyalty_program_terms_desc: e.target.value })} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-primary mx-2" onClick={this.updateLoyalty}>Save</button>
          <button className="btn btn-primary mx-2" onClick={this.cancel}>Cancel</button>
        </div>
        <h4 className="text-center">Update History</h4>
        {this.props.loading ? (<div>Loading</div>) : (isEmpty(this.props.rewardHistory) ? (<p>No history</p>) :
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
    loyalty_programs: state.planFeatures.loyaltyPrograms,
    rewardHistory: state.planFeatures.rewardHistory,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getLoyaltyPrograms, updateLoyaltyProgram, getLoyaltyHistory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLoyalty)
