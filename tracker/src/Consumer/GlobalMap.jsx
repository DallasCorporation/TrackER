import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl";
import { Col, Row } from 'antd';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uZGFsbGFzIiwiYSI6ImNsMnVkMzIzdTAwdmYza21wdHd2YzR0c2kifQ.DT00_FPsSokLQ8r4FELa2A';

export default function GlobalMap() {
    const mapContainer = useRef();
    const map = useRef();

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [12, 44],
            zoom: 3,
            minZoom: 2,
        });
        map.current.addControl(new mapboxgl.FullscreenControl());


        new mapboxgl.Marker()
            .setOffset([0, 0])
            .setLngLat([12.225940, 44.135980])
            .addTo(map.current)

    });


    return (
        <Row style={{marginTop:"10px"}}>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet" />
            <Col span={24} >
                <div ref={mapContainer} style={{ height: "500px" }} />
            </Col>
        </Row>
    );
}