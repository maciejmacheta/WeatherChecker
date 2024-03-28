// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery"; // Importujemy hook useMediaQuery
import CircularProgress from "@mui/material/CircularProgress"; // Importujemy komponent ładowania

import logo from "./assets/logo.png";
import LocationForm from "./components/locationForm";
import WeatherForecast from "./components/weatherForecast";
import LocationService from "./components/locationService";
import CurrentWeather from "./components/currentWeather";
import AirPollution from "./components/airPollution";
import CityCoordinatesFetcher from "./components/cityCoordinatesFetcher";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  const [lat, setLatitude] = useState(null);
  const [lon, setLongitude] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width:1000px)"); // Używamy useMediaQuery do sprawdzenia szerokości ekranu

  const api = "1000b00bb102f66f8cb2fd52d4c6a4df";

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        setIsLocationAllowed(permissionStatus.state === "granted");
      });
  }, []);

  const fetchWeather = async (cityName) => {
    const apiKey = api;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`;

    try {
      const response = await axios.get(url);
      setIsLoading(false);
      setForecast(response.data);
    } catch (error) {
      console.error("Błąd przy uzyskiwaniu danych pogodowych: ", error);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    const apiKey = api; // Użyj swojego klucza API
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setAirQuality(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(
        "Błąd przy uzyskiwaniu danych o zanieczyszczeniu powietrza: ",
        error
      );
    }
  };

  const handleLocationChange = (newCity) => {
    setCity(newCity);
    setIsLoading(true);
  };
  

  return (
    <div className="p-4">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        direction={isSmallScreen ? "column" : "row"}
      >
        <Grid item xs={12} textAlign="center">
          <img src={logo} alt="Logo" style={{ width: 250, height: 250 }} />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LocationForm onSubmit={handleLocationChange} initialCity={city} />
        </Grid>
      </Grid>
      {isLocationAllowed && isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h4" gutterBottom textAlign="center">
            Trwa ładowanie prognozy pogody...
          </Typography>
        </div>
      ) : (
        <div>
          <CurrentWeather city={city} data={airQuality} />

          {city && (
            <Typography
              variant="h4"
              gutterBottom
              textAlign="flex-start"
              sx={{
                marginLeft: "3%",
              }}
            >
              Prognoza pogody dla {city}
            </Typography>
          )}
          <WeatherForecast forecast={forecast} isLoading={isLoading} />
        </div>
      )}
      <LocationService onLocationChange={handleLocationChange} />
      <CityCoordinatesFetcher
  cityName={city}
  apiKey={api}
  onCoordsReceived={({ lat, lon }) => {
    setLatitude(lat);
    setLongitude(lon);
    fetchWeather(city);
    fetchAirQuality(lat, lon);
  }}
/>
    </div>
  );
};

export default Home;
