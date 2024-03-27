import React, { useState, useRef, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import WeatherIcon from "./weatherIcon";

const ForecastComponent = ({ data, isLoading }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainer = useRef(null);

  useEffect(() => {
    const checkScrollButtons = () => {
      const container = scrollContainer.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    const container = scrollContainer.current;
    container.addEventListener("scroll", checkScrollButtons);
    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={scrollLeft}
            aria-label="scroll left"
            style={{ visibility: showLeftArrow ? "visible" : "hidden", color: '#224f83' }}
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
                  backgroundColor: "#224f83",
                  color: '#fff',
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
                    <WeatherIcon description={forecast.weather[0].description} size={50}/>
                    <Typography variant="h6" component="div">
                      {`${Math.round(forecast.main.temp.toFixed(1))}°C`}
                    </Typography>
                    <Typography color="#a9b5c7">
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
            style={{ visibility: showRightArrow ? "visible" : "hidden", color: '#224f83'  }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ForecastComponent;
