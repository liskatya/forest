import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import StickyPanel from './StickyPanel';
import { useNavigate } from 'react-router-dom';

const NotificationsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

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
        if (user && user.role === 'Psychologist') {
          const notificationTypes = ['TestResultUploaded', 'ChallengeUploaded']
          let notifications: Notification[] = [];
          notificationTypes.map(async (type) => {
            const response = await fetch(`http://localhost:8080/api/notification/${type}`);
            const data = await response.json() as Notification[];
            notifications.concat(data);
          });
          setNotifications(notifications);
          console.log('Notifications:', notifications);
        }
        if (user && user.role === '') {
          
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }

      fetchNotifications();
    }
  }, [user]);

  const handleCreateRoute = (notification: Notification) => {
    // Handle creating a route for the notification
    console.log('Create route for notification:', notification);
    navigate(`/create_route/${notification.id}`);
  };

  return (
    <div>
      <Typography variant="h4">Notifications</Typography>
      <Box mt={2}>
        {notifications.map((notification) => (
          <Card key={notification.id} variant="outlined">
            <CardContent>
              <Typography variant="body2">User ID: {notification.userId}</Typography>
              <Typography variant="body2">Type: {notification.type}</Typography>
              {notification.type === 'TestResultUploaded' && (
                <Button onClick={() => handleCreateRoute(notification)}>Create Route</Button>
              )}
              {notification.type === 'ChallengeUploaded' && (
                <div>
                  <Button onClick={() => handleCreateRoute(notification)}>Approve</Button>
                  <Button onClick={() => handleCreateRoute(notification)}>Reject</Button>
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
