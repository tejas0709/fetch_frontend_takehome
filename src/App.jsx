import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Login from "./components/Login";
import Filters from "./components/Filters";
import DogGrid from "./components/DogGrid";
import Pagination from "./components/Pagination";
import Favorites from "./components/Favorites";
import MatchModal from "./components/MatchModal";

// Define the Material-UI theme
const theme = createTheme({
  palette: {
    primary: { main: "#ff8c00" },
    secondary: { main: "#f50057" },
    background: {
      default: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
          minHeight: "100vh",
          paddingTop: "64px",
        },
      },
    },
  },
});

// API base URL
const API_BASE = "https://frontend-take-home-service.fetch.com";

function App() {
  // State variables
  const [user, setUser] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [breeds, setBreeds] = useState([]);
  const [filters, setFilters] = useState({
    breed: "",
    zipCode: "",
    ageMin: 0,
    ageMax: 20,
    sort: "breed:asc",
    resultsPerPage: 10,
  });
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch dog breeds when user logs in
  useEffect(() => {
    if (user) fetchBreeds();
  }, [user]);

  // Fetch available dog breeds
  const fetchBreeds = async () => {
    try {
      const response = await axios.get(`${API_BASE}/dogs/breeds`, { withCredentials: true });
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds:", error.message);
    }
  };

  // Fetch dogs based on filters and pagination
  const fetchDogs = useCallback(async () => {
    try {
      setLoading(true);
      const { breed, zipCode, ageMin, ageMax, sort, resultsPerPage } = filters;

      const params = {
        breeds: breed ? [breed] : undefined,
        zipCodes: zipCode ? [zipCode] : undefined,
        ageMin,
        ageMax,
        size: resultsPerPage,
        from: (currentPage - 1) * resultsPerPage,
        sort,
      };

      // Fetch dog IDs based on search criteria
      const searchResponse = await axios.get(`${API_BASE}/dogs/search`, {
        params,
        withCredentials: true,
      });

      const ids = searchResponse.data.resultIds;

      // Fetch dog details using IDs
      const dogDataResponse = await axios.post(`${API_BASE}/dogs`, ids, {
        withCredentials: true,
      });

      setDogs(dogDataResponse.data);
      setTotalPages(Math.ceil(searchResponse.data.total / resultsPerPage));
    } catch (error) {
      console.error("Error fetching dogs:", error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  // Trigger dog fetching when user or filters change
  useEffect(() => {
    if (user) fetchDogs();
  }, [user, fetchDogs]);

  // Handle user login
  const handleLogin = async (name, email) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/auth/login`, { name, email }, { withCredentials: true });
      setUser({ name, email });
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Toggle a dog in the favorites list
  const handleFavorite = (dog) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === dog.id)
        ? prevFavorites.filter((fav) => fav.id !== dog.id)
        : [...prevFavorites, dog]
    );
  };

  // Match user with the most compatible dog from favorites
  const handleMatch = async () => {
    try {
      const ids = favorites.map((dog) => dog.id);
      const response = await axios.post(`${API_BASE}/dogs/match`, ids, { withCredentials: true });
      setMatch(dogs.find((dog) => dog.id === response.data.match));
    } catch (error) {
      console.error("Error matching dog:", error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh" }}>
        {user && (
          <AppBar
            position="fixed"
            sx={{
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1201,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                Fetch Dog Finder
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <Container sx={{ mt: user ? 8 : 0 }}>
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "70vh",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Filters
                breeds={breeds}
                filters={filters}
                setFilters={setFilters}
                fetchDogs={() => setCurrentPage(1)}
              />
              <DogGrid
                dogs={dogs}
                favorites={favorites}
                onFavorite={handleFavorite}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
              <Favorites
                favorites={favorites}
                onMatch={handleMatch}
                onRemoveFavorite={handleFavorite}
              />
              {match && <MatchModal match={match} onClose={() => setMatch(null)} />}
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
