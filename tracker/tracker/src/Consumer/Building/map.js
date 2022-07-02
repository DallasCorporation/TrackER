import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZGFsbGFzIiwiYSI6ImNsMnVkMzIzdTAwdmYza21wdHd2YzR0c2kifQ.DT00_FPsSokLQ8r4FELa2A';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(44.157944734289686);
  const [lng, setLng] = useState(12.337966894449043);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
      interactive: true
    });
  });

  return (
      <div ref={mapContainer} className="map-container" />
  );
}
