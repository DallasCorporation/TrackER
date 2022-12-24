import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { isMobile } from 'react-device-detect';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZGFsbGFzIiwiYSI6ImNsMnVkMzIzdTAwdmYza21wdHd2YzR0c2kifQ.DT00_FPsSokLQ8r4FELa2A';

const MapboxMap = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [props.lng, props.lat],
      zoom: 13,
      interactive: false
    })
    map.current.addControl(new mapboxgl.NavigationControl({
      visualizePitch: true
    }), 'top-left');
    map.current.addControl(new mapboxgl.FullscreenControl());
    new mapboxgl.Marker(<div
      style={{
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',
        cursor: 'pointer',
      }} />)
      .setLngLat([props.lng, props.lat])
      .addTo(map.current);
  }, [props]);

  return <div ref={mapContainer} style={isMobile ? { height: "300px", width: "260px" } : { height: "400px" }} className="map-container" />

}
export default MapboxMap
