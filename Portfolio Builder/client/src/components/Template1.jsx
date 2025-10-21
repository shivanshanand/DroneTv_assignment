import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Template1 = ({ data }) => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={scaleIn} className="mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <img
                src={data.hero.profileImage}
                alt={data.hero.name}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-slate-800 shadow-2xl relative z-10 mx-auto"
              />
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {data.hero.name}
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 font-light"
          >
            {data.hero.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {data.hero.tagline}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16"
          >
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full mx-auto flex justify-center">
              <div className="w-1.5 h-3 bg-blue-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <motion.div
            variants={containerVariants}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-2xl"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 text-center"
            >
              {data.about.bio}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
            >
              <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
                <FaEnvelope className="text-xl" />
                <span className="text-sm truncate">{data.about.email}</span>
              </div>
              {data.about.phone && (
                <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
                  <FaPhone className="text-xl" />
                  <span className="text-sm">{data.about.phone}</span>
                </div>
              )}
              {data.about.location && (
                <div className="flex items-center justify-center gap-3 text-gray-400 hover:text-blue-400 transition-colors">
                  <FaMapMarkerAlt className="text-xl" />
                  <span className="text-sm">{data.about.location}</span>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6"
            >
              {data.about.socials.linkedin && (
                <a
                  href={data.about.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110">
                    <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              )}
              {data.about.socials.github && (
                <a
                  href={data.about.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-all duration-300 hover:scale-110">
                    <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              )}
              {data.about.socials.twitter && (
                <a
                  href={data.about.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-all duration-300 hover:scale-110">
                    <FaTwitter className="text-xl group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {data.skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              >
                <span className="text-sm sm:text-base font-medium text-gray-300">
                  {skill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.services.map(
              (service, index) =>
                service.title && (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 group"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </motion.div>
                )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Work
          </h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data.portfolio.map(
              (project, index) =>
                project.title && (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "https://via.placeholder.com/600x400/1e293b/475569"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-400 font-medium">
                        <span>View Project</span>
                        <FaExternalLinkAlt className="text-sm" />
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      {data.testimonials.some((t) => t.name) && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Client Testimonials
            </h2>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.testimonials.map(
                (testimonial, index) =>
                  testimonial.name && (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                    >
                      <p className="text-gray-300 italic mb-4 leading-relaxed text-sm">
                        "{testimonial.quote}"
                      </p>
                      <div className="border-t border-slate-800 pt-4">
                        <p className="font-semibold text-blue-400">
                          {testimonial.name}
                        </p>
                        {testimonial.company && (
                          <p className="text-gray-500 text-sm">
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )
              )}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Blog Section */}
      {data.blog.title && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Latest from Blog
            </h2>

            <motion.div
              variants={scaleIn}
              className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                {data.blog.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {data.blog.summary}
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            {data.contact.message}
          </p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-8"
          >
            <motion.a
              variants={itemVariants}
              href={`mailto:${data.contact.email || data.about.email}`}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <FaEnvelope />
              Send Email
            </motion.a>
            {(data.contact.phone || data.about.phone) && (
              <motion.a
                variants={itemVariants}
                href={`tel:${data.contact.phone || data.about.phone}`}
                className="px-8 py-4 bg-slate-800 rounded-full font-semibold hover:bg-slate-700 transition-all duration-300 border border-slate-700 hover:border-blue-500 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <FaPhone />
                Call Me
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {data.hero.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Template1;
