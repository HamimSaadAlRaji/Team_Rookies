import React, { useState } from "react";
import MapComponent from "./HeatMapLayer";

import "leaflet/dist/leaflet.css";

const App = () => {
  return (
    <div>
      <h1>Interactive Map</h1>

      <MapComponent />
    </div>
  );
};

export default App;
