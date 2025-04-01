import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import HomeButton from "../components/ui/HomeButton";
import marcLogoSvg from '../assets/MARC-LOGO-SVG.svg';

// Event content data
const eventData = {
  title: "MOROCCAN AI & ROBOTICS CAMP",
  dates: "11-12-13 April",
  description: "Join us for an immersive three-day experience where innovation meets education. The Moroccan AI & Robotics Camp brings together students, professionals, and enthusiasts to explore cutting-edge technologies, participate in hands-on workshops, and collaborate on projects that push the boundaries of artificial intelligence and robotics.",
  highlights: [
    "Hands-on Workshops",
    "Expert Speakers",
    "Networking Opportunities",
    "Project Showcases"
  ],
  faqs: [
    {
      question: "What is the Moroccan AI & Robotics Camp?",
      answer: "The Moroccan AI & Robotics Camp is a three-day event focused on artificial intelligence and robotics technologies. It features workshops, keynote speakers, networking sessions, and collaborative projects designed to foster innovation and learning in these fields."
    },
    {
      question: "Who can attend the camp?",
      answer: "The camp is open to students, professionals, researchers, and enthusiasts interested in AI and robotics. Whether you're a beginner looking to learn the basics or an expert wanting to share your knowledge, there's something for everyone."
    },
    {
      question: "Do I need prior experience in AI or robotics?",
      answer: "No prior experience is required for many of the workshops and sessions. We offer tracks for beginners, intermediate, and advanced participants. However, some specialized workshops may require basic programming knowledge."
    },
    {
      question: "What should I bring to the camp?",
      answer: "Participants should bring their laptops, chargers, and any specific hardware they wish to work with. For robotics workshops, basic components will be provided, but feel free to bring your own projects or equipment."
    },
    {
      question: "Will there be networking opportunities?",
      answer: "Yes! The camp includes dedicated networking sessions, collaborative project time, and social events designed to connect participants with industry professionals, researchers, and fellow enthusiasts."
    }
  ]
};

// Animated text component
const AnimatedText = ({ text, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      className={className}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.04 }}
          className="inline-block mr-2"
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
  
  // Transform effects for different shapes
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const translateX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Colors from the Moroccan AI & Robotics Camp logo
  const colors = {
    blue: '#3176AF',
    red: '#DD3C30',
    orange: '#F68B1F',
    yellow: '#F7A81B',
    navy: '#2A3666'
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Background shapes */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-16 h-16 md:w-24 md:h-24"
        style={{ rotate: rotate1 }}
      >
        <div className="w-full h-full bg-[#F7A81B] opacity-30 rounded-md transform rotate-45" />
      </motion.div>
      
      <motion.div 
        className="absolute top-[30%] right-[8%] w-20 h-20 md:w-32 md:h-32"
        style={{ rotate: rotate2 }}
      >
        <div className="w-full h-full border-4 border-[#DD3C30] opacity-40 rounded-full" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[20%] left-[15%] w-12 h-12 md:w-20 md:h-20"
        style={{ rotate: rotate3, x: translateX }}
      >
        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-[#3176AF] border-r-[30px] border-r-transparent opacity-30" />
      </motion.div>
      
      <motion.div 
        className="absolute top-[60%] right-[20%] w-16 h-16 md:w-28 md:h-28"
        style={{ y: translateY }}
      >
        <div className="w-full h-full bg-[#F68B1F] opacity-20 transform rotate-12" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-[10%] right-[10%] w-10 h-10 md:w-16 md:h-16"
        style={{ rotate: rotate1 }}
      >
        <div className="w-full h-full border-4 border-[#2A3666] opacity-30 transform rotate-45" />
      </motion.div>
      
      {/* Dots pattern */}
      <div className="absolute bottom-[30%] left-[5%] grid grid-cols-6 gap-2 opacity-30">
        {Array(24).fill().map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#F68B1F] rounded-full" />
        ))}
      </div>
      
      <div className="absolute top-[40%] right-[5%] grid grid-cols-6 gap-2 opacity-30">
        {Array(24).fill().map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#DD3C30] rounded-full" />
        ))}
      </div>
    </div>
  );
};

// FAQ Accordion component
const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div 
          key={index}
          className="mb-4 overflow-hidden border border-gray-200 rounded-lg bg-white shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gray-50 transition-colors"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-audiowide text-[#2A3666]">{faq.question}</h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#DD3C30]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const EventPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative">
      <HomeButton />
      <GeometricShapes />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Animated banner */}
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}}
          >
            <span className="text-xl md:text-2xl font-audiowide text-[#3176AF] opacity-10">
              &nbsp;MOROCCAN AI & ROBOTICS CAMP &nbsp;MOROCCAN AI & ROBOTICS CAMP &nbsp;MOROCCAN AI & ROBOTICS CAMP
            </span>
            <span className="text-xl md:text-2xl font-audiowide text-[#3176AF] opacity-10">
              &nbsp;MOROCCAN AI & ROBOTICS CAMP &nbsp;MOROCCAN AI & ROBOTICS CAMP &nbsp;MOROCCAN AI & ROBOTICS CAMP
            </span>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <img 
                src={marcLogoSvg} 
                alt="Moroccan AI & Robotics Camp Logo" 
                className="w-full max-w-[600px] h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block bg-[#F7A81B] px-8 py-3 rounded-lg mb-8"
            >
              <h2 className="text-xl md:text-2xl font-audiowide text-white">{eventData.dates}</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl mx-auto mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <AnimatedText 
                text={eventData.description}
                className="text-lg text-gray-700 leading-relaxed"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Highlights Section */}
      <section className="py-16 relative bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-audiowide text-[#2A3666] mb-4">Event Highlights</h2>
            <div className="w-24 h-1 bg-[#DD3C30] mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {eventData.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3176AF] to-[#DD3C30] rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="bg-white rounded-xl shadow-lg p-8 text-center h-full flex flex-col justify-center items-center border border-gray-100 relative z-10">
                  <h3 className="text-xl font-audiowide text-[#2A3666]">{highlight}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 relative bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-audiowide text-[#2A3666] mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#F68B1F] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about the Moroccan AI & Robotics Camp</p>
          </motion.div>
          
          <FAQAccordion faqs={eventData.faqs} />
        </div>
      </section>
      
      {/* Footer Banner */}
      <section className="py-12 bg-gradient-to-r from-[#2A3666] to-[#3176AF] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DD3C30]/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-audiowide mb-6"
            >
              Join Us for an Unforgettable Experience
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto mb-8 text-white/80"
            >
              The Moroccan AI & Robotics Camp is where innovation, education, and collaboration converge.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventPage;