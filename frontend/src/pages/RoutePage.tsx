import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import StickyPanel from "./StickyPanel";

interface Route {
  id: number;
  challenges: Challenge[];
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const RoutePage: React.FC = () => {
  const userRoute: Route = {
    id: 1,
    challenges: [
      {
        id: 1,
        name: 'Challenge 1',
        description: 'Description of Challenge 1',
        coordinates: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      },
      {
        id: 2,
        name: 'Challenge 2',
        description: 'Description of Challenge 2',
        coordinates: {
          latitude: 34.0522,
          longitude: -118.2437,
        },
      },
      // Add more challenges as needed
    ],
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
        <Typography variant="h4" gutterBottom>
          User Route
        </Typography>
        <List>
          {userRoute.challenges.map((challenge) => (
            <ListItem key={challenge.id}>
              <ListItemText
                primary={challenge.name}
                secondary={challenge.description}
              />
              <ListItemText
                primary={`Latitude: ${challenge.coordinates.latitude}`}
                secondary={`Longitude: ${challenge.coordinates.longitude}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <StickyPanel/>
    </div>
  );
};

export default RoutePage;
