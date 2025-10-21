import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaRocket,
  FaStar,
  FaHeart,
} from "react-icons/fa";

const Template2 = ({ data }) => {
  // Animation Variants
  const bounceIn = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Asymmetric Bold Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        {/* Animated Background Blobs */}
        <motion.div
          animate={rotateAnimation}
          className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div
          animate={{
            ...rotateAnimation,
            transition: { ...rotateAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />
        <motion.div
          animate={floatAnimation}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image with Creative Frame */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInLeft}
              className="relative"
            >
              <motion.div animate={floatAnimation} className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-[3rem] rotate-6 blur-xl opacity-75"></div>
                <div className="absolute -inset-4 bg-gradient-to-l from-cyan-400 via-blue-500 to-purple-600 rounded-[3rem] -rotate-6 blur-xl opacity-75"></div>
                <img
                  src={data.hero.profileImage}
                  alt={data.hero.name}
                  className="relative w-full max-w-md mx-auto aspect-square object-cover rounded-[3rem] border-8 border-white shadow-2xl"
                />
                {/* Floating Emoji Decorations */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-8 -right-8 text-6xl"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute -bottom-8 -left-8 text-6xl"
                >
                  🚀
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInRight}
              className="text-white text-center lg:text-left"
            >
              <motion.h1
                variants={bounceIn}
                className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 drop-shadow-2xl"
              >
                {data.hero.name}
              </motion.h1>
              <motion.h2
                variants={popIn}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-yellow-300 drop-shadow-lg"
              >
                {data.hero.title}
              </motion.h2>
              <motion.p
                variants={popIn}
                className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md"
              >
                {data.hero.tagline}
              </motion.p>

              {/* Animated CTA Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transform transition-all inline-flex items-center gap-3"
              >
                Let's Connect <FaRocket className="animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Wavy Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* About Section - Split Layout with Colorful Accents */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={popIn}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          >
            About Me 👋
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio Section */}
            <motion.div
              variants={slideInLeft}
              className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <p className="text-gray-800 text-lg leading-relaxed relative z-10">
                {data.about.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-8 relative z-10">
                {data.about.socials.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    href={data.about.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-2xl"
                  >
                    <FaLinkedin />
                  </motion.a>
                )}
                {data.about.socials.github && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    href={data.about.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-2xl"
                  >
                    <FaGithub />
                  </motion.a>
                )}
                {data.about.socials.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    href={data.about.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-2xl"
                  >
                    <FaTwitter />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={slideInRight} className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 shadow-lg text-white flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                  <FaEnvelope />
                </div>
                <span className="text-lg font-semibold">
                  {data.about.email}
                </span>
              </motion.div>

              {data.about.phone && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 shadow-lg text-white flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    <FaPhone />
                  </div>
                  <span className="text-lg font-semibold">
                    {data.about.phone}
                  </span>
                </motion.div>
              )}

              {data.about.location && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 shadow-lg text-white flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    <FaMapMarkerAlt />
                  </div>
                  <span className="text-lg font-semibold">
                    {data.about.location}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section - Colorful Bubble Cloud */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={bounceIn}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            Skills & Magic ✨
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {data.skills.map((skill, index) => {
              const colors = [
                "from-pink-400 to-rose-600",
                "from-purple-400 to-indigo-600",
                "from-cyan-400 to-blue-600",
                "from-yellow-400 to-orange-600",
                "from-green-400 to-emerald-600",
                "from-red-400 to-pink-600",
              ];
              const randomColor = colors[index % colors.length];

              return (
                <motion.div
                  key={index}
                  variants={popIn}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 },
                  }}
                  className={`px-6 py-3 bg-gradient-to-r ${randomColor} text-white font-bold rounded-full shadow-lg hover:shadow-2xl cursor-pointer transform transition-all`}
                >
                  {skill}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - Creative Cards with Numbers */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={bounceIn}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            What I Do 🎨
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-8">
            {data.services.map(
              (service, index) =>
                service.title && (
                  <motion.div
                    key={index}
                    variants={slideInLeft}
                    whileHover={{ x: 20, scale: 1.02 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
                      {/* Large Number */}
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl font-black bg-gradient-to-br from-pink-500 to-purple-600 bg-clip-text text-transparent opacity-20 select-none"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section - Asymmetric Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={bounceIn}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            My Creative Work 🎯
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.portfolio.map(
              (project, index) =>
                project.title && (
                  <motion.div
                    key={index}
                    variants={popIn}
                    whileHover={{ y: -15, rotate: 2 }}
                    className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all ${
                      index % 3 === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "https://via.placeholder.com/600x450/ff00ff/ffffff"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {project.description}
                      </p>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="mt-4 inline-flex items-center gap-2 text-yellow-300 font-semibold"
                      >
                        View Project <FaStar />
                      </motion.div>
                    </div>
                  </motion.div>
                )
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section - Colorful Quote Cards */}
      {data.testimonials.some((t) => t.name) && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={bounceIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              Client Love 💖
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {data.testimonials.map(
                (testimonial, index) =>
                  testimonial.name && (
                    <motion.div
                      key={index}
                      variants={popIn}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
                    >
                      {/* Decorative Quote Mark */}
                      <div className="absolute top-4 right-4 text-6xl text-purple-300 opacity-50 font-serif">
                        "
                      </div>

                      <p className="text-gray-700 italic leading-relaxed mb-6 relative z-10">
                        {testimonial.quote}
                      </p>

                      <div className="border-t-2 border-purple-200 pt-4">
                        <p className="font-bold text-gray-800 flex items-center gap-2">
                          <FaHeart className="text-pink-500" />
                          {testimonial.name}
                        </p>
                        {testimonial.company && (
                          <p className="text-gray-500 text-sm mt-1">
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
          variants={staggerContainer}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-100 to-blue-100"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              variants={bounceIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-12 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              Latest Thoughts 📝
            </motion.h2>

            <motion.div
              variants={popIn}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-10 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {data.blog.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {data.blog.summary}
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Contact Section - Bold CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white text-center relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-30"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            variants={bounceIn}
            className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 drop-shadow-2xl"
          >
            Let's Create Magic Together! ✨
          </motion.h2>
          <motion.p
            variants={popIn}
            className="text-xl sm:text-2xl mb-12 text-white/90 max-w-2xl mx-auto drop-shadow-lg"
          >
            {data.contact.message}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.a
              variants={popIn}
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${data.contact.email || data.about.email}`}
              className="px-10 py-5 bg-white text-purple-600 font-black text-xl rounded-full shadow-2xl hover:shadow-3xl inline-flex items-center justify-center gap-3 transform transition-all"
            >
              <FaEnvelope className="text-2xl" />
              Email Me
            </motion.a>

            {(data.contact.phone || data.about.phone) && (
              <motion.a
                variants={popIn}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${data.contact.phone || data.about.phone}`}
                className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-xl rounded-full shadow-2xl hover:shadow-3xl inline-flex items-center justify-center gap-3 transform transition-all"
              >
                <FaPhone className="text-2xl" />
                Call Me
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-center text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} {data.hero.name}. Made with{" "}
          <FaHeart className="inline text-pink-500" /> and creativity!
        </p>
      </footer>
    </div>
  );
};

export default Template2;
