/* global Blob: false */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
import getEarlyCancellationFees from '../../actions/plans/getEarlyCancellationFees'

const correspondenceTypeMapping = {
  'EXPIRE_OPTIONS_NOTICE': 'contract_expiration',
  'EXPIRE_INITIAL_NOTICE': 'contract_expiration',
  'EXPIRE_RENEWAL_NOTICE': 'contract_expiration',
  'TERMS': 'terms',
  'ENVIRONMENTAL_DISCLOSURE': 'environmental_disclosure',
  'REWARDS_TERMS': 'rewards_terms',
  'CANCELLATION_NOTICE': 'cancellation_notice',
}

const previewMapping = {
  'contract_expiration': {
    'url': `${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/contract_expiration/preview`,
    'options': {
      'contract_type_code': ['fixed', 'variable', 'subscription'],
      'early_cancellation_fee_code': [],
    },
  },
  'terms': {
    'url': `${process.env.REACT_APP_GARCON_API}/terms/preview`,
    'options': {
      'contract_type_code': ['fixed', 'variable', 'subscription'],
      'early_cancellation_fee_code': [],
      'include_order': [true, false],
      'include_incentives': [true, false],
      'is_intro_subscription': [true, false],
    },
  },
  'environmental_disclosure': {
    'url': `${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/environmental_disclosure/preview`,
    'options': {},
  },
  'rewards_terms': {
    'url': `${process.env.REACT_APP_GARCON_API}/rewards/terms/preview`,
    'options': {
      'multiple_incentives': [true, false],
      'reward_type': ['promo', 'loyalty_program', 'both'],
    },
  },
  'cancellation_notice': {
    'url': `${process.env.REACT_APP_GARCON_API}/terms/cancellation_notice/preview`,
    'options': {
      'include_order': [true, false],
    },
  },
}

function assignParamOptions(param, value) {
  Object.keys(previewMapping).forEach(function(type) {
    Object.keys(previewMapping[type].options).forEach(function(key) {
      if (param === key) {
        previewMapping[type].options[key] = value
      }
    })
  })
}

class CorrespondenceTemplatePreview extends Component {
  constructor(props) {
    super(props)
    assignParamOptions('early_cancellation_fee_code', this.props.earlyCancellationFees.map(ecf => ecf.early_cancellation_fee_code))
    const typeMapping = correspondenceTypeMapping[this.props.correspondenceTemplate.correspondence_type_code]
    const mapping = previewMapping[typeMapping]
    if (mapping) {
      this.state = {
        previewTemplate: { ...mapping, params: {} },
        previewUrl: null,
        previewFailedMessage: null,
      }
    } else {
      this.state = {
        previewTemplate: { url: null, options: {} },
        previewFailedMessage: 'No preview template setup',
      }
    }
  }

  componentDidMount() {
    if (this.hasPreviewConfigured()) {
      this.getPreview()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.hasPreviewConfigured() && prevProps.version !== this.props.version) {
      this.getPreview(this.state.previewTemplate.params)
    }
  }

  resetPreview = () => {
    const previewTemplate = cloneDeep(this.state.previewTemplate)
    previewTemplate.params = {}
    this.setState({ previewTemplate })
    this.getPreview()
  }

  updateParams = (param, value) => {
    const previewTemplate = cloneDeep(this.state.previewTemplate)
    if (value === null) {
      delete previewTemplate.params[param]
    } else {
      previewTemplate.params[param] = value
    }
    this.setState({ previewTemplate })
    this.getPreview(previewTemplate.params)
  }

  showPendingVersion = () => {
    return this.props.version === 'PENDING'
  }

  hasPendingChanges() {
    return !!this.props.correspondenceTemplate.pending_liquid_html
  }

  hasPreviewConfigured = () => {
    return !!this.state.previewTemplate.url
  }

  previewUrl = (payload) => {
    const base = new URL(this.state.previewTemplate.url)
    const queryParams = { correspondence_template_id: this.props.correspondenceTemplate.correspondence_template_id, use_pending: this.showPendingVersion(), ...payload }
    Object.keys(queryParams).forEach(param => {
      base.searchParams.append(param, queryParams[param])
    })
    return base.toString()
  }

  getPreview = (payload = {}) => {
    this.setState({ previewFailedMessage: null })
    axios.get(this.previewUrl(payload)).then(response => {
      const file = new Blob([response.data], { type: 'text/html' })
      const url = URL.createObjectURL(file)
      this.setState({ previewUrl: url })
    }).catch(error => {
      this.setState({ previewFailedMessage: error.response.data.error })
    })
  }

  downloadPreview = () => {
    axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${this.props.correspondenceTemplate.correspondence_template_id}/download`, { params: { preview_url: this.previewUrl(this.state.previewTemplate.params) }, responseType: 'arraybuffer' }).then(response => {
      const file = new Blob([response.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      const a = document.createElement('a')
      a.href = fileURL
      const paramsString = new URLSearchParams(this.state.previewTemplate.params).toString()
      a.download = `${this.props.correspondenceTemplate.description}_${paramsString}_${(new Date()).toLocaleDateString('en-US')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }

  renderOptions = () => {
    const options = this.state.previewTemplate.options
    return Object.keys(options).map(param => {
      const optionsHtml = options[param].map(option => {
        return <option key={option} value={option}>{option.toString()}</option>
      })

      return (<div key={param} className="col-3">
        <label>{param}</label>
        <select className="form-control" value={this.state.previewTemplate.params[param] || ''} onChange={e => this.updateParams(param, e.target.value)}>
          <option />
          {optionsHtml}
        </select>
      </div>)
    })
  }

  render() {
    const errorMessage = this.state.previewFailedMessage ? <div className="alert alert-danger mt-3">Error: {this.state.previewFailedMessage}</div> : null

    return (<Fragment>
      <div className="row">
        {this.renderOptions()}
        <div className="col-3">
          <br />
          <button className="btn btn-sm btn-default" disabled={!this.hasPreviewConfigured()} onClick={this.resetPreview}>Reset</button>
          <button className="btn btn-link" disabled={!this.hasPreviewConfigured()} onClick={this.downloadPreview}>Download PDF</button>
        </div>
      </div>
      {!this.hasPendingChanges() && this.showPendingVersion() ? <div className="alert alert-info mt-3">No pending changes</div> : null}
      {errorMessage}
      <div className="embed-responsive embed-responsive-1by1">
        <iframe className="embed-responsive-item" src={this.state.previewUrl} title="preview" />
      </div>
    </Fragment>)
  }
}

function mapStateToProps({ planFeatures, correspondenceTemplates }) {
  return {
    earlyCancellationFees: planFeatures.earlyCancellationFees,
    correspondenceTemplate: correspondenceTemplates.currentCorrespondenceTemplate,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEarlyCancellationFees }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplatePreview)
