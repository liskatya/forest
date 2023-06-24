import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import StickyPanel from './StickyPanel';
import { Route, Routes, useNavigate } from 'react-router-dom';

const ChallengeStatistics = () => {
  const navigate = useNavigate();

  const completedChallengesByPersonType = [
    { personalityType: 'Type A', completionPercent: 80 },
    { personalityType: 'Type B', completionPercent: 60 },
    { personalityType: 'Type C', completionPercent: 40 },
    // Add more data as needed
  ];

  const challenges = [
    { title: 'Challenge 1', completionPercent: 70 },
    { title: 'Challenge 2', completionPercent: 50 },
    { title: 'Challenge 3', completionPercent: 90 },
    // Add more challenges as needed
  ];

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
