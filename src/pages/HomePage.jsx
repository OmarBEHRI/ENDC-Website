import React, { useEffect, useRef, useMemo, useState } from 'react';
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
import marcLogo from '../assets/MARC-Logo.png';

// Import activity images
import teamFestivalImage from '../assets/team-festival-des-sciences.png';
import workshopsImage from '../assets/workshops.png';

// Import LazyImage component
import LazyImage from '../components/ui/LazyImage';


// Animation variants
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Text animation component
const AnimatedText = ({ text, className }) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={textVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
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
    <section id="hero" className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center w-full px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-audiowide mb-4 sm:mb-6"
          style={{ color: 'rgba(32, 32, 32, 0.8)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {content.hero.title}
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-audiowide"
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

const SectionContainer = ({ children, className = "" }) => (
  <div className={`container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl ${className}`}>
    {children}
  </div>
);

const HistorySection = () => {
  return (
    <section id="history" className="py-20 bg-white w-screen">
  <SectionContainer>
    <motion.h2 
      className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {content.history.title}
    </motion.h2>

    {/* Centered Description */}
    <div className="max-w-4xl w-full mx-auto grid grid-cols-1 gap-6 mb-12 px-4">
      <div className="flex flex-col items-center justify-center">
        {content.history.description.split('. ').map((sentence, index) => (
          <div key={index} className="text-center w-full">
            <AnimatedText 
              text={sentence + '.'}
              className="text-lg leading-relaxed"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Clubs Section - Ensuring Full Width */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-40"> {/* Container to maintain alignment */}
          <img 
            src={aiClubLogo} 
            alt="AI Club Logo" 
            className="h-40 w-auto mb-4" 
          />
        </div>
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
        <div className="h-40"> {/* Container to maintain alignment */}
          <img 
            src={roboticsClubLogo} 
            alt="Robotics Club Logo" 
            className="h-32 w-auto mb-4"
          />
        </div>
        <h3 className="text-xl font-audiowide text-primary-blue">Ensias Robotics Club</h3>
      </motion.div>
    </div>
  </SectionContainer>
</section>
  );
};

const CellsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  
  const renderCardCarousel = (cells, cellType) => {
    return (
      <div className="relative w-full h-[28rem] flex items-center justify-center overflow-hidden my-12">
        {[...cells].reverse().map((cell, idx) => {
          const index = cells.length - 1 - idx;
          const isHovered = hoveredIndex === index && hoveredSection === cellType;
          
          // Calculate center offset
          const centerOffset = (cells.length * 6 * 16) / 2;
          
          // Calculate position based on hover state
          const xPos = 
            hoveredSection === null ? `calc(${index * 6}rem - ${centerOffset}px + 50%)` : 
            hoveredSection !== cellType ? `calc(${index * 6}rem - ${centerOffset}px + 50%)` :
            index <= hoveredIndex 
              ? `calc(${index * 6}rem - ${centerOffset}px + 50% - 6rem)` 
              : `calc(${index * 6}rem - ${centerOffset}px + 50% + 12rem)`;

          // Get the correct icon
          const getIcon = () => {
            if (cellType === 'technical') {
              switch(cell.name) {
                case "AI Cell": return aiCellIcon;
                case "Data Cell": return dataCellIcon;
                case "Robotics Cell": return roboticsCellIcon;
                default: return projectCellIcon;
              }
            } else {
              switch(cell.name) {
                case "Media Cell": return mediaCellIcon;
                case "Sponsorship Cell": return sponsorCellIcon;
                case "Events Cell": return eventCellIcon;
                default: return designCellIcon;
              }
            }
          };

          const icon = getIcon();

          return (
            <motion.div
              key={index}
              className="absolute top-0 bottom-0 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              style={{
                width: isHovered ? '24rem' : '12rem', 
                height: '100%',
                zIndex: index,
                originX: 0
              }}
              animate={{
                left: xPos,
                boxShadow: isHovered 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onHoverStart={() => {
                setHoveredIndex(index);
                setHoveredSection(cellType);
              }}
              onHoverEnd={() => {
                setHoveredIndex(null);
                setHoveredSection(null);
              }}
            >
              {/* Background image (always visible with opacity) */}
              <div className="absolute inset-0">
                <img 
                  src={icon}
                  alt={cell.name}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              {/* Vertical title (visible when not hovered) */}
              <motion.div 
                className="absolute left-4 top-0 bottom-0 flex items-center origin-left"
                animate={{ 
                  opacity: isHovered ? 0 : 1,
                  rotateZ: -90
                }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xl font-audiowide text-primary-blue whitespace-nowrap">
                  {cell.name}
                </h4>
              </motion.div>
              
              {/* Expanded card content (visible when hovered) */}
              <motion.div 
                className="absolute inset-0 flex overflow-hidden"
                animate={{ 
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Left side image */}
                <div className="w-3/5 relative">
                  <img 
                    src={icon}
                    alt={cell.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-50"></div>
                </div>
                
                {/* Right side text content */}
                <div className="w-2/5 p-6 flex flex-col justify-start pt-12">
                  <h3 className="text-xl font-audiowide text-primary-blue mb-4">
                    {cell.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {cell.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="cells" className="py-20 bg-background w-full">
      <SectionContainer>
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.cells.title}
        </motion.h2>
        
        <div className="max-w-3xl w-full mx-auto grid grid-cols-1 gap-6 mb-12">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-full">
              <AnimatedText 
                text={content.cells.description}
                className="text-lg leading-relaxed"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-audiowide text-primary-red text-center mb-8">Technical Cells</h3>
          {renderCardCarousel(content.cells.technical, 'technical')}
        </div>
        
        <div>
          <h3 className="text-2xl font-audiowide text-primary-red text-center mb-8">Non-Technical Cells</h3>
          {renderCardCarousel(content.cells.nonTechnical, 'nonTechnical')}
        </div>
      </SectionContainer>
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
    <section id="training" className="py-20 bg-background relative w-full">
      <SectionContainer>
        <motion.h2 
          className="text-3xl md:text-4xl font-audiowide text-primary-blue text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Explore Our Training Sessions
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
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
      </SectionContainer>
    </section>
  );
};

const MainEventSection = () => {
  return (
    <section id="main-event" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden w-full">
      <SectionContainer>
        {/* Title at the top */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-audiowide text-primary-blue text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {content.mainEvent.title}
        </motion.h2>

        {/* Description */}
        <div className="w-full mb-12">
          <div className="text-center w-full max-w-6xl mx-auto">
            <AnimatedText
              text={content.mainEvent.description}
              className="text-base sm:text-lg leading-relaxed"
            />
          </div>
        </div>

        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Logo - Centered and Larger */}
          <motion.div
            className="w-full flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LazyImage
              src={marcLogo}
              alt="MARC Hackathon Logo"
              className="w-72 sm:w-96 md:w-[500px] lg:w-[600px] h-auto transition-all duration-300 hover:scale-105"
            />
          </motion.div>

          {/* Call to Action - Centered */}
          <motion.a
            href="/event"
            className="inline-block bg-primary-red hover:bg-primary-orange text-white font-audiowide py-4 px-8 rounded-md transition-all transform hover:scale-105 hover:shadow-lg text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Challenge
          </motion.a>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full">
            {content.mainEvent.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-sm sm:text-base font-audiowide text-primary-blue">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-20 w-full">
      <SectionContainer>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <img 
                  src={index === 0 ? teamFestivalImage : workshopsImage} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
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
      </SectionContainer>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
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