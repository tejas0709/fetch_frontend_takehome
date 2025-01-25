import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

/**
 * Favorites Component
 * Displays a list of the user's favorite dogs or a placeholder message when no favorites exist.
 *
 * Props:
 * - favorites (Array): List of favorite dogs (each object contains id, name, breed, etc.).
 * - onMatch (Function): Callback to handle the "Find My Match" action.
 * - onRemoveFavorite (Function): Callback to remove a dog from favorites.
 */
const Favorites = ({ favorites, onMatch, onRemoveFavorite }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Section Title */}
      <Typography variant="h5" component="h2" gutterBottom>
        Your Favorite Dogs
      </Typography>

      {favorites.length > 0 ? (
        <>
          {/* Render favorite dogs as cards in a responsive grid */}
          <Grid container spacing={3}>
            {favorites.map((dog) => (
              <Grid item xs={12} sm={6} md={4} key={dog.id}>
                <Card>
                  {/* Dog image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={dog.img}
                    alt={dog.name}
                  />
                  <CardContent>
                    {/* Dog details */}
                    <Typography variant="h6">{dog.name}</Typography>
                    <Typography variant="body2">Breed: {dog.breed}</Typography>
                    <Typography variant="body2">Age: {dog.age} years</Typography>
                    <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>

                    {/* Remove button */}
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => onRemoveFavorite(dog)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* "Find My Match" button */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={onMatch}>
              Find My Match
            </Button>
          </Box>
        </>
      ) : (
        // Placeholder content when no favorites exist
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <img
            src="/assets/favorites.jpg"
            alt="No Favorites"
            style={{ width: "10%" }}
          />
          <Typography variant="body1">
            No dogs in your favorites yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Favorites;
