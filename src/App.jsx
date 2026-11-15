import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import AccessibilityToolbar from './components/AccessibilityToolbar';

export default function App() {
  const [apiKey, setApiKey] = useState('');

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard apiKey={apiKey} setApiKey={setApiKey} />} />
        </Routes>
      </AnimatePresence>
      <AccessibilityToolbar />
    </>
  );
}
