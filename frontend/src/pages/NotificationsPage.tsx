import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import StickyPanel from './StickyPanel';
import { useNavigate } from 'react-router-dom';
import { Challenge } from '../models/challenge';
import { ChallengeResult } from '../models/challenge_result';

const NotificationsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [reward, setReward] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [challenges, setChallenges] = useState<Challenge[] | null>([]);
  const navigate = useNavigate();

// TODO: Add notification processed = true update

  useEffect(() => {
    const fetchUser = async () => {
      const userId = UserService.userId();
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
  }, []);

  useEffect(() => {
      const fetchNotifications = async () => {
      try {
        let notificationTypes: String[] = [];
        if (user && user.role === 'Psychologist') {
          notificationTypes = ['TestResultUploaded', 'ChallengeUploaded', 'ChallengeCompleted']
        }
        if (user && user.role === 'King') {
          notificationTypes = ['ChallengeUploaded']
        }
        if (user && user.role === 'Fairy') {
          notificationTypes = ['ChallengeRejected']
        }

        let notifications: Notification[] = [];
        notificationTypes.map(async (type) => {
          console.log(type)
          const response = await fetch(`http://localhost:8080/api/notification/${type}`);
          const data = await response.json() as Notification[];
          notifications.push(...data);
          setNotifications(notifications);
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    fetchNotifications();
  }, [user]);

  useEffect(() => {
    //console.log('fetchChallenges');
    const fetchChallenges = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/navigation/challenge/all');
        const data = await response.json();
        setChallenges(data);
        //console.log('Challenges:', data);
      } catch (error) {
          console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const handleCreateRoute = (notification: Notification) => {
    // Handle creating a route for the notification
    console.log('Create route for notification:', notification);
    navigate(`/create_route/${notification.id}`);
  };

  const handleChallengeAnswer = (notification: Notification, approved: boolean) => {
    if (approved) {
      const approveChallenge = async () => {
        const response = await fetch(`http://localhost:8080/api/navigation/challenge/approve/${notification.userId}/${user!!.role}`, {
          method: 'PUT'
        })
        const data = await response.json();
        console.log("Approved challenge: ", data)
      }

      approveChallenge();
    } else {
      const rejectChallenge = async () => {
        const response = await fetch(`http://localhost:8080/api/navigation/challenge/reject/${notification.userId}/${user!!.role}`, {
          method: 'PUT'
        })
        const data = await response.json();
        console.log("Rejected challenge: ", data)
      }

      rejectChallenge();
    }
  };

  const handleChallengeLoad = (notification: Notification) => {
    const loadChallenge = async () => {
      const response = await fetch(`http://localhost:8080/api/navigation/challenge/${notification.userId}`)
      const data = await response.json();
      console.log("Challenge data: ", data)
      setChallenge(data)
    }

    loadChallenge();
  };

  const markChallengeProcessed = async (notification: Notification) => {
    notification.processed = true;
    const response = await fetch(`http://localhost:8080/api/notification`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification)
    })
    const data = await response.json();
    console.log("Updated notification: ", data)
    setChallenge(data)
  }

  const handleChallengeRejected = (notification: Notification) => {
    markChallengeProcessed(notification);
    navigate(`/create_challenge/${notification.userId}`);
  };

  const handleRewardAssignment = (notification: Notification, reward: Number) => {
    const request = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${notification.userId}/${reward}/assignReward`,
        {
          method: 'POST'
        });
        const data = await response.json();
      } catch (error) {
          console.error('Error assigning reward:', error);
      }
    }

    request();
  };

  const handleChallengeAddition = (notification: Notification, challengeId: Number) => {
    const request = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/navigation/route/${notification.userId}/${challengeId}/expand`,
        {
          method: 'POST'
        });
        const data = await response.json();
      } catch (error) {
          console.error('Error expanding route:', error);
      }
    }

    request();
  };

  const handleChallengeReport = (notification: Notification) => {
    const request = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/navigation/challenge_result/${notification.userId}`);
        const chRes = await response.json() as ChallengeResult;

        const notificationToSend: Notification = {
          id: 0,
          userId: chRes.challenge.id,
          processed: false,
          type: 'ChallengeRejected'
        }

        const res = await fetch(`http://localhost:8080/api/notification`, {
          method: 'POST',
          body: JSON.stringify(notificationToSend),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json()
        console.log("Reported challenge successfully")

      } catch (error) {
          console.error('Error reporting challenge:', error);
      }
    }

    request();
  };

  const handleChallengeIdChange = (event: any) => {
    setChallengeId(event.target.value);
  };

  return (
    <div>
      <Typography variant="h4">Notifications</Typography>
      <Box mt={2}>
        {notifications.map((notification) => (
          <Card key={notification.id} variant="outlined">
            <CardContent>
              <Typography variant="body2">Type: {notification.type}</Typography>
              {notification.type === 'TestResultUploaded' && (
                <Button onClick={() => handleCreateRoute(notification)}>Create Route</Button>
              )}
              {notification.type === 'ChallengeUploaded' && (
                <div>
                  {challenge && notification.userId == challenge.id && (
                  <div>
                    <Typography variant="body2">Challenge data</Typography>
                    <Typography variant="body2">Title: {challenge!!.title}</Typography>
                    <Typography variant="body2">Description: {challenge!!.description}</Typography>
                  </div>)}
                  <Button onClick={() => handleChallengeAnswer(notification, true)}>Approve</Button>
                  <Button onClick={() => handleChallengeAnswer(notification, false)}>Reject</Button>
                  <Button onClick={() => handleChallengeLoad(notification)}>Show more</Button>
                </div>
              )}
              {notification.type === 'ChallengeRejected' && (
                <div>
                  <Button onClick={() => handleChallengeRejected(notification)}>Edit challenge</Button>
                </div>
              )}
              {notification.type === 'ChallengeCompleted' && (
                <div>
                  <TextField
                  label="Reward"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  fullWidth
                  required
                  />
                  <Select
                    value={challengeId}
                    onChange={handleChallengeIdChange}
                    displayEmpty
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Difficulty
                    </MenuItem>
                    {
                      challenges && challenges.map((challenge) => (
                        <MenuItem value={challenge.id.toString()}>
                          {challenge.title}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  <Button onClick={() => handleRewardAssignment(notification, Number(reward))}>Assign reward</Button>
                  <Button onClick={() => handleChallengeAddition(notification, Number(challengeId))}>Add new challenge</Button>
                  <Button onClick={() => handleChallengeReport(notification)}>Report challenge</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      <StickyPanel />
    </div>
  );
};

export default NotificationsPage;
