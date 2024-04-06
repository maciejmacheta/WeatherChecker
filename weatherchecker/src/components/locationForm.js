import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQueries } from "../hooks/useMediaQueries";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import logo from "../assets/logo.png";

const LocationForm = ({ onSubmit, initialCity }) => {
  const { matches, matchesMSmall, matchesMedium } = useMediaQueries();
  const [city, setCity] = useState(initialCity);

  useEffect(() => {
    setCity(initialCity);
  }, [initialCity]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: matchesMedium ? "column" : "row",
        backgroundColor: "#fff",
        marginBottom: "5%",
      }}
    >
      <Grid
        item
        xs={matches || matchesMedium ? 12 : 2}
        sx={{ marginLeft: matches ? 0 : "2%" }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 130,
            height: 130,
            marginLeft: matches || matchesMedium ? 0 : "2%",
          }}
        />
      </Grid>
      <Grid item xs={matches || matchesMedium ? 12 : 6}>
        <Typography
          color="#1b4779"
          variant="overline"
          fontSize={matches ? "12px" : "20px"}
          textAlign="center"
        >
          Bądź przygotowany, sprawdź najbliższą pogodę!
        </Typography>
      </Grid>
      <Grid item xs={matches || matchesMedium ? 12 : 3}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <TextField
            label="Wpisz miasto"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{
              width: matches ? "75vw" : "300px",
              marginRight: "2%",
              backgroundColor: "#fff",
              marginBottom: matchesMedium ? "10px" : 0,
            }}
          />
          <Button
            sx={{
              height: "56px",
              whiteSpace: "nowrap",
              backgroundColor: "#1b4779",
              color: "#fff",
            }}
            type="submit"
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LocationForm;
