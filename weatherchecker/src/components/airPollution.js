import React from "react";
import { useMediaQueries } from "../hooks/useMediaQueries";
import { Typography, Box, Container } from "@mui/material";

const AirPollution = ({ data }) => {
  const { matches, matchesMSmall, matchesMedium } = useMediaQueries();

  const aqi = data.list[0].main.aqi;

  const getAQIDescription = (aqi) => {
    if (aqi <= 50) return "Bardzo dobra";
    if (aqi <= 100) return "Dobra";
    if (aqi <= 150) return "Umiarkowana";
    if (aqi <= 200) return "Zła";
    if (aqi <= 300) return "Bardzo zła";
    return "Szkodliwa";
  };

  return (
    <Container
      style={{
        marginTop: matches ? '10px' : 0,
        display: "flex",
        flexDirection: "row",
        width: matches || matchesMSmall || matchesMedium ? '85vw' : matchesMedium ? '50%' : '30%',
        color: "#fff",
        backgroundColor: "#05A83E",
        padding: 0
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#089339",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#089339",
            padding: 2,
            borderRadius: 100,
            border: "3px solid #fff",
            width: "60px",
            height: "60px",
            boxShadow: 1,
          }}
        >
          <Typography variant="h4" sx={{ mb: -1 }}>
            {aqi}
          </Typography>
          <Typography variant="h6">CAQI</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mt: 4 }}>
          <Typography
            variant="caption"
            sx={{ mb: -1, fontSize: "9px", color: "#8AD4A0" }}
          >
            JAKOŚĆ POWIETRZA
          </Typography>
          <Typography variant="overline">{getAQIDescription(aqi)}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", mr: matches? 4 : 6, ml: 2 }}>
            <Typography sx={{ fontSize: "9px", color: "#8AD4A0" }} variant="body2">
              PM 2.5
            </Typography>
            <Typography variant="body2">
              {data.list[0].components.pm2_5}μg/m3
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mr: matches ? 2 : 0}}>
            <Typography sx={{ fontSize: "9px", color: "#8AD4A0" }} variant="body2">
              PM 10
            </Typography>
            <Typography variant="body2">
              {data.list[0].components.pm10}μg/m3
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AirPollution;
