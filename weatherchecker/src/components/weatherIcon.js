import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiDayCloudy,
  WiCloud,
  WiRainMix,
} from "weather-icons-react";

const WeatherIcon = ({ description, size }) => {
  const getWeatherIcon = (description) => {
    switch (description) {
      case "słabe opady deszczu":
        return <WiRain size={size} color="#fff" />;
      case "zachmurzenie umiarkowane":
        return <WiCloud size={size} color="#fff" />;
      case "zachmurzenie małe":
        return <WiDayCloudy size={size} color="#fff" />;
      case "zachmurzenie duże":
        return <WiCloudy size={size} color="#fff" />;
      case "pochmurnie":
        return <WiCloudy size={size} color="#fff" />;
      case "umiarkowane opady deszczu":
        return <WiRainMix size={size} color="#fff" />;
      default:
        return <WiDaySunny size={size} color="#fff" />;
    }
  };

  return getWeatherIcon(description);
};

export default WeatherIcon;
