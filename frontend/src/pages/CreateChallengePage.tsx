import React, { useState } from 'react';
import { TextField, Button, FormControl, FormHelperText, Box, Typography, MenuItem, Select } from '@mui/material';
import StickyPanel from './StickyPanel';

const CreateChallengePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [position, setPosition] = useState('');
  const [commentary, setCommentary] = useState('');

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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Perform submission logic here
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Difficulty:', difficulty);
    console.log('Position:', position);
    console.log('Commentary:', commentary);
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
