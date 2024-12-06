import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import SearchBox from "./SearchBox";
import L from "leaflet";
import "leaflet.heat";
import "leaflet-routing-machine";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HeatMapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = data.map((crime) => [
      parseFloat(crime.location.latitude),
      parseFloat(crime.location.longitude),
      0.5, // Intensity
    ]);

    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });
    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const RoutingLayer = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: true,
      createMarker: () => null, // Prevent default waypoint markers
      lineOptions: {
        styles: [{ color: "#ff0000", weight: 4 }], // Customize the path appearance
      },
    }).addTo(map);

    return () => {
      if (map.hasLayer(routingControl)) {
        map.removeControl(routingControl);
      }
    };
  }, [from, to, map]);

  return null;
};

const HeatMap = () => {
  const [crimeData, setCrimeData] = useState([]);

  useEffect(() => {
    fetch(
      "https://data.police.uk/api/crimes-street/all-crime?lat=51.527998&lng=-0.102461&date=2024-06"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((crime) => crime.category === "drugs");
        setCrimeData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [selectPosition, setSelectedPosition] = useState(null);
  const [selectPositionTo, setSelectedPositionTo] = useState(null);

  const from = selectPosition
    ? {
        lat: parseFloat(selectPosition.lat),
        lng: parseFloat(selectPosition.lon),
      }
    : { lat: 0, lng: -1.131592 };
  const to = selectPositionTo
    ? {
        lat: parseFloat(selectPositionTo.lat),
        lng: parseFloat(selectPositionTo.lon),
      }
    : { lat: 0, lng: -1.131592 };

  return (
    <div className="container mx-auto p-4">
      {/* Flex container for search and map */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        {/* Left side - Search Box */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <h1 className="text-xl font-semibold mb-2">From</h1>
            <SearchBox
              selectPosition={selectPosition}
              setSelectedPosition={setSelectedPosition}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold mb-2">To</h1>
            <SearchBox
              selectPosition={selectPositionTo}
              setSelectedPosition={setSelectedPositionTo}
            />
          </div>
        </div>

        {/* Right side - Map */}
        <div className="w-full lg:w-2/3">
          <div className="relative border-4 border-gray-400 rounded-lg w-full h-[500px]">
            <MapContainer
              center={[52.629729, -1.131592]}
              zoom={14}
              className="w-full h-full rounded-lg"
            >
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                maxZoom={20}
              />
              <HeatMapLayer data={crimeData} />

              {from && from.lat && from.lng && (
                <Marker
                  position={[from.lat, from.lng]}
                  icon={
                    new L.Icon({
                      iconUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  }
                >
                  <Popup>From location</Popup>
                </Marker>
              )}

              {to && to.lat && to.lng && (
                <Marker
                  position={[to.lat, to.lng]}
                  icon={
                    new L.Icon({
                      iconUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  }
                >
                  <Popup>To location</Popup>
                </Marker>
              )}

              {from && to && from.lat && from.lng && to.lat && to.lng && (
                <RoutingLayer from={from} to={to} />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
