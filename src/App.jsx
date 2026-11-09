import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PasswordGate from './components/PasswordGate';
import { AuthProvider } from './context/AuthContext';
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
import DEBeginnerReadingReview from './pages/DEBeginnerReadingReview';
import TestPlatform from './pages/TestPlatform';
import TestDetail from './pages/TestDetail';
import TestRoom from './pages/TestRoom';
import Homework from './pages/Homework';
import HomeworkDetail from './pages/HomeworkDetail';
import Practice from './pages/Practice';
import PracticeDetail from './pages/PracticeDetail';
import VocabHub from './pages/VocabHub';
import VocabStudySet from './pages/VocabStudySet';

// Helper component to reset scroll position to top on page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const isExamRoom = pathname.includes('/exam');

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      {!isExamRoom && <Navbar />}
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
          <Route path="/de-beginner/reading-review" element={<DEBeginnerReadingReview />} />
          {/* Protected Learning Areas: Practice, Homework, Test Platform */}
          <Route element={<PasswordGate />}>
            <Route path="/test-platform" element={<TestPlatform />} />
            <Route path="/tests/:id" element={<TestDetail />} />
            <Route path="/tests/:id/exam" element={<TestRoom />} />
            <Route path="/homework" element={<Homework />} />
            <Route path="/homework/:id" element={<HomeworkDetail />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/:id" element={<PracticeDetail />} />
          </Route>
          <Route path="/vocab" element={<VocabHub />} />
          <Route path="/vocab/:setId" element={<VocabStudySet />} />
        </Routes>
      </main>
      {!isExamRoom && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
