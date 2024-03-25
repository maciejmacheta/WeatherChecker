import { useEffect } from "react";
import axios from "axios";

const LocationService = ({ onLocationChange }) => {
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
              const cityName = response.data.city;
              if (cityName) {
                onLocationChange(cityName);
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
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz

  return null;
};

export default LocationService;
