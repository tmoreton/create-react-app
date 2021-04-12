import cloneDeep from 'lodash/cloneDeep'

export default function updateVariation(variation, key, value) {
  return function(dispatch, getState) {
    const experiments = cloneDeep(getState().campaign.experiments)
    const { experiment_id, experiment_variation_id } = variation
    const experiment = experiments[experiment_id]

    if (experiment.control.experiment_variation_id === experiment_variation_id) {
      experiment.control[key] = value
    } else {
      experiment.variations.map(v => {
        if (v.experiment_variation_id === experiment_variation_id) {
          v[key] = value
        }
        return v
      })
    }
    dispatch({ type: 'UPDATE_VARIATION', payload: experiment })
  }
}
