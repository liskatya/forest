import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import { Notification } from '../models/notification';
import StickyPanel from './StickyPanel';

const NotificationsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
    if (user && user.role === 'Psychologist') {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/notification/TestResultUploaded');
          const data = await response.json();
          setNotifications(data);
          console.log('Notifications:', data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [user]);

  const handleCreateRoute = (notification: Notification) => {
    // Handle creating a route for the notification
    console.log('Create route for notification:', notification);
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
            </CardContent>
          </Card>
        ))}
      </Box>
      <StickyPanel />
    </div>
  );
};

export default NotificationsPage;
