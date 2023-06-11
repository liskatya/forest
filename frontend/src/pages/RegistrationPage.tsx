import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity()) {
      setIsFormValid(true);
      // Handle registration logic here
      console.log('Email:', email);
      console.log('Password:', password);
      // Reset form
      setEmail('');
      setPassword('');
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
          <Button type="submit" variant="contained" color="primary" component={Link} to="/test" onClick= {(event: any) => {localStorage.setItem("registered", "true")}}>
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

export default RegistrationPage;