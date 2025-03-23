import React from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';
import marcLogo from '../assets/MARC-Logo.png';

// Animation variants
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Text animation component
const AnimatedText = ({ text, className }) => {
  return (
    <motion.span
      className={className}
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const EventPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-primary-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('../assets/MARC-Logo.png')] bg-center bg-no-repeat bg-contain opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <motion.h1 
                className="text-4xl md:text-6xl font-audiowide mb-4"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {content.mainEvent.title}
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl font-audiowide text-primary-red mb-6"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {content.mainEvent.subtitle}
              </motion.h2>
              
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <AnimatedText 
                  text={content.mainEvent.description}
                  className="text-lg leading-relaxed block"
                />
              </motion.div>
              
              <a href="https://forms.gle/QeqH5UiHMi1keTnV8" target='_blank'><motion.button
                className="bg-primary-red hover:bg-primary-orange text-white font-audiowide py-3 px-8 rounded-md transition-all transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {content.mainEvent.ctaText}
              </motion.button></a>
            </div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src={marcLogo} 
                alt="MARC Logo" 
                className="w-64 md:w-80 h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Theme Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-audiowide text-primary-blue mb-4">Theme</h2>
            <h3 className="text-xl md:text-2xl font-audiowide text-primary-red mb-8">{content.mainEvent.theme}</h3>
            <p className="text-lg italic max-w-2xl mx-auto">"{content.mainEvent.tagline}"</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.mainEvent.highlights.map((highlight, index) => (
              <motion.div 
                key={index}
                className="bg-background rounded-lg shadow-lg p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <h4 className="text-xl font-audiowide text-primary-blue mb-2">{highlight}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      {/* <section className="py-20 bg-primary-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-audiowide mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Join the Challenge?
          </motion.h2>
          
          <motion.p
            className="text-lg max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't miss this opportunity to showcase your skills, collaborate with like-minded innovators, and create solutions that make a real difference!
          </motion.p>
          
          <motion.button
            className="bg-primary-red hover:bg-primary-orange text-white font-audiowide py-3 px-8 rounded-md transition-all transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.mainEvent.ctaText}
          </motion.button>
        </div>
      </section> */}
    </div>
  );
};

export default EventPage;