import React, { Component } from 'react'
import sortBy from 'lodash/sortBy'
import cloneDeep from 'lodash/cloneDeep'
import Variation from './Variation'

class Variations extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newId: 1,
    }
  }

  onAddVariation = () => {
    const newVariation = {
      id: this.state.newId,
      variation_name: `Variation ${this.state.newId}`,
      percent_allocation: 0,
      campaign_experiment_variation_plans: [],
    }
    const variations = this.props.variations.concat(newVariation)
    this.props.onUpdateVariations(variations)
    this.setState({ newId: this.state.newId + 1 })
  }

  onUpdateVariation = (variation, key, value) => {
    let variations = cloneDeep(this.props.variations)
    if (variation.id) {
      variations = variations.map(v => {
        if (v.id === variation.id) {
          v[key] = value
        }
        return v
      })
    } else {
      variations = variations.map(v => {
        if (v.experiment_variation_id === variation.experiment_variation_id) {
          v[key] = value
        }
        return v
      })
    }
    this.props.onUpdateVariations(variations)
  }

  onDeleteVariation = (variation) => {
    let variations
    if (variation.id) {
      variations = this.props.variations.filter(v => v.id !== variation.id)
    } else {
      variations = this.props.variations.filter(v => v.experiment_variation_id !== variation.experiment_variation_id)
    }
    this.props.onUpdateVariations(variations)
  }

  variations() {
    return sortBy(this.props.variations, ['created_at'])
  }

  render() {
    return (
      <div>
        <h4>Variations</h4>
        <ul className="list-group list-group-flush">
          {this.variations().map(variation => (
            <Variation
              key={`${this.props.writeAccess ? 'writeAccess' : 'active'}-variation-${variation.experiment_variation_id ? variation.experiment_variation_id : variation.id}`}
              distributeEvenly={this.props.distributeEvenly}
              variation={variation}
              writeAccess={this.props.writeAccess}
              onDeleteVariation={this.onDeleteVariation}
              onUpdateVariation={this.onUpdateVariation}
            />
          ))}
        </ul>
        {this.props.writeAccess && <button className="btn btn-secondary my-5" onClick={this.onAddVariation}>Add Variation</button>}
      </div>
    )
  }
}

export default Variations
