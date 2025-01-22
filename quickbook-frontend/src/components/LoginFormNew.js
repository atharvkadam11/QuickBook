import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import RegisterForm from "./RegisterForm";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { useAuth } from "../context/auth.context";

const LoginFormNew = ({ onLoginToggle }) => {
  const { login } = useAuth();

  const clientId =
    "33752163161-lqi1dct3utemi9qn8oijo3fo19pvjfpp.apps.googleusercontent.com";

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          background: "#fff", // Solid white background for clarity
          boxShadow: 24,
          padding: 4, // Increased padding for more spacing
          borderRadius: 2,
          width: 400, // Reduced width for a compact dialog
          height: 300, // Adjusted height to fit content
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3, // Margin bottom for spacing
          }}
        >
          <Typography variant="h6" color="textPrimary">
            Login to the App
          </Typography>
          <IconButton onClick={onLoginToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Center the Google Login button
            alignItems: "center",
            height: "100%", // Take up remaining height
          }}
        >
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginComponent />
          </GoogleOAuthProvider>
        </Box>
      </Box>
    </>
  );
};

export default LoginFormNew;
