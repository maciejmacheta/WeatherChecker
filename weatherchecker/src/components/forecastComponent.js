import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiDayCloudy,
  WiCloud,
  WiRainMix,
} from "weather-icons-react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ForecastComponent = ({ data }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainer = useRef(null);

  const checkScrollButtons = () => {
    const container = scrollContainer.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainer.current;
    container.addEventListener("scroll", checkScrollButtons);
    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -350, behavior: "smooth" });
    checkScrollButtons();
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 350, behavior: "smooth" });
    checkScrollButtons();
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case "słabe opady deszczu":
        return <WiRain size={50} color="#000" />;
      case "zachmurzenie umiarkowane":
        return <WiCloud size={50} color="#000" />;
      case "zachmurzenie małe":
        return <WiDayCloudy size={50} color="#000" />;
      case "zachmurzenie duże":
        return <WiCloudy size={50} color="#000" />;
      case "pochmurnie":
        return <WiCloudy size={50} color="#000" />;
      case "umiarkowane opady deszczu":
        return <WiRainMix size={50} color="#000" />;
      default:
        return <WiDaySunny size={50} color="#000" />;
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={scrollLeft}
        aria-label="scroll left"
        style={{ visibility: showLeftArrow ? "visible" : "hidden" }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        ref={scrollContainer}
        sx={{ display: "flex", overflowX: "auto", padding: 2 }}
      >
        {data.list.map((forecast, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "#F5F5DC",
              minWidth: 250,
              margin: 1,
              flexShrink: 0,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2" component="div" gutterBottom>
                  {new Date(forecast.dt_txt).toLocaleDateString("pl-PL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Typography variant="subtitle2" component="div" gutterBottom>
                  {new Date(forecast.dt_txt).toLocaleTimeString("pl-PL", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
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
      <IconButton
        onClick={scrollRight}
        aria-label="scroll right"
        style={{ visibility: showRightArrow ? "visible" : "hidden" }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default ForecastComponent;
