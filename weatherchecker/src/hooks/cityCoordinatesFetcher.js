import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityCoordinatesFetcher = ({ cityName, onCoordsReceived, apiKey }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    const getCityCoords = async () => {
      const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;

      try {
        const response = await axios.get(geocodingUrl);
        const data = response.data[0];
        if (data) {
          const { lat, lon } = data;
          onCoordsReceived({ lat, lon });
        } else {
          setError('Nie znaleziono miasta.');
        }
      } catch (error) {
        console.error("Błąd przy uzyskiwaniu współrzędnych miasta: ", error);
        setError('Błąd przy uzyskiwaniu współrzędnych miasta.');
      }
    };

    getCityCoords();
  }, [cityName, apiKey]);

  if (error) {
    return <div>Wystąpił błąd: {error}</div>;
  }

  return null;
};

export default CityCoordinatesFetcher;
