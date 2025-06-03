import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import AllBooksPage from '@/pages/AllBooksPage';
import BookDetails from '@/pages/BookDetails';
import Footer from '@/components/Footer';

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/visos-knygos" element={<AllBooksPage />} />
              <Route path="/knyga/:id" element={<BookDetails />} />
            </Routes>
          </main>

          <Footer />
          <Toaster />
        </motion.div>
      </div>
    </Router>
  );
};

export default App;
