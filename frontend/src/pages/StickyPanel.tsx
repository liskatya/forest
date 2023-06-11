import React from 'react';
import { Typography, Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StickyPanel = () => {
    return (
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button component={Link} to="/profile" color="inherit">
            Profile
          </Button>
          <Button component={Link} to="/" color="inherit">
            Settings
          </Button>
        </Toolbar>
      </AppBar>
    );
  };

export default StickyPanel;