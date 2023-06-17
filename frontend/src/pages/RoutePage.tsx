import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import StickyPanel from './StickyPanel';
import { UserService } from '../services/UserService';
import { Challenge } from '../models/challenge';
import { Route } from '../models/route';

const RoutePage: React.FC = () => {
  const [userRoute, setUserRoute] = useState<Route | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const userId = UserService.userId(); // Assuming UserService has a getUserId() function to retrieve the user ID
        const response = await fetch(`http://localhost:8080/api/navigation/route/${userId}`);
        const data = await response.json();
        setUserRoute(data);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
        <Typography variant="h4" gutterBottom>
          {userRoute ? userRoute.name : 'Loading...'}
        </Typography>
        {userRoute ? (
          <List>
            {userRoute.challenges.map((challenge: Challenge) => (
              <ListItem key={challenge.id as React.Key}>
                <ListItemText
                  primary={challenge.title}
                  secondary={challenge.description}
                />
                <ListItemText
                  primary={`Latitude: ${challenge.positionX}`}
                  secondary={`Longitude: ${challenge.positionY}`}
                />
                {/* Render other challenge details */}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">Fetching route...</Typography>
        )}
        <Button variant="contained" color="primary">
            Start route
        </Button>
      </Box>
      <StickyPanel />
    </div>
  );
};

export default RoutePage;