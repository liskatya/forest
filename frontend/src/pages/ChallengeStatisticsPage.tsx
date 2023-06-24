import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import StickyPanel from './StickyPanel';
import { Route, Routes, useNavigate } from 'react-router-dom';

const ChallengeStatistics = () => {
  const navigate = useNavigate();

  let completedChallengesByPersonType: any[] = [];

  let challenges = [
    { title: 'Challenge 1', completionPercent: 70 },
    { title: 'Challenge 2', completionPercent: 50 },
    { title: 'Challenge 3', completionPercent: 90 },
    // Add more challenges as needed
  ];

  const personalityTypes = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ'
  ];

  useEffect(() => {
    const fetchPCH = async (personType: string) => {
      try {
        const response = await fetch(`http://localhost:8080/api/navigation/challenge/by_person_type/{personType}/completion_percent`);
        const data = await response.text();
        completedChallengesByPersonType.push(
          { 
            personalityType: personType, 
            completionPercent: Number(data) 
          },
          );
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    for (let i = 0; i < personalityTypes.length; i++) {
      fetchPCH(personalityTypes[i]);
    }
  });

  const handleChallengeClick = (challenge: any) => {
    navigate('/single_challenge_stats/0');
  };

  return (
    <div>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Completed Challenges % by Personality Type
        </Typography>
        <div style={{ overflowX: 'scroll' }}>
          <Box display="flex">
            {completedChallengesByPersonType.map((item) => (
              <Paper
                key={item.personalityType}
                sx={{
                  margin: '8px',
                  padding: '16px',
                  minWidth: '200px',
                  backgroundColor: '#6fcf97',
                }}
              >
                <Typography variant="subtitle1">{item.personalityType}</Typography>
                <Typography variant="subtitle2">{`${item.completionPercent}%`}</Typography>
              </Paper>
            ))}
          </Box>
        </div>
      </Box>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Challenges
        </Typography>
        <List>
          {challenges.map((challenge) => (
            <ListItem key={challenge.title} sx={{ mb: '8px' }} >
              <div onClick={() => { handleChallengeClick(challenge)} }>
                <Paper
                  sx={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#6fcf97',
                  }}
                >
                  <Typography variant="subtitle1">{challenge.title}</Typography>
                  <br/>
                  <Typography variant="subtitle2">{`${challenge.completionPercent}%`}</Typography>
                </Paper>
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
      <StickyPanel/>
    </div>
  );
};

export default ChallengeStatistics;
