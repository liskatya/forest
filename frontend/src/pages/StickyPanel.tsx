import React from 'react';
import { Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

const StickyPanel = () => {
    return (
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button component={Link} to="/profile" color="inherit">
            Profile
          </Button>
          {(JSON.parse(localStorage.getItem("userData") as string) as User).role === "User" ? (
          <Button component={Link} to="/route" color="inherit">
            Route
          </Button>) : ("")}
        </Toolbar>
      </AppBar>
    );
  };

export default StickyPanel;