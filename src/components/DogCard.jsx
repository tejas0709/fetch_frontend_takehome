import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

/**
 * DogCard Component
 * Displays a card with information about a dog, including name, breed, age, and zip code.
 * Users can double-click the card or use the favorite button to add/remove the dog from favorites.
 *
 * Props:
 * - dog (Object): The dog data (id, name, breed, age, zip_code, img).
 * - favorites (Array): List of favorite dogs.
 * - onFavorite (Function): Callback to handle adding/removing a dog from favorites.
 */
const DogCard = ({ dog, favorites, onFavorite }) => {
  // Check if the current dog is marked as a favorite
  const isFavorite = favorites.some((fav) => fav.id === dog.id);

  // Handle double-click event to toggle the favorite status
  const handleDoubleClick = () => {
    onFavorite(dog);
  };

  return (
    <Card
      onDoubleClick={handleDoubleClick}
      sx={{
        maxWidth: 345, // Limit the card width
        position: "relative", // Enable absolute positioning for the favorite button
        boxShadow: 3, // Add a default shadow
        transition: "transform 0.3s, box-shadow 0.3s", // Smooth animations for hover effects
        "&:hover": {
          transform: "scale(1.05)", // Slightly enlarge the card on hover
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Add a deeper shadow
        },
      }}
    >
      {/* Display the dog's image */}
      <CardMedia component="img" height="200" image={dog.img} alt={dog.name} />

      <CardContent>
        {/* Dog name with bold styling */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {dog.name}
        </Typography>

        {/* Dog details */}
        <Typography variant="body2">Breed: {dog.breed}</Typography>
        <Typography variant="body2">Age: {dog.age} years</Typography>
        <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>

        {/* Favorite button with tooltip */}
        <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
          <IconButton
            onClick={() => onFavorite(dog)} // Toggle favorite status on button click
            color={isFavorite ? "secondary" : "default"}
            sx={{
              position: "absolute", // Position the button at the top-right of the card
              top: 8,
              right: 8,
              transition: "color 0.3s", // Smooth color transition
            }}
          >
            {/* Show a filled heart icon if favorite, otherwise an outlined heart */}
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default DogCard;
