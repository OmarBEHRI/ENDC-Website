import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import content from '../data/content.json';
import marcLogo from '../assets/MARC-Logo.png';
import HomeButton from "../components/ui/HomeButton";
import endcSub from "../assets/ENDC-LOGO-SUB.png"

// Word animation variants
const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    }
  }
};

// Word-by-word animated text component
const AnimatedText = ({ text, className }) => {
  // Split the text into words
  const words = text.split(' ');
  
  return (
    <motion.div
      className={className}
      variants={wordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span 
          key={index} 
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Geometric shapes component
const GeometricShapes = () => {
  const { scrollYProgress } = useScroll();
  
  // Create multiple transform effects for different shapes
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  
  // Create arrays of shapes for left and right sides
  const leftShapes = [
    // Left side shapes
    { type: 'triangle', color: '#dc4c43', top: '10%', left: '2%', size: 16, rotate: rotate1, hollow: false },
    { type: 'square', color: '#2a3666', top: '25%', left: '4%', size: 14, rotate: rotate2, hollow: true },
    { type: 'circle', color: '#3592db', top: '40%', left: '3%', size: 12, scale: scale1, hollow: false },
    { type: 'triangle', color: '#e86b2d', top: '55%', left: '5%', size: 10, rotate: rotate3, hollow: true },
    { type: 'square', color: '#4176ab', top: '70%', left: '2%', size: 18, rotate: rotate4, hollow: false },
    { type: 'circle', color: '#dc4c43', top: '85%', left: '4%', size: 15, scale: scale2, hollow: true },
    { type: 'triangle', color: '#2a3666', top: '15%', left: '6%', size: 12, rotate: rotate2, hollow: false },
    { type: 'square', color: '#e86b2d', top: '30%', left: '1%', size: 10, rotate: rotate1, hollow: true },
    { type: 'circle', color: '#4176ab', top: '65%', left: '6%', size: 14, scale: scale1, hollow: false },
  ];
  
  const rightShapes = [
    // Right side shapes
    { type: 'triangle', color: '#3592db', top: '15%', right: '3%', size: 14, rotate: rotate4, hollow: true },
    { type: 'square', color: '#e86b2d', top: '30%', right: '5%', size: 16, rotate: rotate3, hollow: false },
    { type: 'circle', color: '#2a3666', top: '45%', right: '2%', size: 12, scale: scale2, hollow: true },
    { type: 'triangle', color: '#4176ab', top: '60%', right: '4%', size: 10, rotate: rotate1, hollow: false },
    { type: 'square', color: '#dc4c43', top: '75%', right: '3%', size: 18, rotate: rotate2, hollow: true },
    { type: 'circle', color: '#e86b2d', top: '90%', right: '5%', size: 15, scale: scale1, hollow: false },
    { type: 'triangle', color: '#3592db', top: '20%', right: '6%', size: 12, rotate: rotate3, hollow: true },
    { type: 'square', color: '#2a3666', top: '35%', right: '1%', size: 10, rotate: rotate4, hollow: false },
    { type: 'circle', color: '#dc4c43', top: '50%', right: '6%', size: 14, scale: scale2, hollow: true },
  ];
  
  // Render triangle shape
  const renderTriangle = (shape) => {
    return (
      <motion.div 
        className="hidden md:block absolute"
        style={{
          top: shape.top,
          ...(shape.left ? { left: shape.left } : { right: shape.right }),
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          zIndex: 10,
          rotate: shape.rotate
        }}
      >
        {shape.hollow ? (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid transparent`,
              boxShadow: `0 0 0 2px ${shape.color}`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              opacity: 0.7,
            }}
          />
        ) : (
          <div 
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size/2}px solid transparent`,
              borderRight: `${shape.size/2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              opacity: 0.6,
            }}
          />
        )}
      </motion.div>
    );
  };
  
  // Render square shape
  const renderSquare = (shape) => {
    return (
      <motion.div 
        className="hidden md:block absolute"
        style={{
          top: shape.top,
          ...(shape.left ? { left: shape.left } : { right: shape.right }),
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          zIndex: 10,
          rotate: shape.rotate
        }}
      >
        {shape.hollow ? (
          <div 
            style={{
              width: '100%',
              height: '100%',
              border: `2px solid ${shape.color}`,
              backgroundColor: 'transparent',
              opacity: 0.7,
              transform: 'rotate(45deg)',
            }}
          />
        ) : (
          <div 
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: shape.color,
              opacity: 0.6,
              transform: 'rotate(45deg)',
            }}
          />
        )}
      </motion.div>
    );
  };
  
  // Render circle shape
  const renderCircle = (shape) => {
    return (
      <motion.div 
        className="hidden md:block absolute"
        style={{
          top: shape.top,
          ...(shape.left ? { left: shape.left } : { right: shape.right }),
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          zIndex: 10,
          scale: shape.scale
        }}
      >
        {shape.hollow ? (
          <div 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: `2px solid ${shape.color}`,
              backgroundColor: 'transparent',
              opacity: 0.7,
            }}
          />
        ) : (
          <div 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: shape.color,
              opacity: 0.6,
            }}
          />
        )}
      </motion.div>
    );
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {leftShapes.map((shape, index) => (
        <React.Fragment key={`left-${index}`}>
          {shape.type === 'triangle' && renderTriangle(shape)}
          {shape.type === 'square' && renderSquare(shape)}
          {shape.type === 'circle' && renderCircle(shape)}
        </React.Fragment>
      ))}
      
      {rightShapes.map((shape, index) => (
        <React.Fragment key={`right-${index}`}>
          {shape.type === 'triangle' && renderTriangle(shape)}
          {shape.type === 'square' && renderSquare(shape)}
          {shape.type === 'circle' && renderCircle(shape)}
        </React.Fragment>
      ))}
    </div>
  );
};

const EventPage = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden relative">
      <HomeButton />
      <GeometricShapes />
      
      {/* Hero Section with glass morphism effect */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Continuous MARC Banner */}
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap flex flex-col items-center" style={{ zIndex: 20 }}>
          <div className="w-full flex overflow-hidden">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: ["-50%", "0%"]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear"
                }
              }}
            >
              <span className="text-2xl font-audiowide text-white opacity-60">
                &nbsp;MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC
              </span>
              <span className="text-2xl font-audiowide text-white opacity-60">
                &nbsp;MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC MARC
              </span>
            </motion.div>
          </div>
          <div className="w-[80%] h-[2px] bg-white mt-2 opacity-60"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-blue/80">
          <div className="absolute inset-0 bg-[url('../assets/MARC-Logo.png')] bg-center bg-no-repeat bg-cover opacity-5"></div>
        </div>
        <img 
          src={endcSub}
          alt="ENDC Subsidiary Logo"
          style={{
            height: '90vh',
            width: 'auto',
            position: 'absolute',
            left: '60%',
            top: '8%',
            zIndex: 1
          }}
          className="opacity-35"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-white">
              <motion.div
                className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg mb-6"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-lg font-medium text-primary-red">March 23-25, 2025</h2>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-audiowide mb-4 drop-shadow-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {content.mainEvent.title}
              </motion.h1>
              
              <motion.h2
                className="text-2xl md:text-3xl font-audiowide text-primary-red mb-6 drop-shadow-sm"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {content.mainEvent.subtitle}
              </motion.h2>
              
              <motion.div
                className="mb-8 max-w-lg backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <AnimatedText 
                  text={content.mainEvent.description}
                  className="text-lg leading-relaxed block"
                />
              </motion.div>
              
              <div className="flex justify-center">
                <a href="https://forms.gle/QeqH5UiHMi1keTnV8" target='_blank'>
                  <motion.button
                    className="bg-primary-red hover:bg-primary-orange text-white font-audiowide py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{content.mainEvent.ctaText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </a>
              </div>
            </div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            >
              <div className="relative">
                <img 
                  src={marcLogo} 
                  alt="MARC Logo" 
                  className="w-[300px] md:w-[500px] h-auto relative z-10 drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(17px 13px 10px rgba(0, 0, 0, 0.5))'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Theme Section with card design */}
      <section className="py-24 relative">
        <motion.div 
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-blue/10 to-transparent"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 60%)",
          }}
        />
        
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-20 h-1 bg-primary-blue"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-audiowide text-primary-blue mb-4">Theme</h2>
            <h3 className="text-xl md:text-2xl font-audiowide text-primary-red mb-8 max-w-2xl mx-auto">{content.mainEvent.theme}</h3>
            <p className="text-xl italic max-w-2xl mx-auto font-light bg-gradient-to-r from-primary-blue to-primary-red bg-clip-text text-transparent overflow-hidden">
              <AnimatedText text={`"${content.mainEvent.tagline}"`} className="inline-block" />
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.mainEvent.highlights.map((highlight, index) => (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-primary-red rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="bg-white rounded-xl shadow-xl p-8 text-center h-full flex flex-col justify-center items-center border border-gray-100 relative z-10">

                  <h4 className="text-xl font-audiowide text-primary-blue mb-2">{highlight}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary-blue to-primary-blue/90 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-red/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-5xl font-audiowide mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Shape the Future?
            </motion.h2>
            
            <motion.p
              className="text-xl max-w-2xl mx-auto mb-12 text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join MARC Hackathon 2025 and be part of a movement that's creating AI-driven robotic solutions to empower individuals with disabilities.
            </motion.p>
            
            <a href="https://forms.gle/QeqH5UiHMi1keTnV8" target='_blank'>
              <motion.button
                className="bg-white hover:bg-primary-orange hover:text-white text-primary-blue font-audiowide py-4 px-12 rounded-full transition-all transform shadow-xl border-4 border-white/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.1, delay: 0 }}
                whileHover={{ y: -5, backgroundColor: "#FF6B35", color: "#FFFFFF" }}
                whileTap={{ scale: 0.95 }}
              >
                {content.mainEvent.ctaText}
              </motion.button>
            </a>
          </div>
          
          <motion.div 
            className="mt-16 flex justify-center opacity-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <img src={marcLogo} alt="MARC Logo" className="h-12 w-auto" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventPage;