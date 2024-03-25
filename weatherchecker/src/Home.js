import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ForecastComponent from "./components/forecastComponent"; // Import nowego komponentu prognozy pogody

const Home = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null); // Zmieniono state na prognozę pogody

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const cityName = response.data.city;
              if (cityName) {
                setCity(cityName);
                fetchWeather(cityName);
              }
            } catch (error) {
              console.error("Błąd przy uzyskiwaniu lokalizacji: ", error);
            }
          },
          () => {
            console.error("Nie udało się uzyskać lokalizacji");
          }
        );
      } else {
        console.error(
          "Geolokalizacja nie jest wspierana przez tę przeglądarkę."
        );
      }
    };

    fetchLocationAndWeather();
  }, []);

  const fetchWeather = async (cityName) => {
    const apiKey = "1000b00bb102f66f8cb2fd52d4c6a4df";
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`; // Zmodyfikowano URL zapytania

    try {
      const response = await axios.get(url);
      setForecast(response.data); // Zmieniono ustawianie danych na prognozę pogody
    } catch (error) {
      console.error("Błąd przy uzyskiwaniu danych pogodowych: ", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <TextField
          label="Wpisz miasto"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full"
        />
        <Button type="submit" variant="contained" color="primary">
          Pobierz pogodę
        </Button>
      </form>
      {forecast && <ForecastComponent data={forecast} />} {/* Wyświetl prognozę pogody */}
    </div>
  );
};
export default Home;
