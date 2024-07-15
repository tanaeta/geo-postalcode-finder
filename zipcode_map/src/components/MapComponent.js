import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const MapComponent = ({ onShapeDrawn }) => {
  const handleCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      onShapeDrawn(layer.toGeoJSON());
    }
  };

  return (
    <MapContainer center={[35.689481, 139.691686]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;