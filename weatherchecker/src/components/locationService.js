import { useEffect, useState } from "react";
import axios from "axios";

const LocationService = ({ onLocationChange }) => {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const city = response.data.city;
              if (city) {
                // Opóźnienie przed ustawieniem nazwy miasta
                setTimeout(() => {
                  setCityName(city);
                  onLocationChange(city);
                }, 1000); // Opóźnienie ustawione na 1 sekundę (1000 ms)
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

    fetchLocation();
  }, []);

  return null;
};

export default LocationService;
