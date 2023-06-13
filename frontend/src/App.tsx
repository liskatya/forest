import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from './models/user';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';
import ProfilePage from './pages/ProfilePage';
import StickyPanel from './pages/StickyPanel';
import RoutePage from './pages/RoutePage';
import StatsPage from './pages/StatsPage';
import WatchPage from './pages/WatchPage';
import NotificationsPage from './pages/NotificationsPage';

const App = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
      // Retrieve the data from localStorage
      const userDataFromLocalStorage = localStorage.getItem('userData');

      // Check if the data exists in localStorage
      if (userDataFromLocalStorage) {
        // Parse the data from a string to an object
        const parsedUserData = JSON.parse(userDataFromLocalStorage);

        // Set the userData state with the retrieved data
        setUserData(parsedUserData);
      }
    }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/route" element={<RoutePage/>} />
          <Route path="/stats" element={<StatsPage/>} />
          <Route path="/watch" element={<WatchPage/>} />
          <Route path="/notifications" element={<NotificationsPage/>} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        { userData === null ? ("") : (<StickyPanel/>) }
      </BrowserRouter>
    </div>
  );
};

export default App;