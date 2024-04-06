import axios from "axios";
import { apiKey } from "./openWeatherMapApi";

export const fetchWeather = async (cityName, setForecast, setIsLoading) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pl`;

  try {
    const response = await axios.get(url);
    setIsLoading(false);
    setForecast(response.data);
  } catch (error) {
    console.error("Błąd przy uzyskiwaniu danych pogodowych: ", error);
  }
};

export const fetchAirQuality = async (lat, lon, setAirQuality) => {
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    setAirQuality(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(
      "Błąd przy uzyskiwaniu danych o zanieczyszczeniu powietrza: ",
      error
    );
  }
};

export const fetchCurrentWeather = async (
  city,
  setCurrentWeather,
  setIsLoading
) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

  try {
    const response = await axios.get(url);
    setCurrentWeather(response.data);
    setIsLoading(false);
  } catch (error) {
    console.error("Błąd przy uzyskiwaniu danych pogodowych: ", error);
    setIsLoading(false);
  }
};
