import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';
import ProfilePage from './pages/ProfilePage';
import StickyPanel from './pages/StickyPanel';
import RoutePage from './pages/RoutePage';

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
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {localStorage.getItem("registered") === "true" ? (<StickyPanel/>) : ("")}
      </BrowserRouter>
    </div>
  );
};

export default App;