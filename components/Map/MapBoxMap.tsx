"use client";  // ✅ Ensures this is a client component

import React from "react";
import Map from "react-map-gl"; // or "react-map-gl/maplibre" if using MapLibre

function MapBoxMap() {
  return (
    <div>
      <Map
        mapboxAccessToken="<Mapbox access token>"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}

export default MapBoxMap;
