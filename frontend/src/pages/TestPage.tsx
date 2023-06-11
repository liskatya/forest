import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from '@mui/material';

interface Answers {
  [questionId: string]: string;
}

const questions = [
  {
    id: 'question1',
    text: 'Question 1:',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    id: 'question2',
    text: 'Question 2:',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  // Add more questions as needed
];

const TestPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Answers:', answers);
    // Perform further actions with the answers
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Box sx={{ height: '400px', overflowY: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Test Page
        </Typography>
        <FormControl component="fieldset">
          <Typography variant="subtitle1" gutterBottom>
            {currentQuestion.text}
          </Typography>
          <RadioGroup
            name={currentQuestion.id}
            value={answers[currentQuestion.id] || ''}
            onChange={handleAnswerChange}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={`option${index + 1}`}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box mt={2}>
          <Button
            disabled={currentQuestionIndex === 0}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" component={Link} to="/profile">
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default TestPage;