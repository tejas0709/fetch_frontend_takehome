import React from "react";
import { Grid, Skeleton } from "@mui/material";
import DogCard from "./DogCard";

/**
 * DogGrid Component
 * Renders a grid layout of dog cards or skeleton placeholders when loading.
 *
 * Props:
 * - dogs (Array): List of dog objects to display (each object contains id, name, breed, etc.).
 * - favorites (Array): List of favorite dogs.
 * - onFavorite (Function): Callback to handle adding/removing a dog from favorites.
 * - loading (Boolean): Indicates whether the data is still loading.
 */
const DogGrid = ({ dogs, favorites, onFavorite, loading }) => {
  return (
    <Grid container spacing={3}>
      {loading
        ? // Render placeholder skeletons when loading
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{ borderRadius: 2 }} // Add rounded corners to match the card style
              />
            </Grid>
          ))
        : // Render dog cards when data is available
          dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard
                dog={dog}
                favorites={favorites}
                onFavorite={onFavorite}
              />
            </Grid>
          ))}
    </Grid>
  );
};

export default DogGrid;
