import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { User } from '../models/user';
import { Challenge } from '../models/challenge';
import { UserService } from '../services/UserService';
import StickyPanel from './StickyPanel';

const UserStatisticsPage = () => {
  const [searchNickname, setSearchNickname] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);

  const handleSearch = async () => {
    try {
      //const response = await fetch(`http://localhost:8080/api/user/by_nickname/${searchNickname}`);
      //const data = await response.json();
      let user: User = {
        id: 1,
        email: 'rbetik12',
        password: '',
        name: 'deqqe',
        role: 'User',
        personalityType: 'ISTB'        
      };
      setUser(user);
      handleUserSelection(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchCompletedChallenges = async (userId: number) => {
    try {
      //const response = await fetch(`http://localhost:8080/api/user/${userId}/completed_challenges`);
      //const data = await response.json();
      let challenge: Challenge = {
        id: 1,
        description: 'descr',
        kingApproved: true,
        difficulty: 2,
        positionX: 2,
        positionY: 1,
        psycoApproved: true,
        title: 'title',
        routes: [],
        completed: false
      };
      let challenges: Challenge[] = [challenge];
      setCompletedChallenges(challenges);
    } catch (error) {
      console.error('Error fetching completed challenges:', error);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNickname(event.target.value);
  };

  const handleUserSelection = (selectedUser: User) => {
    setUser(selectedUser);
    fetchCompletedChallenges(selectedUser.id);
  };

  return (
    <div>
      <Typography variant="h4">Challenge Statistics</Typography>
      <Box mt={2}>
        <TextField
          label="Search by Nickname"
          value={searchNickname}
          onChange={handleNicknameChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {user && (
        <Box mt={2}>
          <Typography variant="h6">User: {user.name}</Typography>
          <Typography variant="h6">Personality Type: {user.personalityType}</Typography>
        </Box>
      )}
      <Box mt={2}>
        <Typography variant="h5">Completed Challenges</Typography>
        {completedChallenges.length > 0 ? (
          <List sx={{padding: '16px'}}>
            {completedChallenges.map((challenge) => (
              <ListItem key={challenge.id as React.Key} sx={{ backgroundColor: '#6fcf97', border: '1px solid #000000', borderRadius: '4px', marginBottom: '8px'}}>
                <ListItemText primary={challenge.title} secondary={challenge.description} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No completed challenges found.</Typography>
        )}
      </Box>
      <StickyPanel/>
    </div>
  );
};

export default UserStatisticsPage;