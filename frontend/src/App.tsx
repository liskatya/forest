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
import LoginPage from './pages/LoginPage';
import CreateChallengePage from './pages/CreateChallengePage';
import { UserService } from './services/UserService';
import CreateRoutePage from './pages/CreateRoutePage';
import UserStatisticsPage from './pages/UserStats';
import ChallengeStatisticsPage from './pages/ChallengeStatisticsPage';
import SingleChallengeStatsPage from './pages/SingleChallengeStatsPage';

const App = () => {
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
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/create_challenge/:challengeId" element={<CreateChallengePage/>} />
          <Route path="/create_challenge/" element={<CreateChallengePage/>} />
          <Route path="/create_route/:notificationId" element={<CreateRoutePage/>} />
          <Route path="/user_stats" element={<UserStatisticsPage/>} />
          <Route path="/challenge_stats" element={<ChallengeStatisticsPage/>} />
          <Route path="/single_challenge_stats/:challengeId" element={<SingleChallengeStatsPage/>} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;