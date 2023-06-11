import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
        <Button>Login</Button>
        <Button component={Link} to="/registration">Registration</Button>
    </div>
  );
};

export default HomePage;