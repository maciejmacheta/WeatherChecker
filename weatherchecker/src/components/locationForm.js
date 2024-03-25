import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; // Dodano import komponentu Typography

const LocationForm = ({ onSubmit }) => {
  const [city, setCity] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom textAlign="center" sx={{ marginBottom: "2rem" }}>
        Bądź przygotowany, sprawdź najbliższą pogodę!
      </Typography>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <TextField
          label="Wpisz miasto"
          variant="filled"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ width: "250px", marginRight: "1%", 
          backgroundColor: '#F5F5DC', }}
        />
        <Button
          sx={{
            height: "56px",
            whiteSpace: "nowrap",
            backgroundColor: '#F5F5DC',
            color: '#000',
            marginBottom: "4rem"
          }}
          type="submit"
          variant="contained"
        >
          Sprawdź pogodę
        </Button>
      </form>
    </div>
  );
};

export default LocationForm;
