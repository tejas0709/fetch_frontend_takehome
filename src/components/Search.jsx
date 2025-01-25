import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Filters from "./Filters";
import DogGrid from "./DogGrid";
import Pagination from "./Pagination";
import MatchModal from "./MatchModal";

/**
 * Search Component
 * 
 * Allows users to filter, search, and view a paginated list of dogs. 
 * Displays a match modal for a successful match.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userName - Name of the logged-in user.
 * @param {Function} props.fetchDogs - Function to fetch dogs based on filters and pagination.
 * @param {Function} props.fetchBreeds - Function to fetch the list of available dog breeds.
 * @param {Function} props.handleFavorite - Function to handle marking a dog as favorite.
 * @param {Array} props.favorites - Array of favorite dogs.
 */
const Search = ({ userName, fetchDogs, fetchBreeds, handleFavorite, favorites }) => {
  // State variables
  const [filters, setFilters] = useState({ breed: "", zipCode: "", ageMin: 0, ageMax: 20 }); // Search filters
  const [dogs, setDogs] = useState([]); // List of dogs
  const [breeds, setBreeds] = useState([]); // List of available breeds
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [match, setMatch] = useState(null); // Dog match for the modal
  const [loading, setLoading] = useState(false); // Loading state

  /**
   * Fetch and set the list of available dog breeds on component mount.
   */
  useEffect(() => {
    const loadBreeds = async () => {
      const data = await fetchBreeds();
      setBreeds(data);
    };
    loadBreeds();
  }, [fetchBreeds]);

  /**
   * Fetch and set the list of dogs whenever filters or current page change.
   */
  useEffect(() => {
    const loadDogs = async () => {
      setLoading(true); // Show loader while fetching
      const params = {
        ...filters,
        size: 10, // Number of dogs per page
        from: (currentPage - 1) * 10, // Offset for pagination
        sort: "breed:asc", // Sort order
      };
      const { dogs: loadedDogs, totalPages: total } = await fetchDogs(params);
      setDogs(loadedDogs);
      setTotalPages(total);
      setLoading(false); // Hide loader after fetching
    };
    loadDogs();
  }, [filters, currentPage, fetchDogs]);

  return (
    <Box sx={{ mt: 4 }}>
      {/* Welcome message */}
      <Typography variant="h4" gutterBottom>
        Welcome, {userName}!
      </Typography>

      {/* Filters component for setting search criteria */}
      <Filters
        breeds={breeds}
        filters={filters}
        setFilters={setFilters}
        fetchDogs={() => setCurrentPage(1)} // Reset to page 1 when filters change
      />

      {/* Show loader or dog grid with pagination */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
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
        </>
      )}

      {/* Match modal */}
      {match && <MatchModal match={match} onClose={() => setMatch(null)} />}
    </Box>
  );
};

export default Search;
