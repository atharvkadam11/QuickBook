import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from './RegisterForm';
import { useAuth } from '../context/auth.context';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const { login } = useAuth();

  const validateFields = () => {
    if (!username || !password) {
      toast.error('Username and password are required.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validateFields()) {
      try {
        const response = await login(username, password);

        if (response.success) {
          toast.success('Login successful!');
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('An error occurred during login. Please try again.');
      }
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google login successful:', credentialResponse);
    toast.success('Google login successful!');
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    toast.error('Google login failed. Please try again.');
  };

  const handleRegisterButton = () => {
    setShowRegisterForm(true);
  };

  const closeForm = () => {
    setIsVisible(false); // Hide the form
  };

  if (!isVisible) {
    return null; // Don't render if the form is closed
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 24,
          padding: 4,
          borderRadius: 2,
          maxWidth: 400,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Login</Typography>
          <IconButton onClick={closeForm}>
            <CloseIcon />
          </IconButton>
        </Box>

        {!showRegisterForm ? (
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <TextField
              name="username"
              label="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Button
              type="button"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap // Optional: enables Google's one-tap sign-in
            />

            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleRegisterButton}
            >
              Don't have an account? Register
            </Button>
          </Box>
        ) : (
          <RegisterForm />
        )}
      </Box>
    </>
  );
};

export default LoginForm;