import React from 'react';
import './Map.css';
import Heatmap from '../Map/HeatMapLayer'
import SearchBox from '../Map/SearchBox'


const Map = () => {
    return (

          <div className="relative w-full h-screen">
            

            {/* Heatmap */}
            <div className="w-full h-full mt-16">
                <Heatmap />
            </div>
        </div>
    );
};

export default Map;