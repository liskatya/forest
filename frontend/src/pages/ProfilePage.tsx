import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { UserService } from '../services/UserService';
import { User } from "../models/user";
import StickyPanel from "./StickyPanel"

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await UserService.userData();
      setUser(userData);
    };

    fetchData();
  }, []);

  if (!user) {
    // Display a loading state or handle the case when user data is not available
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Box sx={{ p: 2, margin: '0 auto' }}>
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
    <StickyPanel/>
    </div>
  );
};

export default ProfilePage;