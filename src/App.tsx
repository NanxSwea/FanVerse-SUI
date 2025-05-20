import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FandomPage } from './pages/FandomPage';
import { QuizPage } from './pages/QuizPage';
import { GalleryPage } from './pages/GalleryPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fandom" element={<FandomPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;