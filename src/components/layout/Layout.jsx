import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../../data/content.json';
import logoGrey from '../../assets/ENDC LOGO GREY.png';
import logoSub from '../../assets/endc-straight.png';  // Add this import

const Layout = ({ children }) => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Throttled scroll handler to improve performance
    let ticking = false;
    let lastKnownScrollY = 0;
    
    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollY > lastScrollY && lastKnownScrollY > 100) {
            setScrollDirection('down');
          } else if (lastKnownScrollY < lastScrollY) {
            setScrollDirection('up');
          }
          
          setLastScrollY(lastKnownScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Check if current route is training or event page
  const isTrainingOrEventPage = location.pathname === '/training' || location.pathname === '/event';

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {!isTrainingOrEventPage && (scrollDirection === 'up' || scrollDirection === 'none' || lastScrollY < 100) && (
          <motion.nav 
            className="fixed top-0 left-0 w-full py-6 z-50 backdrop-blur-md bg-background/70 shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img 
                    src={logoGrey} 
                    alt="NeuroDynamics Logo" 
                    className="h-16 md:h-20 w-auto transition-transform hover:scale-105"
                  />
                </Link>
              </div>
              
              <div className="hidden md:flex space-x-8 items-center">
                {content.navigation.links.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.path}
                    className={`relative text-primary-blue font-audiowide text-lg transition-all hover:text-primary-red hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-orange after:to-primary-blue after:bottom-0 after:left-0 after:transition-all hover:after:w-full ${location.pathname === link.path || (link.path.includes('#') && location.hash === link.path.substring(link.path.indexOf('#'))) ? 'text-primary-red after:w-full' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="flex-shrink-0 md:block hidden">
                <Link to="/">
                  <img 
                    src={logoGrey} 
                    alt="NeuroDynamics Logo" 
                    className="h-16 md:h-20 w-auto transition-transform hover:scale-105"
                  />
                </Link>
              </div>
              
              <div className="md:hidden">
                {/* Mobile menu button - to be implemented */}
                <button className="text-primary-blue hover:text-primary-red">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      
      <main className={`${!isTrainingOrEventPage ? 'pt-24' : 'pt-0'} w-full`}>
        {children}
      </main>
      
      <footer className="bg-primary-blue text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src={logoSub} 
                alt="NeuroDynamics Logo" 
                className="px-6 h-16 w-auto opacity-100 transform"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="font-audiowide">NeuroDynamics Club</p>
              <p className="text-sm mt-2">Where Brains And Machines Converge</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;