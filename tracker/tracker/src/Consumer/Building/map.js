import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZGFsbGFzIiwiYSI6ImNsMnVkMzIzdTAwdmYza21wdHd2YzR0c2kifQ.DT00_FPsSokLQ8r4FELa2A';

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(props.lat);
  const [lng, setLng] = useState(props.lng);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 13,
      interactive: false
    });
  });

  return (
      <div ref={mapContainer} style={{height:"100%"}} className="map-container" />
  );
}
