import React from 'react';

const WeatherTranslation = ({ weatherDescription }) => {
  const weatherDescriptionsPL = {
    'clear sky': 'Czyste niebo',
    'few clouds': 'Małe zachmurzenie',
    'scattered clouds': 'Rozproszone chmury',
    'broken clouds': 'Rozproszone chmury',
    'shower rain': 'Przelotny deszcz',
    'rain': 'Deszcz',
    'thunderstorm': 'Burza',
    'snow': 'Śnieg',
    'mist': 'Mgła',
  };

  const weatherDescriptionPL = weatherDescriptionsPL[weatherDescription] || weatherDescription;

  return <>{weatherDescriptionPL}</>;
};

export default WeatherTranslation;
