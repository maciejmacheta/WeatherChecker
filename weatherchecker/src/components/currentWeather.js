import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
} from "@mui/material";
import WeatherIcon from "./weatherIcon";
import AirPollution from "./airPollution";

const CurrentWeather = ({ city, data }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const matches = useMediaQuery("(max-width:600px)");
  const matchesMSmall = useMediaQuery("(max-width:920px)");
  const matchesMedium = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const apiKey = "1000b00bb102f66f8cb2fd52d4c6a4df";
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
    return [null];
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
        variant="overline"
        color="white"
        style={{
          fontSize: matches ? "15px" : "30px",
          margin: "10px 20px 10px",
        }}
      >
        {city}, {currentDate}
      </Typography>
      <Paper
        elevation={5}
        style={{
          display: "flex",
          flexDirection: matches || matchesMSmall || matchesMedium ? "column" : "row",
          backgroundColor: "#234f83",
          padding: "20px",
        }}
      >
        <Box
          style={{
            padding: "20px",
            marginBottom: matches || matchesMSmall ? "5px" : 0,
            width:
              matches || matchesMSmall || matchesMedium? "auto" : "65%",
            alignContent: "center",
            backgroundColor: "#234f83",
            border: "1px solid #355e8e",
            color: "#fff",
          }}
        >
          <Grid container>
            <Grid item>
              <WeatherIcon
                description={currentWeather.weather[0].description}
                size={matches ? 100 : matchesMedium ? 120 : 160}
              />
            </Grid>

            <Grid item>
              <Typography
                sx={{
                  alignContent: "center",
                  fontSize: matches ? "60px" : matchesMedium ? "70px" : "100px",
                  marginLeft: "1%",
                  paddingRight: matches ? "20px" : "50px",
                }}
              >
                {Math.round(currentWeather.main.temp)}°C
              </Typography>
            </Grid>
            <Grid item xs container direction="column">
              <Grid item justifyContent="center">
                <Typography
                  sx={{
                    fontSize: matches ? "20px" : "25px",
                    padding: "20px 0px 20px 0px",
                  }}
                >
                  {capitalizeFirstLetter(currentWeather.weather[0].description)}
                </Typography>
              </Grid>
              <Grid item xs container direction="row">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: matches ? "20px" : "50px",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "10px", color: "#A9B5C7" }}
                  >
                    ODCZUWALNA
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                    variant="h5"
                    gutterBottom
                  >
                    {Math.round(currentWeather.main.feels_like)}°C
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: matches ? "20px" : "50px",
                  }}
                >
                  <Typography sx={{ color: "#A9B5C7" }} variant="caption">
                    WIATR
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                    variant="h5"
                    gutterBottom
                  >
                    {currentWeather.wind.speed} m/s
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                <Typography sx={{ color: "#A9B5C7" }} variant="caption">
                  CIŚNIENIE
                </Typography>
                <Typography sx={{ fontSize: "15px" }} variant="h5" gutterBottom>
                  {currentWeather.main.pressure} hPa
                </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {data && (
          <AirPollution
            data={data}
            style={{ marginTop: matches || matchesMedium ? "10px" : 0 }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default CurrentWeather;
