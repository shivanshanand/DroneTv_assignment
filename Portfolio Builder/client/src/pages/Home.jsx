import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle,
  Star,
  Users,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Rocket,
  ChevronRight,
  Quote,
  Play,
  ArrowRight,
} from "lucide-react";
import TemplateSelection from "../components/TemplateSelection";
import PortfolioForm from "../components/PortfolioForm";

const Home = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Testimonials Data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Designer",
      company: "Airbnb",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      quote:
        "This is the easiest way to build a portfolio. I had mine ready in under 10 minutes and landed 3 client calls the same week!",
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "Google",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      quote:
        "The templates are stunning and super customizable. Finally, a portfolio builder that doesn't look generic!",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Figma",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      quote:
        "I've tried 5+ portfolio builders. This one is hands down the best. The animations and modern design are 🔥",
    },
    {
      name: "David Kim",
      role: "Creative Director",
      company: "Netflix",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      quote:
        "My clients are impressed every time they see my portfolio. The professional look helped me increase my rates by 40%!",
    },
  ];

  // Stats Data
  const stats = [
    { value: "10K+", label: "Portfolios Created", icon: Users },
    { value: "4.9/5", label: "Average Rating", icon: Star },
    { value: "99%", label: "Satisfaction Rate", icon: Award },
    { value: "<10min", label: "Setup Time", icon: Clock },
  ];

  // Features Data
  const features = [
    {
      icon: Zap,
      title: "Build in Minutes",
      description: "No coding required. Just fill in your details and go live.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Sparkles,
      title: "Professional Designs",
      description: "Stunning templates designed by award-winning designers.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "100% Responsive",
      description: "Looks perfect on any device - mobile, tablet, or desktop.",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "SEO Optimized",
      description: "Built with best practices to help you rank on Google.",
      color: "from-green-400 to-emerald-500",
    },
  ];

  // Process Steps
  const steps = [
    {
      number: "01",
      title: "Choose Template",
      description:
        "Pick from our collection of stunning, professional templates",
    },
    {
      number: "02",
      title: "Fill Details",
      description: "Add your info, projects, and skills in our intuitive form",
    },
    {
      number: "03",
      title: "Go Live",
      description: "Publish your portfolio and start getting noticed instantly",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {!selectedTemplate ? (
        <>
          {/* Hero Section - Enhanced */}
          <motion.section
            style={{ opacity, scale }}
            className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
          >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-center"
              >
                {/* Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    <span>#1 Portfolio Builder of 2025</span>
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
                >
                  Create Your Dream Portfolio
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      In Minutes, Not Hours
                    </span>
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="12"
                      viewBox="0 0 200 12"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    >
                      <motion.path
                        d="M2 10 Q50 2, 100 6 T198 10"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={itemVariants}
                  className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                  Stand out from the crowd with a stunning portfolio that
                  showcases your work beautifully.{" "}
                  <span className="font-semibold text-purple-600">
                    No design or coding skills needed.
                  </span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      document
                        .getElementById("templates")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2"
                  >
                    <Rocket className="w-5 h-5" />
                    Start Building Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-white text-gray-700 font-semibold rounded-full border-2 border-gray-200 hover:border-purple-300 shadow-lg transition-all flex items-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center items-center gap-8"
                >
                  {[
                    "No Credit Card Required",
                    "Free Forever",
                    "1000+ Happy Users",
                  ].map((text, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-3 bg-gray-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                        <Icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                  Why Choose Us?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Everything you need to create a portfolio that gets you
                  noticed
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
                      />

                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* How It Works Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600">
                  Get your portfolio live in 3 simple steps
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-purple-300 to-transparent">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                        />
                      </div>
                    )}

                    <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                        <span className="text-2xl font-black text-white">
                          {step.number}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section - Star Feature */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Rated 4.9/5 by 10,000+ Users</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                  Loved by Professionals Worldwide
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join thousands of designers, developers, and creators who
                  trust us
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-purple-200">
                      <Quote className="w-12 h-12" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full border-4 border-white shadow-md"
                      />
                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role} at{" "}
                          <span className="font-semibold text-purple-600">
                            {testimonial.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Templates Section */}
          <motion.section
            id="templates"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                  Choose Your Perfect Template
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Professional designs that make you stand out
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <TemplateSelection onTemplateSelect={setSelectedTemplate} />
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full opacity-20"
            >
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
            </motion.div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                  Ready to Build Your Dream Portfolio?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join 10,000+ professionals who've already created their
                  stunning portfolios
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document
                      .getElementById("templates")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="group px-10 py-5 bg-white text-purple-600 font-black text-xl rounded-full shadow-2xl hover:shadow-white/50 transition-all inline-flex items-center gap-3"
                >
                  Get Started Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <p className="mt-6 text-white/80 text-sm">
                  No credit card required • Takes less than 10 minutes
                </p>
              </motion.div>
            </div>
          </motion.section>
        </>
      ) : (
        // Template Selected - Form View
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="animate-slide-up"
          >
            {/* Back Navigation */}
            <div className="mb-8">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 group shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">Change Template</span>
              </button>
            </div>

            {/* Selected Template Info Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm font-semibold mb-1">
                      You're creating with
                    </p>
                    <h3 className="text-white text-3xl font-black">
                      Template {selectedTemplate}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/20">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-bold">
                    Ready to Customize
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Form Container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PortfolioForm selectedTemplate={selectedTemplate} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
