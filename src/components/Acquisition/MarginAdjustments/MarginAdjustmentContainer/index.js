import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../../history'
import { MARGIN_ADJUSTMENTS } from '../../../../utils/roles'
import { changeModule } from '../../../../actions/changeModule'
import getMarginAdjustment from '../../../../actions/marginAdjustments/getMarginAdjustment'
import updateMarginAdjustment from '../../../../actions/marginAdjustments/updateMarginAdjustment'
import createMarginAdjustment from '../../../../actions/marginAdjustments/createMarginAdjustment'
import saveMarginAdjustment from '../../../../actions/marginAdjustments/saveMarginAdjustment'
import clearMarginAdjustment from '../../../../actions/marginAdjustments/clearMarginAdjustment'
import deleteMarginAdjustment from '../../../../actions/marginAdjustments/deleteMarginAdjustment'
import SaveHeader from '../../../Shared/SaveHeader'
import Loading from '../../../Shared/Loading'
import MarginAdjustmentDetails from './MarginAdjustmentDetails'

const REQUIRED_FIELDS = ['description', 'adjustment', 'plan_code']

class MarginAdjustmentContainer extends Component {

  state = {
    saved: false,
  }

  componentDidMount() {
    this.props.changeModule('Margin Adjustments')
    if (!this.newMarginAdjustment()) {
      this.props.getMarginAdjustment(this.props.match.params.marginAdjustmentId)
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.saving !== this.props.saving && !this.props.saving) && !this.props.error) {
      this.setState({ saved: true })
      setTimeout(() => {
        this.setState({ saved: false })
      }, 2000)
    }
  }

  componentWillUnmount() {
    this.props.clearMarginAdjustment()
  }

  writeAccess() {
    return this.props.roles.some(role => MARGIN_ADJUSTMENTS.WRITE.includes(role.name))
  }

  newMarginAdjustment() {
    return this.props.match.params.marginAdjustmentId === 'new'
  }

  onDeleteMarginAdjustment = () => {
    this.props.deleteMarginAdjustment()
  }

  onUpdateMarginAdjustment = (key, value) => {
    this.props.updateMarginAdjustment({ ...this.props.marginAdjustment, [key]: value })
  }

  onUpdateSegments = (value) => {
    this.props.updateMarginAdjustment({ ...this.props.marginAdjustment, margin_adjustment_segments: value })
  }

  saveMarginAdjustment = () => {
    if (this.props.marginAdjustment.margin_adjustment_id) {
      this.props.saveMarginAdjustment()
    } else {
      this.props.createMarginAdjustment()
    }
  }

  validMarginAdjustment() {
    return REQUIRED_FIELDS.every(field => !!this.props.marginAdjustment[field])
  }

  renderDelete() {
    if (this.writeAccess() && this.props.marginAdjustment.active) {
      return <a className="text-danger" onClick={this.onDeleteMarginAdjustment}>Delete</a>
    } else if (!this.props.marginAdjustment.margin_adjustment_id) {
      return null
    } else {
      return <span className="text-danger font-weight-bold">Inactive</span>
    }
  }

  render() {
    if (!this.newMarginAdjustment() && (this.props.loading || !this.props.userLoaded)) return <Loading />

    const writeAccess = this.writeAccess()

    return (
      <div>
        <div>
          <a className="text-primary" onClick={() => history.push('/margin_adjustments')}>← Back to Margin Adjustments</a>
        </div>
        <SaveHeader
          name={this.props.marginAdjustment.description}
          saved={this.state.saved}
          saving={this.props.saving}
          unsavedChanges={this.props.unsavedChanges}
          valid={this.validMarginAdjustment()}
          writeAccess={writeAccess}
          onSave={this.saveMarginAdjustment}
        />
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <strong>Margin Adjustment Details</strong>
            {this.renderDelete()}
          </div>
          <div className="card-body">
            <MarginAdjustmentDetails
              marginAdjustment={this.props.marginAdjustment}
              writeAccess={writeAccess && (this.props.marginAdjustment.active || !this.props.marginAdjustment.margin_adjustment_id)}
              onUpdateMarginAdjustment={this.onUpdateMarginAdjustment}
              onUpdateSegments={this.onUpdateSegments}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marginAdjustment: state.marginAdjustment.info,
    unsavedChanges: state.marginAdjustment.unsavedChanges,
    loading: state.marginAdjustment.loading,
    saving: state.marginAdjustment.saving,
    error: state.error.show,
    roles: state.user.roles,
    userLoaded: state.user.userLoaded,
  }
}

const mapDispatchToProps = {
  changeModule,
  getMarginAdjustment,
  updateMarginAdjustment,
  createMarginAdjustment,
  saveMarginAdjustment,
  clearMarginAdjustment,
  deleteMarginAdjustment,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarginAdjustmentContainer)
