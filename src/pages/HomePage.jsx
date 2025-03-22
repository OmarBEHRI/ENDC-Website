import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';
import { initAnimation } from '../lib/particleAnimation';

// Import cell icons
import aiCellIcon from '../assets/AI-Cell.png';
import dataCellIcon from '../assets/DataCell.png';
import roboticsCellIcon from '../assets/Robotic-Cell.png';
import projectCellIcon from '../assets/Project Cell.png';
import mediaCellIcon from '../assets/Media-Cell.png'; 
import designCellIcon from '../assets/Design-Cell.png';
import sponsorCellIcon from '../assets/Sponsoring-Cell.png';
import eventCellIcon from '../assets/Event-Cell.png';

// Import logos and other assets
import aiClubLogo from '../assets/AI Logo.png';
import roboticsClubLogo from '../assets/robotics logo.png';
import ndcLogo from '../assets/ENDC LOGO GREY.png';
import marcLogo from '../assets/MARC-Logo.png';

// Import activity images
import teamFestivalImage from '../assets/team-festival-des-sciences.png';
import workshopsImage from '../assets/workshops.png';

// Import LazyImage component
import LazyImage from '../components/ui/LazyImage';


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

// Section components
const HeroSection = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup;
    if (canvasRef.current) {
      cleanup = initAnimation(canvasRef.current);
    }
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center w-full px-4 sm:px-6 flex flex-col items-center justify-center">
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-8xl font-audiowide mb-6 w-full"
          style={{ color: 'rgba(32, 32, 32, 0.8)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {content.hero.title}
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl font-audiowide w-full"
          style={{ color: 'rgba(32, 32, 32, 1)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {content.hero.slogan}
        </motion.p>
      </div>
    </section>
  );
};
const HistorySection = () => {
  return (
    <section id="history" className="py-20 bg-white w-full px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="container mx-auto max-w-full">
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.history.title}
        </motion.h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <AnimatedText 
            text={content.history.description}
            className="text-lg leading-relaxed block"
          />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={aiClubLogo} 
              alt="AI Club Logo" 
              className="h-32 w-auto mb-4"
            />
            <h3 className="text-xl font-audiowide text-primary-blue">Ensias AI Club</h3>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold text-primary-red"
          >
            +
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={roboticsClubLogo} 
              alt="Robotics Club Logo" 
              className="h-32 w-auto mb-4"
            />
            <h3 className="text-xl font-audiowide text-primary-blue">Ensias Robotics Club</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CellsSection = () => {
  return (
    <section id="cells" className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.cells.title}
        </motion.h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <AnimatedText 
            text={content.cells.description}
            className="text-lg leading-relaxed block"
          />
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-audiowide text-primary-red text-center mb-8">Technical Cells</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
            {content.cells.technical.map((cell, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                {/* Cell content remains the same */}
                <img 
                  src={
                    cell.name === "AI Cell" ? aiCellIcon :
                    cell.name === "Data Cell" ? dataCellIcon :
                    cell.name === "Robotics Cell" ? roboticsCellIcon :
                    projectCellIcon
                  } 
                  alt={cell.name} 
                  className="h-20 w-auto mb-4" 
                />
                <h4 className="text-xl font-audiowide text-primary-blue mb-2">{cell.name}</h4>
                <p className="text-sm">{cell.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-audiowide text-primary-red text-center mb-8">Non-Technical Cells</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
            {content.cells.nonTechnical.map((cell, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                {/* Cell content remains the same */}
                <img 
                  src={
                    cell.name === "Media Cell" ? mediaCellIcon :
                    cell.name === "Sponsorship Cell" ? sponsorCellIcon :
                    cell.name === "Events Cell" ? eventCellIcon:
                    designCellIcon
                  } 
                  alt={cell.name} 
                  className="h-20 w-auto mb-4" 
                />
                <h4 className="text-xl font-audiowide text-primary-blue mb-2">{cell.name}</h4>
                <p className="text-sm">{cell.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrainingSection = () => {
  const trainingSessions = [
    {
      title: "AI Training Sessions",
      courses: [
        "Machine Learning Fundamentals",
        "Deep Learning with PyTorch",
        "Neural Networks",
        "Reinforcement Learning"
      ],
      color: "primary-blue",
      icon: aiCellIcon
    },
    {
      title: "Data Training Sessions",
      courses: [
        "Data Analysis",
        "Data Visualization",
        "Big Data Processing",
        "Statistical Learning"
      ],
      color: "primary-red",
      icon: dataCellIcon
    },
    {
      title: "Robotics Training Sessions",
      courses: [
        "Robotics Programming",
        "Computer Vision",
        "Embedded Systems",
        "Sensor Integration"
      ],
      color: "primary-blue", // Changed from primary-orange to match other cards
      icon: roboticsCellIcon
    }
  ];

  return (
    <section id="training" className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-background relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Training Sessions
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {trainingSessions.map((session, sessionIndex) => (
            <motion.div
              key={sessionIndex}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sessionIndex * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className={`bg-${session.color} p-4 flex items-center justify-center`}>
                <img src={session.icon} alt={session.title} className="h-16 w-auto" />
              </div>
              
              <div className="p-6">
                <h3 className={`text-xl font-audiowide text-${session.color} mb-6 text-center`}>
                  {session.title}
                </h3>
                
                <ul className="space-y-3">
                  {session.courses.map((course, courseIndex) => (
                    <motion.li
                      key={courseIndex}
                      className="flex items-center"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: sessionIndex * 0.1 + courseIndex * 0.1 + 0.3 
                      }}
                    >
                      <span className={`text-${session.color} mr-2`}>•</span>
                      <span className="text-gray-800">{course}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Centralized Learn More button */}
        <div className="flex justify-center">
          <motion.a
            href="/training"
            className="bg-primary-red hover:bg-primary-blue text-white font-audiowide py-3 px-8 rounded-md transition-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Our Training Sessions
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const MainEventSection = () => {
  return (
    <section id="main-event" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0 bg-[url('../assets/MARC-Logo.png')] bg-center bg-no-repeat bg-contain"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <motion.h2
              className="text-4xl md:text-5xl font-audiowide text-primary-blue mb-6 text-center md:text-left"
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {content.mainEvent.title}
            </motion.h2>

            <motion.div
              className="prose prose-lg mb-8 max-w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedText
                text={content.mainEvent.description}
                className="text-lg leading-relaxed block text-center md:text-left"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {content.mainEvent.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="bg-background rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-sm font-audiowide text-primary-blue">{highlight}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center md:text-left">
              <motion.a
                href="/event"
                className="inline-block bg-primary-red hover:bg-primary-orange text-white font-audiowide py-3 px-8 rounded-md transition-all transform hover:scale-105 hover:shadow-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Challenge
              </motion.a>
            </div>
          </div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LazyImage
              src={marcLogo}
              alt="MARC Hackathon Logo"
              className="w-64 md:w-96 h-auto transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.activities.title}
        </motion.h2>
        
        <motion.h3 
          className="text-2xl font-audiowide text-primary-red text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.activities.subtitle}
        </motion.h3>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <AnimatedText 
            text={content.activities.description}
            className="text-lg leading-relaxed block"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.activities.categories.map((category, index) => (
            <motion.div 
              key={index}
              className="bg-background rounded-lg shadow-lg overflow-hidden group"
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="relative overflow-hidden h-72">
                <LazyImage 
                  src={index === 0 ? teamFestivalImage : workshopsImage} 
                  alt={category.title} 
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-audiowide text-xl">{category.title}</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-audiowide text-primary-blue mb-4">{category.title}</h4>
                <p className="text-sm">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <HistorySection />
      <CellsSection />
      <TrainingSection />
      <MainEventSection />
      <ActivitiesSection />
    </div>
  );
};

export default HomePage;