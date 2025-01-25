import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

/**
 * Login component renders a login form with a background video and styling.
 * @param {Object} props - Component props.
 * @param {Function} props.onLogin - Callback function triggered on form submission with name and email.
 */
const Login = ({ onLogin }) => {
  // State to store user input for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /**
   * Handles form submission.
   * Prevents default behavior and triggers the onLogin callback with user data.
   * @param {Event} e - Form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name, email);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background video for a dynamic effect */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/assets/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Main login container */}
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          zIndex: 1,
          margin: "0 20px",
        }}
      >
        {/* Logo and welcome message */}
        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
          <img
            src="/assets/dog1.gif"
            alt="Dog GIF"
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              marginBottom: 10,
              objectFit: "cover",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "#ff8c00",
              marginBottom: 1,
            }}
          >
            Welcome to Fetch Buddy
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#ff8c00",
            }}
          >
            Find your perfect companion!
          </Typography>
        </Box>

        {/* Login form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Name input field */}
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              "& .MuiInputLabel-outlined": { color: "#ff8c00" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ff8c00" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ff7300" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ff7300" },
            }}
          />
          {/* Email input field */}
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              "& .MuiInputLabel-outlined": { color: "#ff8c00" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ff8c00" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ff7300" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#ff7300" },
            }}
          />
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#ff8c00",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "8px",
              transition: "background 0.3s ease",
              "&:hover": { backgroundColor: "#ff7300" },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
