import React from 'react';
import './Map.css';
import Heatmap from '../Map/HeatMapLayer'
import "leaflet/dist/leaflet.css";


const Map = () => {
    return (
        <div id="mapSection" className="map-container mt-60 mb-24">
<div className="w-full h-[500px] mt-16">
                <Heatmap />
            </div></div>

            

            
    );
};

export default Map;