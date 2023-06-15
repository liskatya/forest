import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../models/user';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { UserInfo } from 'os';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: any) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      // Handle registration logic here
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Role:', role);

      const user: User = {
        id: 0,
        name: name,
        email: email,
        password: password,
        role: role,
        personalityType: 'None',
      };

      setIsFormValid(true);

      // Perform further actions, such as submitting the form
      // You can add your logic here

      // For example, if you want to store data in localStorage:
      fetch('http://localhost:8080/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data: User) => {
          console.log('Registration response:', data);

          UserService.authenticate(data);

          if (role === 'User') {
            navigate('/test');
          } else {
            navigate('/profile');
          }
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
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
          {!name && <FormHelperText error>This field is required</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {!email && <FormHelperText error>This field is required</FormHelperText>}
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
          {!password && <FormHelperText error>This field is required</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Select value={role} onChange={handleRoleChange} displayEmpty required>
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Psychologist">Psychologist</MenuItem>
            <MenuItem value="ForestKeeper">Forest Keeper</MenuItem>
            <MenuItem value="King">King</MenuItem>
            <MenuItem value="Fairy">Fairy</MenuItem>
          </Select>
          {!role && <FormHelperText error>This field is required</FormHelperText>}
        </FormControl>
        {isFormValid ? (
          <Button type="submit" variant="contained" color="primary" component={Link} to="/test">
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
