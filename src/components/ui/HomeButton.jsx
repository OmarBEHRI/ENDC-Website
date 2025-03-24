import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoGrey from '../../assets/ENDC LOGO GREY.png';

const HomeButton = () => {
  return (
    <motion.div 
      className="fixed top-4 left-4 z-50 opacity-70 hover:opacity-100 transition-opacity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link to="/">
        <img 
          src={logoGrey} 
          alt="Home" 
          className="h-10 w-auto"
          title="Return to Homepage"
        />
      </Link>
    </motion.div>
  );
};

export default HomeButton;