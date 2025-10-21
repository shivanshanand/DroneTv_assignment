import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProfessionalsList from "./pages/ProfessionalsList";
import PortfolioPage from "./pages/PortfolioPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navbar - Fixed at top */}
        <Navbar />

        {/* Main Content Area with padding for navbar */}
        <main className="pt-16">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Home Page - Landing/Welcome */}
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />

              {/* Create Portfolio - Template selection & form */}
              <Route
                path="/browse"
                element={
                  <PageWrapper>
                    <ProfessionalsList />
                  </PageWrapper>
                }
              />

              {/* View Portfolio - Generated portfolio display */}
              <Route
                path="/portfolio/:id"
                element={
                  <PageWrapper>
                    <PortfolioPage />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </Router>
  );
}

// Page Wrapper Component for consistent animations
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default App;
