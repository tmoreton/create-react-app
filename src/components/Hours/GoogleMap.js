import React from 'react'
import GoogleMapReact from 'google-map-react'

const GoogleMap = ({ lat, lng }) => {
  const defaultProps = {
    center: {
      lat: parseInt(lat, 10),
      lng: parseInt(lng, 10),
    },
    zoom: 11,
  }
  if (!lat) return null
  return (
    <div style={{ height: '200px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_API}` }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap
