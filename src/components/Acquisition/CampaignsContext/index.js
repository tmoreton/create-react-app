import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../../history'
import qs from 'qs'
import Select from 'react-select'
import isEmpty from 'lodash/isEmpty'
import { changeModule } from '../../../actions/changeModule'
import getPredicates from '../../../actions/segments/getPredicates'
import getSegmentsContext from '../../../actions/segments/getSegmentsContext'
import getAgentContext from '../../../actions/segments/getAgentContext'
import getCampaignContext from '../../../actions/campaigns/getCampaignContext'
import getExperimentContext from '../../../actions/experiments/getExperimentContext'
import SegmentsContext from './SegmentsContext'
import CampaignContext from './CampaignContext'
import ExperimentContext from './ExperimentContext'
import CampaignContextInfo from './CampaignContextInfo'
import AgentContext from './AgentContext'
import LowerPriorityCampaignsContext from './LowerPriorityCampaignsContext'

class Context extends Component {

  state = {}

  componentDidMount() {
    this.props.changeModule('Campaigns Context')
    const params = qs.parse(this.props.location.search.split('?')[1])
    const state = {}
    Object.keys(params).forEach(param => {
      state[param] = params[param]
    })
    this.props.getPredicates()
    this.getContext(state)
    this.setState(state)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.segments !== this.props.segments) {
      this.props.getCampaignContext(this.props.segments)
    }
    if (prevProps.campaigns[0] !== this.props.campaigns[0]) {
      this.props.getExperimentContext(this.props.segments, this.props.campaigns[0])
    }
  }

  onChooseOption = (predicate, event, input_type) => {
    let value
    if (input_type === 'range') {
      value = parseInt(event.value, 10)
    }
    if (input_type === 'select') {
      value = event ? event.value : null
    } else {
      value = event.target.value
    }
    const state = this.state
    if (value) {
      state[predicate.predicate] = value
    } else {
      delete state[predicate.predicate]
    }
    history.push(`/campaigns_context?${qs.stringify(state, { arrayFormat: 'repeat' })}`)
    this.setState(state)
  }

  setContext = (state) => {
    this.getContext(state)
    this.setState(state)
  }

  getContext(state) {
    this.props.getSegmentsContext(state)
    if (!isEmpty(this.state)) {
      this.props.getAgentContext(state)
    }
  }

  onGetContext = () => {
    this.getContext(this.state)
  }

  otherCampaigns() {
    return this.props.campaigns.filter((campaign, i) => i !== 0)
  }

  options(predicateInfo) {
    return this.props.predicates.find(p => p.segment_predicate.predicate === predicateInfo.segment_predicate.predicate).options.map(p => (
      { label: `${p.label_column} (${p.value_column})`, value: p.value_column }
    ))
  }

  predicates() {
    return this.props.predicates.filter(predicate => !predicate.segment_predicate.inferable)
  }

  renderOtherCampaigns() {
    return this.otherCampaigns().map(campaign => <CampaignContextInfo key={`campaign-${campaign.campaign_id}`} campaign={campaign} />)
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Campaigns Context</h4>
        </div>
        <div className="card mb-4">
          <div className="card-header">
            <strong>Context</strong>
          </div>
          <div className="card-body">
            {this.predicates().map(predicateInfo => (
              <div key={predicateInfo.segment_predicate.predicate} className="row mb-2 align-items-center">
                <div className="col-2 text-right">
                  <strong>{predicateInfo.segment_predicate.description}</strong>
                </div>
                <div className="col-4">
                  {['text', 'range'].includes(predicateInfo.segment_predicate.input_type) ? (
                    <input
                      className="form-control form-control-sm"
                      placeholder={predicateInfo.segment_predicate.description}
                      style={{ height: '36px' }}
                      type={predicateInfo.segment_predicate.input_type === 'range' ? 'number' : 'text'}
                      value={this.state[predicateInfo.segment_predicate.predicate]}
                      onChange={(value) => this.onChooseOption(predicateInfo.segment_predicate, value, predicateInfo.segment_predicate.input_type)}
                    />
                  ) : (
                    <Select
                      options={this.options(predicateInfo)}
                      placeholder={predicateInfo.segment_predicate.description}
                      value={this.state[predicateInfo.segment_predicate.predicate]}
                      onChange={(value) => this.onChooseOption(predicateInfo.segment_predicate, value, 'select')}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="row mt-4">
              <div className="col-4 offset-2 d-flex align-items-center">
                <button className="btn btn-primary mr-3" onClick={this.onGetContext}>Get Result</button>
              </div>
            </div>
          </div>
        </div>
        {this.props.segments.length > 0 && (
          <div>
            <AgentContext context={this.state}  setContext={this.setContext} />
            <SegmentsContext loading={this.props.loadingSegments} segments={this.props.segments} />
            <CampaignContext campaign={this.props.campaigns[0] || {}} loading={this.props.loadingCampaigns} />
            <ExperimentContext campaign={this.props.campaigns[0]} experiment={this.props.experiment} loading={this.props.loadingExperiment} />
            <LowerPriorityCampaignsContext campaigns={this.renderOtherCampaigns()} loadingCampaigns={this.props.loadingCampaigns} />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    predicates: Object.values(state.predicates.info),
    segments: state.context.segments,
    campaigns: state.context.campaigns,
    experiment: state.context.experiment,
    loadingSegments: state.context.loading.segments,
    loadingCampaigns: state.context.loading.campaigns,
    loadingExperiment: state.context.loading.experiment,
  }
}

const mapDispatchToProps = {
  changeModule,
  getPredicates,
  getSegmentsContext,
  getCampaignContext,
  getExperimentContext,
  getAgentContext,
}

export default connect(mapStateToProps, mapDispatchToProps)(Context)
