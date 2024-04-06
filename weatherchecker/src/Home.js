import React, { useState, useEffect } from "react";
import { apiKey } from "./hooks/openWeatherMapApi";
import { useMediaQueries } from "./hooks/useMediaQueries";
import {
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import LocationForm from "./components/locationForm";
import WeatherForecast from "./components/weatherForecast";
import LocationService from "./hooks/locationService";
import CurrentWeather from "./components/currentWeather";
import CityCoordinatesFetcher from "./hooks/cityCoordinatesFetcher";
import { fetchWeather, fetchAirQuality } from "./hooks/openWeatherMapFunctions"; 

const Home = () => {
  const { matches, matchesMSmall, matchesMedium } = useMediaQueries();
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  const [lat, setLatitude] = useState(null);
  const [lon, setLongitude] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        setIsLocationAllowed(permissionStatus.state === "granted");
      });
  }, []);

  const handleLocationChange = (newCity) => {
    setCity(newCity);
    setIsLoading(true);
  };

  return (
    <div className="p-4">
      <Paper elevation={5}>
        <LocationForm onSubmit={handleLocationChange} initialCity={city} />
      </Paper>
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
              variant="overline"
              gutterBottom
              textAlign="flex-start"
              sx={{
                fontSize: matches ? "15px" : "30px",
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
        apiKey={apiKey}
        onCoordsReceived={({ lat, lon }) => {
          setLatitude(lat);
          setLongitude(lon);
          fetchWeather(city, setForecast, setIsLoading);
          fetchAirQuality(lat, lon, setAirQuality);
        }}
      />
    </div>
  );
};

export default Home;
