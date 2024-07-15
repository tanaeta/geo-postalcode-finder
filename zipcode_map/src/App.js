import React, { useState } from 'react';
import MapComponent from './components/MapComponent.js';

const App = () => {
  const [geoJson, setGeoJson] = useState(null);

  const handleShapeDrawn = async (geoJsonData) => {
    setGeoJson(geoJsonData);
    await fetchPostalCodes(geoJsonData);
  };

  const fetchPostalCodes = async (geoJson) => {
    try {
      //const response = await fetch('/api/postalcodes', {
      const response = await fetch('http://localhost:3001/api/postalcodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geoJson }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch postal codes:', error);
    }
  };

  return (
    <div>
      <MapComponent onShapeDrawn={handleShapeDrawn} />
      {geoJson && <pre>{JSON.stringify(geoJson, null, 2)}</pre>}
    </div>
  );
};

export default App;