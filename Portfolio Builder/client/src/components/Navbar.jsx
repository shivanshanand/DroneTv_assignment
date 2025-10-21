import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Home,
  Users,
  Sparkles,
  Menu,
  X,
  ArrowRight,
  Zap,
  ExternalLink,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Track scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/browse", label: "Browse Portfolios", icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Animation variants
  const navbarVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
        style={{
          borderColor: scrolled
            ? "rgba(229, 231, 235, 0.8)"
            : "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Enhanced */}
            <Link to="/" className="flex items-center gap-3 group z-10">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    scrolled
                      ? "bg-gradient-to-br from-blue-600 to-purple-600"
                      : "bg-gradient-to-br from-blue-500 to-purple-500"
                  }`}
                >
                  <Sparkles
                    className={`w-6 h-6 transition-colors duration-300 ${
                      scrolled ? "text-white" : "text-white"
                    }`}
                  />
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
              </motion.div>

              <div className="hidden sm:block">
                <span
                  className={`text-2xl font-black transition-colors duration-300 ${
                    scrolled ? "text-gray-900" : "text-white drop-shadow-lg"
                  }`}
                >
                  Portfolio
                  <span
                    className={`transition-colors duration-300 ${
                      scrolled
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        : "text-purple-300"
                    }`}
                  >
                    Gen
                  </span>
                </span>
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <Link key={link.path} to={link.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        active
                          ? scrolled
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                          : scrolled
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10 backdrop-blur-sm"
                      }`}
                    >
                      {/* Active background animation */}
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl -z-10"
                          style={{
                            background: scrolled
                              ? "linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))"
                              : "rgba(255, 255, 255, 0.2)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* ✅ ONLY ONE SET OF ICON + LABEL */}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Check if already on home page
                  if (location.pathname === "/") {
                    // Scroll to templates section
                    document.getElementById("templates")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    // Navigate to home page
                    navigate("/");
                  }
                }}
                className={`group ml-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-lg ${
                  scrolled
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/50"
                    : "bg-white text-purple-600 hover:shadow-white/50"
                }`}
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Create Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className={`md:hidden relative p-3 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20"
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with Glassmorphism */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-full left-0 right-0 backdrop-blur-2xl bg-white/95 border-b border-gray-200 shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);

                  return (
                    <motion.div key={link.path} variants={mobileItemVariants}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-xl ${
                              active
                                ? "bg-white/20"
                                : "bg-gradient-to-br from-blue-100 to-purple-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                active ? "text-white" : "text-purple-600"
                              }`}
                            />
                          </div>
                          <span className="flex-1">{link.label}</span>
                          {active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div variants={mobileItemVariants}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Create Portfolio</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>

                {/* Mobile Menu Footer */}
                <motion.div
                  variants={mobileItemVariants}
                  className="pt-4 border-t border-gray-200"
                >
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Free Forever
                    </span>
                    <span>•</span>
                    <span>No Credit Card</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
