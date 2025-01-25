import React, { useEffect, useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Slide,
} from "@mui/material";
import ReactConfetti from "react-confetti";

// ForwardRef component for Slide transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

/**
 * MatchModal component displays a modal when a match is found.
 * Includes a confetti animation and details of the match.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.match - Match details containing name, image, breed, age, and zip code.
 * @param {Function} props.onClose - Callback function to close the modal.
 */
const MatchModal = ({ match, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions for the ReactConfetti animation on mount
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <Dialog
      open={!!match} // Modal is open if there is a match
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          background: "linear-gradient(to bottom right, #ffecd2, #fcb69f)",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        },
      }}
    >
      {/* Display confetti animation if a match exists */}
      {match && <ReactConfetti width={dimensions.width} height={dimensions.height} />}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.8rem",
          color: "#ff8c00",
          background: "linear-gradient(to right, #ff8c00, #ff7300)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🎉 It's a Match! 🎉
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          {/* Display match image in a styled circular container */}
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
              },
            }}
          >
            <img
              src={match?.img}
              alt={match?.name}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>

          {/* Match details */}
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              fontWeight: "bold",
              color: "#3f51b5",
            }}
          >
            {match?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#555" }}>
            Breed: {match?.breed}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#555" }}>
            Age: {match?.age} years
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "#555" }}>
            Zip Code: {match?.zip_code}
          </Typography>
        </Box>
      </DialogContent>
      <Box sx={{ textAlign: "center", my: 3 }}>
        {/* Close button to dismiss the modal */}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            background: "linear-gradient(to right, #ff8c00, #ff7300)",
            color: "#fff",
            borderRadius: "20px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              background: "linear-gradient(to right, #ff7300, #ff8c00)",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default MatchModal;
