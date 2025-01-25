import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Slider,
  Typography,
  Tooltip,
} from "@mui/material";

/**
 * Filters Component
 * Allows users to apply filters to refine dog search results.
 *
 * Props:
 * - breeds (Array): List of available breeds for filtering.
 * - filters (Object): Current filter state (e.g., breed, zip code, age range, etc.).
 * - setFilters (Function): Updates the global filter state.
 * - fetchDogs (Function): Fetches dogs based on the applied filters.
 */
const Filters = ({ breeds, filters, setFilters, fetchDogs }) => {
  // Local state to manage temporary filter changes before applying
  const [tempFilters, setTempFilters] = useState({ ...filters });

  /**
   * Handles input field changes.
   * Updates temporary filter state.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: name === "resultsPerPage" ? parseInt(value, 10) : value,
    }));
  };

  /**
   * Handles slider changes for the age range filter.
   */
  const handleSliderChange = (e, newValue) => {
    setTempFilters((prev) => ({
      ...prev,
      ageMin: newValue[0],
      ageMax: newValue[1],
    }));
  };

  /**
   * Applies the selected filters.
   * Updates global filter state and fetches filtered data.
   */
  const applyFilters = () => {
    setFilters(tempFilters);
    fetchDogs();
  };

  /**
   * Resets all filters to their default values.
   * Updates global filter state and fetches unfiltered data.
   */
  const clearFilters = () => {
    const defaultFilters = {
      breed: "",
      zipCode: "",
      ageMin: 0,
      ageMax: 20,
      sort: "breed:asc",
      resultsPerPage: 10,
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    fetchDogs();
  };

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#3f51b5", fontWeight: "bold" }}
      >
        Filter Your Search
      </Typography>

      {/* Filters Grid */}
      <Grid container spacing={2}>
        {/* Breed Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <Tooltip title="Select a breed to filter results" arrow>
            <TextField
              select
              label="Breed"
              name="breed"
              value={tempFilters.breed}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
              }}
            >
              <MenuItem value="">All Breeds</MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
        </Grid>

        {/* Zip Code Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <Tooltip title="Enter a zip code to find dogs near you" arrow>
            <TextField
              label="Zip Code"
              name="zipCode"
              value={tempFilters.zipCode}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
              }}
            />
          </Tooltip>
        </Grid>

        {/* Age Range Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography gutterBottom>Age Range</Typography>
          <Slider
            value={[tempFilters.ageMin, tempFilters.ageMax]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={0}
            max={20}
            sx={{
              color: "#3f51b5",
            }}
          />
        </Grid>

        {/* Results Per Page Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Results Per Page"
            name="resultsPerPage"
            value={tempFilters.resultsPerPage}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
            }}
          >
            {[10, 20, 30, 50].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Sort Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Sort By"
            name="sort"
            value={tempFilters.sort}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3f51b5",
              },
            }}
          >
            <MenuItem value="breed:asc">Breed (A-Z)</MenuItem>
            <MenuItem value="breed:desc">Breed (Z-A)</MenuItem>
            <MenuItem value="name:asc">Name (A-Z)</MenuItem>
            <MenuItem value="name:desc">Name (Z-A)</MenuItem>
            <MenuItem value="age:asc">Age (Youngest First)</MenuItem>
            <MenuItem value="age:desc">Age (Oldest First)</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilters}
          sx={{
            backgroundColor: "#3f51b5",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearFilters}
          sx={{
            borderColor: "#f50057",
            color: "#f50057",
            "&:hover": {
              borderColor: "#d4004c",
              color: "#d4004c",
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;