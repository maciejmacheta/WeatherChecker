import { useMediaQuery } from "@mui/material";

export function useMediaQueries() {
  const matches = useMediaQuery("(max-width:600px)");
  const matchesMSmall = useMediaQuery("(max-width:920px)");
  const matchesMedium = useMediaQuery("(max-width:1200px)");

  return {
    matches,
    matchesMSmall,
    matchesMedium,
  };
}
