import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Home, Library, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', name: 'Pagrindinis', icon: Home },
    { path: '/visos-knygos', name: 'Visos Knygos', icon: Library }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.nav
      className="stiklas seselis sticky top-0 z-40 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="gradientas p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="hidden sm:block"
            >
              <h1 className="text-xl font-bold tekstasGradientas">
                Biblioteka
              </h1>
              <p className="text-sm text-muted-foreground">
                Knygų Apžvalgos
              </p>
            </motion.div>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`navigacijosNuoroda flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/10 active'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className="mygtukoEfektas stiklas hoverEfektas"
              aria-label={darkMode ? "Perjungti į šviesų režimą" : "Perjungti į tamsų režimą"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                variant="outline"
                size="icon"
                className="mygtukoEfektas stiklas hoverEfektas"
                aria-label={mobileMenuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-3 space-y-2 pb-3 border-t pt-3"
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={`navigacijosNuoroda flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 w-full text-left ${
                      isActive
                        ? 'text-primary bg-primary/10 active'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;