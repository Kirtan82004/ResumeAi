import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <Router>
      <ResumeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ResumeProvider>
    </Router>
  );
}

export default App;