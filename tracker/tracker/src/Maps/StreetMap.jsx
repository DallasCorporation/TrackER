import { useEffect, useState } from "react";
import Streetview from 'react-streetview';


const StreetMap = ({ lat, lng }) => {
    const googleMapsApiKey = "AIzaSyB0pAAfd-SgsJm0w0hvzZfg90qfXoPN9bw";
    const [positions, setpositions] = useState({
        lat: Number(lat),
        lng: Number(lng)
    });
    const streetViewPanoramaOptions = {
        position: { lat: positions.lat, lng: positions.lng },
        zoom: 1,
        pov: { heading: 0, pitch: 0 },
        addressControl: true,
        showRoadLabels: true,
        zoomControl: true
    };

    return (
        <div
            style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#eeeeee"
            }}
        >
            <Streetview
                src="https://maps.google.com/maps/api/js?key=AIzaSyB0pAAfd-SgsJm0w0hvzZfg90qfXoPN9bw"
                key={googleMapsApiKey}
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
        </div>
    );
};

export default StreetMap;