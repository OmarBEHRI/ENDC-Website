import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

// Import components
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import EventPage from './pages/EventPage'
import TrainingPage from './pages/TrainingPage'

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // If there's a hash, scroll to the element with that id
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // Otherwise scroll to top
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/training" element={<TrainingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
