import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { WiDaySunny, WiCloudy, WiRain, WiDayCloudy, WiCloud, WiRainMix } from "weather-icons-react"; // Upewnij się, że zaimportowano odpowiednie ikony pogody

const ForecastComponent = ({ data }) => {
  // Funkcja zwracająca odpowiednią ikonę pogody na podstawie opisu
  const getWeatherIcon = (description) => {
    switch (description) {
      case "słabe opady deszczu":
        return <WiRain size={50} color='#000' />;
      case "zachmurzenie umiarkowane":
        return <WiCloud size={50} color='#000' />;
      case "zachmurzenie małe":
        return <WiDayCloudy size={50} color='#000' />;
      case "zachmurzenie duże":
        return <WiCloudy size={50} color='#000' />;
      case "pochmurnie":
        return <WiCloudy size={50} color='#000' />;
      case "umiarkowane opady deszczu":
        return <WiRainMix size={50} color='#000' />;
      // Dodaj więcej przypadków dla różnych opisów pogody
      default:
        return <WiDaySunny size={50} color='#000' />;
    }
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {data.list.map((forecast, index) => (
        <Card key={index} sx={{ minWidth: 250, margin: 1, flexShrink: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography variant="subtitle2" component="div" gutterBottom>
                {new Date(forecast.dt_txt).toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Typography variant="subtitle2" component="div" gutterBottom>
                {new Date(forecast.dt_txt).toLocaleTimeString('pl-PL', { hour: 'numeric', minute: 'numeric' })}
              </Typography>
              {getWeatherIcon(forecast.weather[0].description)}
              <Typography variant="h6" component="div">
                {`${forecast.main.temp.toFixed(1)}°C`}
              </Typography>
              <Typography color="textSecondary">
                {forecast.weather[0].description}
              </Typography>
              <Typography variant="body2">
                {`Wiatr: ${forecast.wind.speed} m/s`}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ForecastComponent;
