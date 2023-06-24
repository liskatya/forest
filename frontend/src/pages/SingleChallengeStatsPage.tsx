import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import StickyPanel from './StickyPanel';

const SingleChallengeStatsPage = () => {
  const { challengeId } = useParams();

  const challenge = {
    title: 'Challenge 1',
    completionPercent: 75,
  };

  const handleReportButtonClick = (challenge: any) => {
    // Handle report button click
  };

  return (
    <div>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h4">{challenge.title}</Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="h6" mr={2}>
            Completion Percentage:
          </Typography>
          <Typography variant="h6">{`${challenge.completionPercent}%`}</Typography>
        </Box>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={() => {handleReportButtonClick(challenge)} }>
            Report
          </Button>
        </Box>
      </Box>
      <StickyPanel/>
    </div>
  );
};

export default SingleChallengeStatsPage;
