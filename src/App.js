import React, { useState } from "react";
import MapComponent from "./HeatMapLayer";
import CrimeMap from "./CrimeMap";

import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <div>
      <h1>Interactive Map</h1>
      <CrimeMap />
      {/* // <MapComponent /> */}
    </div>
  );
};

export default App;
