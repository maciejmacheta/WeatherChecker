import React from 'react';
import WeatherTranslation from './weatherTranslation';

const WeatherComponent = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      {data.main && (
        <>
          <p>Temperatura: {data.main.temp}°C</p>
          <p>Warunki: <WeatherTranslation weatherDescription={data.weather[0].description} /></p>
          <p>Wiatr: {data.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
