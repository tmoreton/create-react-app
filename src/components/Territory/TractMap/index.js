import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../../actions/changeModule'
import { getTracts, getCount } from '../../../actions/territory'
import { highlightTracts } from './highlight-style.js'
import ControlPanel from './ControlPanel'
import MAP_STYLE from './map-style-basic-v8.json'

class TractMap extends Component {
  state = {
    mapStyle: {
      ...MAP_STYLE,
      sources: { ...MAP_STYLE.sources },
      layers: MAP_STYLE.layers.slice(),
    },
    mapStyleJS: null,
    hoveredFeature: null,
    selected:[],
    viewport: {
      latitude: 39.9526,
      longitude: -75.1652,
      zoom: 8,
      bearing: 0,
      pitch: 0,
    },
  };

  componentDidMount = () => this.setState({ mapStyleJS: fromJS(this.state.mapStyle) });

  onViewportChange = viewport => this.setState({ viewport });

  onHover = event => {
    const { features, srcEvent: { offsetX, offsetY } } = event
    const hoveredFeature = features && features.find(f => f.layer.id === 'data')
    this.setState({ hoveredFeature, x: offsetX, y: offsetY })
  };

  onClick = event => {
    const { tracts } = this.props
    const { mapStyle } = this.state
    let tractName = ''
    const tract = event.features && event.features.find(f => f.layer.id === 'data')
    if (tract) {
      tractName = tract.properties.GEOID
    }
    if (tracts.indexOf(tractName) < 0) {
      tracts.push(tractName)
    } else {
      tracts.splice(tracts.indexOf(tractName), 1)
    }
    this.props.getTracts(tracts)
    this.props.getCount(tracts)
    const layerIndex = mapStyle.layers.findIndex(layer => layer.id === 'data-selected')
    this.setState({
      mapStyleJS: fromJS(mapStyle).setIn(['layers', layerIndex, 'filter', 2], tracts),
    })
  };

  selectState = (state) => {
    const stateMapStyle = {
      ...MAP_STYLE,
      sources: { ...MAP_STYLE.sources },
      layers: MAP_STYLE.layers.slice(),
    }

    stateMapStyle.sources.tracts = {
      type: 'geojson',
      data: `https://s3.amazonaws.com/territory-management/${state}_tracts.geojson`,
    }

    const highlightedMapStyle = highlightTracts(stateMapStyle)
    this.setState({
      mapStyle: highlightedMapStyle,
      mapStyleJS: fromJS(highlightedMapStyle),
    })
    this.props.getTracts([])
    this.props.getCount([])
  }

  renderTooltip() {
    const { hoveredFeature, x, y } = this.state
    return hoveredFeature && (
      <div className="map-tooltip" style={{ left: x, top: y }}>
        <p>{hoveredFeature.properties.TRACT_NAME}</p>
        <p>Total Households: <b>{hoveredFeature.properties.Total_Hous}</b></p>
        <p>Median Household Income: <b>${hoveredFeature.properties.Median_Hou}</b></p>
        <p>Square Area: <b>{hoveredFeature.properties.ALAND} </b>Mile(s)</p>
        <p>GEOID: <b>{hoveredFeature.properties.GEOID}</b></p>
      </div>
    )
  }

  render() {
    const { viewport, mapStyleJS } = this.state
    return (
      <div style={{ height: '100vh' }}>
        <MapGL
          {...viewport}
          height="100%"
          mapStyle={mapStyleJS}
          mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API}`}
          width="100%"
          onClick={this.onClick}
          onHover={this.onHover}
          onViewportChange={this.onViewportChange}>
          {this.renderTooltip()}
        </MapGL>
        <ControlPanel
          hoveredFeature={this.state.hoveredFeature}
          selectState={this.selectState}
          tracts={this.state.tracts}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    tracts: state.territory.tracts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getTracts, getCount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TractMap)
