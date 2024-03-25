import React from "react";
import ForecastComponent from "./forecastComponent";

const WeatherForecast = ({ forecast }) => {
  return (
    <div>
      {forecast && <ForecastComponent data={forecast} />}
    </div>
  );
};

export default WeatherForecast;
