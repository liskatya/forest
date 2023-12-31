import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';

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
      console.log('Email:', email);
      console.log('Password:', password);

      const user: User = {
        id: 0,
        name: '',
        email: email,
        password: password,
        role: 'None',
        personalityType: 'None',
      };

      setIsFormValid(true);

      fetch('http://localhost:8080/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data: User) => {
          console.log('Login response:', data);

          UserService.authenticate(data);
          navigate('/profile');
        })
        .catch((error) => {
          console.error('Registration error:', error);
        });
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
            Login
          </Button>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        )}
      </form>
    </Box>
  );
};

export default LoginPage;