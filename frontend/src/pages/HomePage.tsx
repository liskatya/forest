import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Magic Forest
      </Typography>
      <Button component={Link} to="/login">Login</Button>
      <Button component={Link} to="/registration">Registration</Button>
    </Box>
  );
};

export default HomePage;
