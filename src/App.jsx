import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import SuccessStories from './pages/SuccessStories';
import Contact from './pages/Contact';
import ReadingApp from './pages/ReadingApp';
import DEBeginnerHome from './pages/DEBeginnerHome';
import DEBeginnerExercise from './pages/DEBeginnerExercise';
import DEBeginnerReview from './pages/DEBeginnerReview';
import DEBeginnerLBReview from './pages/DEBeginnerLBReview';

// Helper component to reset scroll position to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-background text-on-surface">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reading-app" element={<ReadingApp />} />
            <Route path="/de-beginner" element={<DEBeginnerHome />} />
            <Route path="/de-beginner/exercise/:id" element={<DEBeginnerExercise />} />
            <Route path="/de-beginner/review" element={<DEBeginnerReview />} />
            <Route path="/de-beginner/language-builder" element={<DEBeginnerLBReview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
