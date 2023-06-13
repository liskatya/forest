import React, { useState, useEffect } from 'react';
import { Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { User } from '../models/user';

const StickyPanel = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      // Retrieve the data from localStorage
      const userDataFromLocalStorage = localStorage.getItem('userData');

      // Check if the data exists in localStorage
      if (userDataFromLocalStorage) {
        // Parse the data from a string to an object
        const parsedUserData = JSON.parse(userDataFromLocalStorage);

        // Set the userData state with the retrieved data
        setUserData(parsedUserData);
      }
    }, []);

    const handleExitClick = (event: any) => {
      localStorage.clear();
      navigate('/');
      window.location.reload()
    };

    return (
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button component={Link} to="/profile" color="inherit">
            Profile
          </Button>
          {userData?.role === "User" ? (
          <Button component={Link} to="/route" color="inherit">
            Route
          </Button>) : ("")}
          {userData?.role === "King" || userData?.role === "Psychologist"  ? (
          <Button component={Link} to="/stats" color="inherit">
            Stats
          </Button>) : ("")}
          {userData?.role === "Forest Keeper" ? (
          <Button component={Link} to="/watch" color="inherit">
            Watcher
          </Button>) : ("")}
          <Button component={Link} to="/notifications" color="inherit">
            Notifications
          </Button>
          <Button onClick={handleExitClick} color="inherit">
            Exit
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

export default StickyPanel;