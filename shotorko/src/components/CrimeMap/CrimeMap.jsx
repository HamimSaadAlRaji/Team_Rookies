import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.heat";

const HeatMapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const heat = L.heatLayer(points, { radius: 25 }).addTo(map);

      // Cleanup on component unmount
      return () => {
        map.removeLayer(heat);
      };
    }
  }, [points, map]);

  return null;
};

const CrimeMap = () => {
  const [heatmapPoints, setHeatmapPoints] = useState([]);

  useEffect(() => {
    const areaName = "Northeast";
    const month = "3";
    const year = "2024";

    // Fetch crime data from the API
    fetch(
      `http://localhost:8000/crimes?area_name=${areaName}&month=${month}&year=${year}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        // Map through the data and prepare the heatmap points
        const points = data.map((crime) => [
          parseFloat(crime.lat), // Convert lat to float
          parseFloat(crime.lon), // Convert lon to float
          0.5, // Set a default intensity
        ]);
        setHeatmapPoints(points); // Update the heatmap points
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <MapContainer
      center={[34.0522, -118.2437]} // Default center to Los Angeles
      zoom={13} // Set the initial zoom level
      style={{ height: "100vh", width: "100%" }} // Make the map full screen
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        maxZoom={20} // Set max zoom level for the tile layer
      />
      <HeatMapLayer points={heatmapPoints} /> {/* Add the heatmap layer */}
    </MapContainer>
  );
};

export default CrimeMap;