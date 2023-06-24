import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Typography, MenuItem, Select } from '@mui/material';
import StickyPanel from './StickyPanel';
import { Challenge } from '../models/challenge';
import { useParams } from 'react-router-dom';
import { Route } from '../models/route';

const CreateChallengePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [position, setPosition] = useState('');
  const [commentary, setCommentary] = useState('');
  const [challengeToUpdate, setChallenge] = useState<Challenge | null>(null);
  const { challengeId } = useParams();

  useEffect(() => {
    if (challengeId) {
      const fetchChallenge = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/navigation/challenge/${challengeId}`);
          const data = await response.json() as Challenge;
          setChallenge(data);
          console.log('CHallenge data:', data);

          setTitle(data.title);
          setDescription(data.description);
          setDifficulty(data.difficulty.toString());
          setPosition(`${data.positionX}, ${data.positionY}`);

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchChallenge();
    }
  }, []);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleDifficultyChange = (event: any) => {
    setDifficulty(event.target.value);
  };

  const handlePositionChange = (event: any) => {
    setPosition(event.target.value);
  };

  const handleCommentaryChange = (event: any) => {
    setCommentary(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Perform submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Difficulty:', difficulty);
    console.log('Position:', position);
    console.log('Commentary:', commentary);

    let id: Number = 0;
    let kingApproved = false;
    let psycoApproved = false;
    let routes: Route[] = [];
    if (challengeToUpdate) {
      id = challengeToUpdate.id;
      kingApproved = challengeToUpdate.kingApproved;
      psycoApproved = challengeToUpdate.psycoApproved;
      routes = challengeToUpdate.routes;
    }

    const challenge: Challenge = {
      id: id,
      title: title,
      description: description,
      difficulty: Number(difficulty),
      positionX: Number(position.split(",")[0]),
      positionY: Number(position.split(",")[1]),
      kingApproved: kingApproved,
      psycoApproved: psycoApproved,
      routes: routes,
      completed: false
    }

    try {
      const response = await fetch(`http://localhost:8080/api/navigation/challenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challenge),
      });
      const data = await response.json();
      console.log('Challenge data:', data);
    } catch (error) {
      console.error('Error fetching challenge data:', error);
    }
    // Reset form
    setTitle('');
    setDescription('');
    setDifficulty('');
    setPosition('');
    setCommentary('');
  };

  return (
    <div>
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Create Challenge
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
          />
          {!title && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          {!description && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Select
            value={difficulty}
            onChange={handleDifficultyChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Select Difficulty
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
          {!difficulty && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Position (e.g., x,y)"
            variant="outlined"
            value={position}
            onChange={handlePositionChange}
            required
          />
          {!position && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Commentary"
            variant="outlined"
            value={commentary}
            onChange={handleCommentaryChange}
          />
          {!commentary && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </Box>
    <StickyPanel/>
    </div>
  );
};

export default CreateChallengePage;
