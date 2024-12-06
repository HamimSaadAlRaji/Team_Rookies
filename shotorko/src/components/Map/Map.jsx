import React from 'react';
import './Map.css';
import Heatmap from '../Map/HeatMapLayer'
import "leaflet/dist/leaflet.css";


const Map = () => {
    return (

            

            <div className="w-full h-[500px] mt-16">
                <Heatmap />
            </div>
    );
};

export default Map;