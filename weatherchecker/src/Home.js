import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery'; // Importujemy hook useMediaQuery

import logo from "./assets/logo.png";
import LocationForm from "./components/locationForm";
import WeatherForecast from "./components/weatherForecast";
import LocationService from "./components/locationService";

const Home = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);

  const isSmallScreen = useMediaQuery('(max-width:1000px)'); // Używamy useMediaQuery do sprawdzenia szerokości ekranu

  const fetchWeather = async (cityName) => {
    const apiKey = "1000b00bb102f66f8cb2fd52d4c6a4df";
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`;

    try {
      const response = await axios.get(url);
      setForecast(response.data);
    } catch (error) {
      console.error("Błąd przy uzyskiwaniu danych pogodowych: ", error);
    }
  };

  const handleLocationChange = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="p-4">
      <Grid container spacing={0} justifyContent="center" alignItems="center" direction={isSmallScreen ? 'column' : 'row'}>
        <Grid item xs={12} textAlign="center">
          <img src={logo} alt="Logo" style={{ width: 250, height: 250 }} /> 
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LocationForm onSubmit={handleLocationChange} />
        </Grid>
      </Grid>
      {city && (
        <Typography variant="h4" gutterBottom textAlign="flex-start" sx={{
          marginLeft: "3rem"
        }}>
          Prognoza pogody dla {city}
        </Typography>
      )}
      <WeatherForecast forecast={forecast} />
      <LocationService onLocationChange={handleLocationChange} />
    </div>
  );
};

export default Home;
