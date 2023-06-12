import React from 'react';
import { Typography, Box } from '@mui/material';

const ProfilePage = () => {
  const user = {
    email: 'user@example.com',
    name: 'John Doe',
    role: 'Admin',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Profile Page
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Email:
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Name:
          </Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Role:
          </Typography>
          <Typography>{user.role}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
