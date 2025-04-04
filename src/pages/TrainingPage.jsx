import React, { useState } from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import HomeButton from "../components/ui/HomeButton";

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

const TrainingPage = () => {
  const [activeTab, setActiveTab] = useState('AI');
  
  return (
    <div className="min-h-screen bg-background py-20">
      <HomeButton />
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-audiowide text-primary-blue text-center mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {content.training.title}
        </motion.h1>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedText 
            text={content.training.description}
            className="text-lg leading-relaxed block"
          />
        </motion.div>
        
        <Tabs defaultValue="AI" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-lg shadow-md">
              {content.training.categories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="px-8 py-3 font-audiowide text-primary-blue data-[state=active]:bg-primary-blue data-[state=active]:text-white"
                  onClick={() => setActiveTab(category.name)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {content.training.categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.sessions.map((session, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: activeTab === category.name ? 1 : 0, 
                      y: activeTab === category.name ? 0 : 50 
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={session.image} 
                        alt={session.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-audiowide text-primary-blue truncate pr-2">{session.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          session.level === 'Beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : session.level === 'Intermediate' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {session.level}
                        </span>
                      </div>
                      <p className="text-sm mb-4">{session.description}</p>
                      <button
                        className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        onClick={() => window.open(session.course, '_blank')}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Course
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TrainingPage;