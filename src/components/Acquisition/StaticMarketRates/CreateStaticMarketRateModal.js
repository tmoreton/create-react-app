import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../history'
import createStaticMarketRate from '../../../actions/staticMarketRates/createStaticMarketRate'
import Modal from '../../Modal'
import SectionInput from '../../Shared/SectionInput'
import PlanSelect from '../../Shared/PlanSelect'

class CreateStaticMarketRateModal extends Component {

  state = {
    market_code: null,
    revenue_class_code: null,
    plan_code: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.saving !== this.props.saving && !this.props.saving && this.props.savedRateId) {
      this.closeModal()
    }
  }

  onChange = (key, value) => {
    this.setState({ [key]: value })
  }

  saveStaticMarketRate = () => {
    this.props.createStaticMarketRate(this.state)
  }

  closeModal() {
    history.goBack()
  }

  validStaticMarketRate() {
    const requiredFields = ['market_code', 'revenue_class_code', 'plan_code']
    return requiredFields.every(field => !!this.state[field])
  }

  options() {
    return this.props.plans.map(option => (
      { value: option.plan_code, label: `${option.plan_name} - ${option.plan_code}` }
    ))
  }

  render() {
    return (
      <div>
        <Modal ddcloseModal={this.closeModal} title="New Static Market Rate" visible={true}>
          <div className="my-3 col-6">
            <SectionInput label="Market Code" type="text" value={this.state.market_code} onChange={(event) => this.onChange('market_code', event.target.value)} />
            <SectionInput label="Revenue Class Code" type="text" value={this.state.revenue_class_code} onChange={(event) => this.onChange('revenue_class_code', event.target.value)} />
            <div className="row form-group">
              <div className="col-4 text-right">
                <label className="font-weight-bold mr-2">
                  Plan
                </label>
              </div>
              <div className="col">
                <PlanSelect
                  writeAccess
                  planCode={this.state.plan_code}
                  onChange={(value) => this.onChange('plan_code', value)}
                />
              </div>
            </div>
            <SectionInput label="Rate" type="text" value={this.state.rate} onChange={(event) => this.onChange('rate', event.target.value)} />
          </div>
          <button className="btn btn-primary" disabled={!this.validStaticMarketRate()} onClick={this.saveStaticMarketRate}>Save</button>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.staticMarketRates.loading,
    saving: state.staticMarketRates.saving,
    savedRateId: state.staticMarketRates.savedRateId,
  }
}

const mapDispatchToProps = {
  createStaticMarketRate,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStaticMarketRateModal)
