import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import { Challenge } from '../models/challenge';
import { Route } from '../models/route';
import StickyPanel from './StickyPanel';
import { useParams } from 'react-router-dom';
import { Notification } from '../models/notification';
import { useNavigate } from 'react-router-dom';

const CreateRoutePage = () => {
  const { notificationId } = useParams();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [routeName, setRouteName] = useState('');
  const [selectedChallenges, setSelectedChallenges] = useState<Challenge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('fetchNotification');
    const fetchNotification = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/notification/id/${notificationId}`);
            const data = await response.json();
            setNotification(data);
            console.log('Notification:', data);
        } catch (error) {
            console.error('Error fetching notification:', error);
        }
    };

    fetchNotification();
  }, [notificationId]);

  useEffect(() => {
    console.log('fetchUser');
    const fetchUser = async () => {
        if (notification === null) {
          return;
        }
        const userId = notification.userId;
        console.log(userId);
        try {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`);
            const data = await response.json();
            setUser(data);
            console.log('User data:', data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUser();
  }, [notification]);

  useEffect(() => {
    console.log('fetchChallenges');
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/navigation/challenge/all');
        const data = await response.json();
        setChallenges(data);
        console.log('Challenges:', data);
      } catch (error) {
          console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, [user]);

  const handleAddChallenge = (challenge: Challenge) => {
    setSelectedChallenges((prevChallenges) => [...prevChallenges, challenge]);
  };

  const handleRemoveChallenge = (challenge: Challenge) => {
    setSelectedChallenges((prevChallenges) => prevChallenges.filter((c) => c.id !== challenge.id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const route: Route = {
        id: 0,
        name: routeName,
        challenges: selectedChallenges,
        user: user!!
    }

    console.log("Route to submit: ", route);

    fetch('http://localhost:8080/api/navigation/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
      })
        .then((response) => response.json())
        .then(async (data: Route) => {
          console.log('Route response:', data);

          notification!!.processed = true;
          try {
            const result = await fetch("http://localhost:8080/api/notification", {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(notification),
            });
            const data = await result.json();
            console.log("Updated notification: ", data);
            navigate("/profile");
          } catch (error) {
            console.error("Error updating notification: ", error)
          }
        })
        .catch((error) => {
          console.error('Route error:', error);
        });
  };

  return (
    <div>
      <Typography variant="h4">Create Route</Typography>
      {user && (
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              label="Name"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box mt={2}>
            <Typography variant="h6">User name: {user.name}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Personality Type: {user.personalityType}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="h5">Challenges</Typography>
            {/* Render the list of challenges */}
            {challenges.map((challenge) => (
              <div key={challenge.id as React.Key}>
                <Typography variant="subtitle1">Title: {challenge.title}</Typography>
                <Typography variant="body2">Description: {challenge.description}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleAddChallenge(challenge)}
                  disabled={selectedChallenges.includes(challenge)}
                >
                  {selectedChallenges.includes(challenge) ? 'Added' : 'Add'}
                </Button>
              </div>
            ))}
          </Box>
          <Box mt={2}>
            <Typography variant="h6">Selected Challenges:</Typography>
            {/* Render the list of selected challenges */}
            {selectedChallenges.map((challenge) => (
              <div key={challenge.id as React.Key}>
                <Typography variant="subtitle1">{challenge.title}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleRemoveChallenge(challenge)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </Box>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      )}
      <StickyPanel />
    </div>
  );
};

export default CreateRoutePage;
