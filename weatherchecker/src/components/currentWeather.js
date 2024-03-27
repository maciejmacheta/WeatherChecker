import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  Stack,
  Item,
  useMediaQuery,
} from "@mui/material";
import WeatherIcon from "./weatherIcon";

const CurrentWeather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("(max-width:600px)"); // Sprawdza, czy szerokość ekranu jest mniejsza niż 600px

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const apiKey = "1000b00bb102f66f8cb2fd52d4c6a4df"; // Ustaw swój klucz API
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

    fetchCurrentWeather();
  }, [city]);

  if (!currentWeather) {
    return (
      <Typography variant="h4" gutterBottom textAlign="center">
        Brak danych pogodowych dla {city}.
      </Typography>
    );
  }

  const currentDate = new Date().toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box
      style={{
        backgroundColor: "#1b4779",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "95%",
        margin: "auto",
        marginBottom: "5vh",
      }}
    >
      <Typography
        variant={matches ? "h5" : "h3"}
        gutterBottom
        color="white"
        style={{ margin: "20px 20px 20px" }}
      >
        {city}, {currentDate}
      </Typography>
      <Paper elevation={5} style={{ backgroundColor: "#234f83" }}>
        <Box
          style={{
            margin: "20px",
            padding: "20px",
            alignContent: "center",
            backgroundColor: "#234f83",
            border: "1px solid #355e8e",
            color: "#fff",
          }}
        >
          <Grid container>
            <WeatherIcon
              description={currentWeather.weather[0].description}
              size={matches ? 100 : 160}
            />
            <Typography
              sx={{
                alignContent: "center",
                fontSize: matches ? "60px" : "100px",
                marginLeft: "1%",
              }}
            >
              {Math.round(currentWeather.main.temp)}°C
            </Typography>

            <table style={{ width: "auto", marginLeft: "5%", marginTop: "2%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                    }}
                    colSpan="3"
                  >
                    <Typography
                      sx={{ fontSize: matches ? "20px" : "25px" }}
                      variant="h5"
                    >
                      {capitalizeFirstLetter(
                        currentWeather.weather[0].description
                      )}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ marginBottom: "5px" }}>
                  <td style={{ paddingRight: matches ? "20px" : "100px" }}>
                    <Typography
                      sx={{ fontSize: "15px" }}
                      variant="h5"
                      gutterBottom
                    >
                      Odczuwalna
                      <br />
                      {Math.round(currentWeather.main.feels_like)}°C
                    </Typography>
                  </td>
                  <td style={{ paddingRight: matches ? "20px" : "100px" }}>
                    <Typography
                      sx={{ fontSize: "15px" }}
                      variant="h5"
                      gutterBottom
                    >
                      Wiatr
                      <br />
                      {currentWeather.wind.speed} m/s
                    </Typography>
                  </td>

                  <td>
                    <Typography
                      sx={{ fontSize: "15px" }}
                      variant="h5"
                      gutterBottom
                    >
                      Ciśnienie
                      <br />
                      {currentWeather.main.pressure} hPa
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default CurrentWeather;
