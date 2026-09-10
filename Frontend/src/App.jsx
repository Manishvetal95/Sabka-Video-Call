import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth' element={<Authentication />} />

              {/* Protected Routes */}
              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <HomeComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/history'
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />

              {/* Video Meeting Routes: Support both /meeting/:url and direct /:url */}
              <Route path='/meeting/:url' element={<VideoMeetComponent />} />
              <Route path='/:url' element={<VideoMeetComponent />} />

              {/* 404 Fallback Route */}
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;