import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import AddProject from '../pages/AddProject';
import Interns from '../pages/Interns';
import Deadlines from '../pages/Deadlines';
import Analytics from '../pages/Analytics';
import Login from '../pages/Login';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public Route component (redirects if already authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route 
            path="projects/add" 
            element={
              <>
                {console.log('Rendering AddProject component')}
                <AddProject />
              </>
            } 
          />
          <Route path="interns" element={<Interns />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;