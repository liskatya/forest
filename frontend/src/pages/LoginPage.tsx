import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { Route, Routes, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      // Handle registration logic here
      console.log('Email:', email);
      console.log('Password:', password);

      // Reset form
      setEmail('');
      setPassword('');
      setIsFormValid(true);

      // Perform further actions, such as submitting the form
      // You can add your logic here

      // For example, if you want to store data in localStorage:
      localStorage.setItem('registered', 'true');
      localStorage.setItem(
        'userData',
        JSON.stringify({ id: 1, email: '', password: '', role: 'User' })
      );
      navigate('/profile');
      window.location.reload();
    } else {
      setIsFormValid(false);
      form.reportValidity();
    }
  };

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!email && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {!password && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        {isFormValid ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            component={Link}
            to="/profile"
          >
            Register
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        )}
      </form>
    </Box>
  );
};

export default LoginPage;