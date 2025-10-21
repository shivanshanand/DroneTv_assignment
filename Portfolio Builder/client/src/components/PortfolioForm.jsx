import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Briefcase,
  Code,
  Settings,
  FolderOpen,
  MessageSquare,
  BookOpen,
  Mail,
  CheckCircle,
  X,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { createPortfolio } from "../services/api";

const PortfolioForm = ({ selectedTemplate }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    templateId: selectedTemplate,
    hero: {
      name: "",
      title: "",
      tagline: "",
      profileImage: "",
    },
    about: {
      bio: "",
      email: "",
      phone: "",
      location: "",
      socials: {
        linkedin: "",
        github: "",
        twitter: "",
      },
    },
    skills: [],
    services: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    portfolio: [
      { title: "", image: "", description: "" },
      { title: "", image: "", description: "" },
      { title: "", image: "", description: "" },
    ],
    testimonials: [{ name: "", quote: "", company: "" }],
    blog: {
      title: "",
      summary: "",
    },
    contact: {
      message: "",
      email: "",
      phone: "",
    },
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: "Hero Section", icon: User, key: "hero" },
    { title: "About Me", icon: Briefcase, key: "about" },
    { title: "Skills", icon: Code, key: "skills" },
    { title: "Services", icon: Settings, key: "services" },
    { title: "Portfolio", icon: FolderOpen, key: "portfolio" },
    { title: "Testimonials", icon: MessageSquare, key: "testimonials" },
    { title: "Blog", icon: BookOpen, key: "blog" },
    { title: "Contact", icon: Mail, key: "contact" },
  ];

  // Validation Functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return phone === "" || (phone.length >= 10 && regex.test(phone));
  };

  const validateURL = (url) => {
    if (!url) return true; // Optional URLs
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Hero Section
        if (!formData.hero.name.trim()) {
          newErrors.heroName = "Name is required";
        } else if (formData.hero.name.length < 2) {
          newErrors.heroName = "Name must be at least 2 characters";
        }

        if (!formData.hero.title.trim()) {
          newErrors.heroTitle = "Professional title is required";
        }

        if (!formData.hero.profileImage.trim()) {
          newErrors.heroImage = "Profile image URL is required";
        } else if (!validateURL(formData.hero.profileImage)) {
          newErrors.heroImage = "Please enter a valid URL";
        }
        break;

      case 1: // About
        if (!formData.about.bio.trim()) {
          newErrors.aboutBio = "Bio is required";
        } else if (formData.about.bio.length < 50) {
          newErrors.aboutBio = "Bio must be at least 50 characters";
        }

        if (!formData.about.email.trim()) {
          newErrors.aboutEmail = "Email is required";
        } else if (!validateEmail(formData.about.email)) {
          newErrors.aboutEmail = "Please enter a valid email";
        }

        if (formData.about.phone && !validatePhone(formData.about.phone)) {
          newErrors.aboutPhone = "Please enter a valid phone number";
        }

        if (
          formData.about.socials.linkedin &&
          !validateURL(formData.about.socials.linkedin)
        ) {
          newErrors.linkedin = "Please enter a valid LinkedIn URL";
        }
        if (
          formData.about.socials.github &&
          !validateURL(formData.about.socials.github)
        ) {
          newErrors.github = "Please enter a valid GitHub URL";
        }
        if (
          formData.about.socials.twitter &&
          !validateURL(formData.about.socials.twitter)
        ) {
          newErrors.twitter = "Please enter a valid Twitter URL";
        }
        break;

      case 2: // Skills
        if (formData.skills.length === 0) {
          newErrors.skills = "Please add at least one skill";
        }
        break;

      case 7: // Contact
        if (!formData.contact.message.trim()) {
          newErrors.contactMessage = "Contact message is required";
        }

        if (!formData.contact.email.trim()) {
          newErrors.contactEmail = "Contact email is required";
        } else if (!validateEmail(formData.contact.email)) {
          newErrors.contactEmail = "Please enter a valid email";
        }

        if (formData.contact.phone && !validatePhone(formData.contact.phone)) {
          newErrors.contactPhone = "Please enter a valid phone number";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section, field, value, index = null) => {
    // Clear error for this field
    const errorKey =
      index !== null ? `${section}${index}${field}` : `${section}${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }

    setFormData((prev) => {
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else if (
        typeof prev[section] === "object" &&
        !Array.isArray(prev[section])
      ) {
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value },
        };
      } else {
        return { ...prev, [section]: value };
      }
    });
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    // Clear error for this field
    const errorKey = `${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      if (formData.skills.includes(skillInput.trim())) {
        toast.warning("This skill already exists!");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
      toast.success("Skill added!");
      // Clear skills error if exists
      if (errors.skills) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    toast.info("Skill removed");
  };

  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        { name: "", quote: "", company: "" },
      ],
    }));
    toast.success("New testimonial field added!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate final step
    if (!validateStep(currentStep)) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const response = await createPortfolio(formData);
      console.log("Portfolio created:", response);
      toast.success("🎉 Portfolio created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Navigate after a short delay to show the toast
      setTimeout(() => {
        navigate("/browse");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Error creating portfolio. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fix the errors before proceeding");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStepContent = () => {
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    switch (currentStep) {
      case 0: // Hero Section
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={formData.hero.name}
                onChange={(e) =>
                  handleInputChange("hero", "name", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.heroName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.heroName && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.heroName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Professional Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Full Stack Developer"
                value={formData.hero.title}
                onChange={(e) =>
                  handleInputChange("hero", "title", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.heroTitle
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.heroTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                placeholder="e.g., Building digital experiences that matter"
                value={formData.hero.tagline}
                onChange={(e) =>
                  handleInputChange("hero", "tagline", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/profile.jpg"
                value={formData.hero.profileImage}
                onChange={(e) =>
                  handleInputChange("hero", "profileImage", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.heroImage
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.heroImage && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.heroImage}
                </p>
              )}
              {formData.hero.profileImage && !errors.heroImage && (
                <img
                  src={formData.hero.profileImage}
                  alt="Preview"
                  className="mt-4 w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  onError={() =>
                    setErrors((prev) => ({
                      ...prev,
                      heroImage: "Failed to load image",
                    }))
                  }
                />
              )}
            </div>
          </motion.div>
        );

      case 1: // About Me
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio <span className="text-red-500">*</span>
                <span className="text-gray-400 text-xs ml-2">
                  (Min 50 characters: {formData.about.bio.length}/50)
                </span>
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                value={formData.about.bio}
                onChange={(e) =>
                  handleInputChange("about", "bio", e.target.value)
                }
                rows="5"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.aboutBio
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors resize-none`}
              />
              {errors.aboutBio && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.aboutBio}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.about.email}
                onChange={(e) =>
                  handleInputChange("about", "email", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.aboutEmail
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.aboutEmail && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.aboutEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.about.phone}
                onChange={(e) =>
                  handleInputChange("about", "phone", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.aboutPhone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.aboutPhone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.aboutPhone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="San Francisco, CA"
                value={formData.about.location}
                onChange={(e) =>
                  handleInputChange("about", "location", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="border-t-2 border-gray-100 pt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Social Links
              </h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.about.socials.linkedin}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "about",
                        "socials",
                        "linkedin",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.linkedin
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none transition-colors`}
                  />
                  {errors.linkedin && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> {errors.linkedin}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.about.socials.github}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "about",
                        "socials",
                        "github",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.github
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none transition-colors`}
                  />
                  {errors.github && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> {errors.github}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={formData.about.socials.twitter}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "about",
                        "socials",
                        "twitter",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.twitter
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none transition-colors`}
                  />
                  {errors.twitter && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <X className="w-4 h-4" /> {errors.twitter}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2: // Skills
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g., React, Node.js, Python"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
              {errors.skills && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.skills}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Your Skills ({formData.skills.length})
              </p>
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {formData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full font-medium flex items-center gap-2 shadow-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="w-5 h-5 rounded-full bg-blue-200 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );

      case 3: // Services
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {formData.services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  Service {index + 1}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Web Development"
                      value={service.title}
                      onChange={(e) =>
                        handleInputChange(
                          "services",
                          "title",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe this service..."
                      value={service.description}
                      onChange={(e) =>
                        handleInputChange(
                          "services",
                          "description",
                          e.target.value,
                          index
                        )
                      }
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 4: // Portfolio
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {formData.portfolio.map((project, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  Project {index + 1}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., E-commerce Platform"
                      value={project.title}
                      onChange={(e) =>
                        handleInputChange(
                          "portfolio",
                          "title",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/project.jpg"
                      value={project.image}
                      onChange={(e) =>
                        handleInputChange(
                          "portfolio",
                          "image",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe this project..."
                      value={project.description}
                      onChange={(e) =>
                        handleInputChange(
                          "portfolio",
                          "description",
                          e.target.value,
                          index
                        )
                      }
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );

      case 5: // Testimonials
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {formData.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-2 border-green-200"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  Testimonial {index + 1}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Jane Smith"
                      value={testimonial.name}
                      onChange={(e) =>
                        handleInputChange(
                          "testimonials",
                          "name",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Tech Corp"
                      value={testimonial.company}
                      onChange={(e) =>
                        handleInputChange(
                          "testimonials",
                          "company",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quote
                    </label>
                    <textarea
                      placeholder="Their testimonial..."
                      value={testimonial.quote}
                      onChange={(e) =>
                        handleInputChange(
                          "testimonials",
                          "quote",
                          e.target.value,
                          index
                        )
                      }
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTestimonial}
              className="w-full px-6 py-3 border-2 border-dashed border-green-300 text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Testimonial
            </button>
          </motion.div>
        );

      case 6: // Blog
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                💡 This section is optional. You can skip it if you don't have a
                blog.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="e.g., My Latest Thoughts on Web Development"
                value={formData.blog.title}
                onChange={(e) =>
                  handleInputChange("blog", "title", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Summary
              </label>
              <textarea
                placeholder="Brief summary of your blog..."
                value={formData.blog.summary}
                onChange={(e) =>
                  handleInputChange("blog", "summary", e.target.value)
                }
                rows="4"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </motion.div>
        );

      case 7: // Contact
        return (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Message <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="e.g., Let's work together on your next project!"
                value={formData.contact.message}
                onChange={(e) =>
                  handleInputChange("contact", "message", e.target.value)
                }
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.contactMessage
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors resize-none`}
              />
              {errors.contactMessage && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.contactMessage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="contact@example.com"
                value={formData.contact.email}
                onChange={(e) =>
                  handleInputChange("contact", "email", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.contactEmail
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.contactEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.contact.phone}
                onChange={(e) =>
                  handleInputChange("contact", "phone", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.contactPhone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none transition-colors`}
              />
              {errors.contactPhone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> {errors.contactPhone}
                </p>
              )}
            </div>

            <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="text-lg font-bold text-gray-800">
                  Almost Done!
                </h4>
              </div>
              <p className="text-gray-600">
                You're on the last step. Review your information and click
                "Submit Portfolio" to create your amazing portfolio!
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-600" />
            Create Your Portfolio
          </h1>
          <p className="text-gray-600">
            Fill in the details to generate your professional portfolio
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex justify-between mt-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / steps.length}%` }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </motion.div>
                    <p
                      className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center mt-4 text-sm text-gray-600">
            Step{" "}
            <span className="font-bold text-blue-600">{currentStep + 1}</span>{" "}
            of <span className="font-bold">{steps.length}</span>:{" "}
            {steps[currentStep].title}
          </p>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.form
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              {renderStepContent()}
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4 justify-between"
        >
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Portfolio
                </>
              )}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioForm;
