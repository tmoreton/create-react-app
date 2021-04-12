import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EXPERIMENTS } from '../../../../utils/roles'
import getExperiment from '../../../../actions/experiments/getExperiment'
import getExperimentSlugs from '../../../../actions/experiments/getExperimentSlugs'
import updateExperiment from '../../../../actions/experiments/updateExperiment'
import saveExperiment from '../../../../actions/experiments/saveExperiment'
import clearExperiment from '../../../../actions/experiments/clearExperiment'
import getSegments from '../../../../actions/segments/getSegments'
import { changeModule } from '../../../../actions/changeModule'
import SaveHeader from '../../../Shared/SaveHeader'
import Loading from '../../../Shared/Loading'
import ExperimentDetails from './ExperimentDetails'
import FeatureTestExperiment from './FeatureTestExperiment'

const REQUIRED_FIELDS = {
  'PLAN_TEST' : ['experiment_type', 'experiment_name', 'experiment_start_dt'],
  'PRICE_TEST' : ['experiment_type', 'experiment_name', 'experiment_start_dt'],
  'FEATURE_TEST' : ['experiment_type', 'experiment_slug', 'experiment_name', 'experiment_start_dt'],
  'BASIC_TEST' : ['experiment_type', 'experiment_slug', 'experiment_name', 'experiment_start_dt'],
}

class ExperimentContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      saved: false,
      experimentSlug: props.experiment.experiment_slug,
      distributeEvenly: false,
    }
  }

  componentDidMount() {
    this.props.changeModule('Experiments')
    if (this.props.match.params.experimentId !== 'new') {
      this.props.getExperiment(this.props.match.params.experimentId)
      this.props.getExperimentSlugs()
      this.props.getSegments()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.experiment.experiment_id !== this.props.experiment.experiment_id) {
      this.props.getExperiment(this.props.match.params.experimentId)
      this.setState({ experimentSlug: this.props.experiment.experiment_slug })
    }

    if (prevProps.saving !== this.props.saving && !this.props.saving && !this.props.error) {
      this.setState({ saved: true, experimentSlug: this.props.experiment.experiment_slug })
      setTimeout(() => {
        this.setState({ saved: false })
      }, 2000)
    }
  }

  componentWillUnmount() {
    this.props.clearExperiment()
  }

  writeAccess() {
    return this.props.roles.some(role => EXPERIMENTS.WRITE.includes(role.name))
  }

  onDeleteExperiment = () => {
    const experiment_end_dt = new Date()
    this.props.updateExperiment({ ...this.props.experiment, experiment_end_dt })
  }

  onUpdateExperiment = (key, value) => {
    this.props.updateExperiment({ ...this.props.experiment, [key]: value })
  }

  onUpdateSegments = (key, value) => {
    this.props.updateExperiment({ ...this.props.experiment, [key]: value })
  }

  onToggleDistributeEvenly = (distributeEvenly, experiment, markUnsaved) => {
    this.props.updateExperiment(experiment, markUnsaved)
    this.setState({ distributeEvenly })
  }

  slugError() {
    return this.props.experimentSlugs.includes(this.props.experiment.experiment_slug) && this.props.experiment.experiment_slug !== this.state.experimentSlug
  }

  validExperiment() {
    const requiredFields = REQUIRED_FIELDS[this.props.experiment.experiment_type]
    if (requiredFields) {
      return REQUIRED_FIELDS[this.props.experiment.experiment_type].every(field => !!this.props.experiment[field]) && !this.slugError()
    } else {
      return false
    }
  }

  renderExperimentType() {
    switch (this.props.experiment.experiment_type) {
    case 'FEATURE_TEST':
      return <FeatureTestExperiment distributeEvenly={this.state.distributeEvenly} experiment={this.props.experiment} writeAccess={this.writeAccess()} onUpdateExperiment={this.onUpdateExperiment} />
    default:
      return null
    }
  }

  render() {
    if (this.props.loading || !this.props.userLoaded) return <Loading />

    const writeAccess = this.writeAccess()

    return (
      <div>
        <SaveHeader
          name={this.props.experiment.experiment_name}
          saved={this.state.saved}
          saving={this.props.saving}
          unsavedChanges={this.props.unsavedChanges}
          valid={this.validExperiment()}
          writeAccess={writeAccess}
          onSave={this.props.saveExperiment}
        />
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <strong>Experiment Details</strong>
            <div>
              {writeAccess && <a className="text-danger" onClick={this.onDeleteExperiment}>Stop Experiment</a>}
            </div>
          </div>
          <div className="card-body">
            <ExperimentDetails
              distributeEvenly={this.state.distributeEvenly}
              experiment={this.props.experiment}
              experiments={this.props.experiments}
              slugError={this.slugError()}
              writeAccess={writeAccess}
              onToggleDistributeEvenly={this.onToggleDistributeEvenly}
              onUpdateExperiment={this.onUpdateExperiment}
              onUpdateSegments={(segments) => this.onUpdateExperiment('experiment_segments_attributes', segments)}
            />
          </div>
        </div>
        <div className="mt-4">
          {this.renderExperimentType()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    experiments: state.experiments.info,
    experiment: state.experiment.info,
    experimentSlugs: state.experiments.slugs,
    loading: state.experiment.loading,
    saving: state.experiment.saving,
    unsavedChanges: state.experiment.unsavedChanges,
    error: state.error.show,
    roles: state.user.roles,
    userLoaded: state.user.userLoaded,
  }
}

const mapDispatchToProps = {
  getExperiment,
  getExperimentSlugs,
  updateExperiment,
  saveExperiment,
  clearExperiment,
  changeModule,
  getSegments,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentContainer)
