import React, { useState } from 'react';
import MapComponent from './components/MapComponent.js';

const App = () => {
  const [geoJson, setGeoJson] = useState({ features: [] });
  const [postalCodes, setPostalCodes] = useState([]);
  // 選択された郵便番号の詳細情報を保持するための状態
  const [selectedPostalCode, setSelectedPostalCode] = useState(null);

  const handleShapeDrawn = async (geoJsonData) => {
    setGeoJson(geoJsonData);
    await fetchPostalCodes(geoJsonData);
  };

  const fetchPostalCodes = async (geoJson) => {
    try {
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
      setPostalCodes(data);
    } catch (error) {
      console.error('Failed to fetch postal codes:', error);
    }
  };

  // 郵便番号がクリックされたときの処理
  const handlePostalCodeClick = (postalCode) => {
    setSelectedPostalCode(postalCode);
  };

  return (
    <div>
      <MapComponent onShapeDrawn={handleShapeDrawn} />
      {/* 郵便番号をリストで表示 */}
      <ul>
        {postalCodes.map((postalCode, index) => (
          <li key={index} onClick={() => handlePostalCodeClick(postalCode)}>
            {postalCode.id}
          </li>
        ))}
      </ul>
      {/* 選択された郵便番号の詳細情報を表示 */}
      {selectedPostalCode && (
        <div>
          <h2>郵便番号詳細</h2>
          <p>ID: {selectedPostalCode.id}</p>
          {/* 他の詳細情報もここに表示 */}
        </div>
      )}
    </div>
  );
};

export default App;