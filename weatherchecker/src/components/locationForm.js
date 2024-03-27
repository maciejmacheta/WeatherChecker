import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';

const LocationForm = ({ onSubmit, initialCity }) => {
  const [city, setCity] = useState(initialCity);

  useEffect(() => {
    setCity(initialCity);
  }, [initialCity]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom textAlign="center" sx={{ marginBottom: "2rem" }}>
        Bądź przygotowany, sprawdź najbliższą pogodę!
      </Typography>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <TextField
          label="Wpisz miasto"
          variant="outlined"
          value={city}
          onChange={handleCityChange}
          sx={{ width: "250px", marginRight: "2px", backgroundColor: '#fff' }}
        />
        <Button
          sx={{
            height: "56px",
            whiteSpace: "nowrap",
            backgroundColor: '#1b4779',
            color: '#fff',
            marginBottom: "4rem"
          }}
          type="submit"
          variant="contained"
        >
        <SearchIcon/>
        </Button>
      </form>
    </div>
  );
};

export default LocationForm;
