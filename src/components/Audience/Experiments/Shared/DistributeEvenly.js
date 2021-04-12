import React, { Component } from 'react'

class DistributeEvenly extends Component {

  componentDidMount() {
    this.checkDistributedEvenly(false)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.experiments[this.props.experiment.experiment_id] !== this.props.experiments[this.props.experiment.experiment_id]) {
      this.checkDistributedEvenly(false)
    }
  }

  toggleDistributeEvenly = () => {
    const distributeEvenly = !this.props.distributeEvenly
    this.distributeEvenly(distributeEvenly, true)
  }

  checkDistributedEvenly(markUnsaved) {
    const experiment = this.props.experiment
    const percentAllocations = [parseFloat(experiment.control.percent_allocation)]
    experiment.variations.forEach(variation => percentAllocations.push(parseFloat(variation.percent_allocation)))
    if (Math.max(...percentAllocations) - Math.min(...percentAllocations) <= .011) {
      this.distributeEvenly(true, markUnsaved)
    }
  }

  distributeEvenly(distributeEvenly, markUnsaved) {
    const experiment = this.props.experiment
    const control = experiment.control
    control.percent_allocation = null
    const variations = experiment.variations.map(variation => {variation.percent_allocation = null; return variation})
    this.props.onToggleDistributeEvenly(distributeEvenly, { ...experiment, control, variations }, markUnsaved)
  }

  render() {
    return (
      <div className="row form-group">
        <div className="col-4 text-right">
          <label className="font-weight-bold mr-2 form-check-label">Distribute Evenly</label>
        </div>
        <div className="col">
          <input checked={this.props.distributeEvenly} type="checkbox" onChange={this.toggleDistributeEvenly} />
        </div>
      </div>
    )
  }
}

export default DistributeEvenly
