import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Loader, Sparkles, Image as ImageIcon } from "lucide-react";
import { PROPERTY_TYPES, SAMPLE_IMAGES } from "../utils/constants";
import { geocodeLocation } from "../services/geocoding";
import toast from "react-hot-toast";

const AddPropertyForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Apartment",
    price: "",
    location: "",
    description: "",
    image: SAMPLE_IMAGES[0],
  });
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setIsGeocoding(true);

    try {
      const geoData = await geocodeLocation(formData.location);

      const propertyData = {
        ...formData,
        price: Number(formData.price),
        coordinates: {
          lat: geoData.lat,
          lng: geoData.lng,
        },
      };

      await onSubmit(propertyData);

      setFormData({
        name: "",
        type: "Apartment",
        price: "",
        location: "",
        description: "",
        image: SAMPLE_IMAGES[0],
      });

      toast.success(`Property added at ${geoData.displayName}`);
    } catch (error) {
      toast.error("Failed to add property");
      console.error(error);
    } finally {
      setIsGeocoding(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
          />

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl -z-10" />

              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    List New Property
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* Property Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Luxury Apartment in Downtown"
                  />
                </motion.div>

                {/* Property Type */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {PROPERTY_TYPES.filter((type) => type !== "All").map(
                      (type) => (
                        <option key={type} value={type} className="bg-slate-900">
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </motion.div>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="5000000"
                  />
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Mumbai, Maharashtra"
                  />
                  <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                    📍 We'll automatically geocode this location
                  </p>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                    placeholder="Describe your property in detail..."
                  />
                </motion.div>

                {/* Image Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Property Image
                  </label>
                  <select
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mb-3"
                  >
                    {SAMPLE_IMAGES.map((img, index) => (
                      <option key={index} value={img} className="bg-slate-900">
                        Sample Image {index + 1}
                      </option>
                    ))}
                  </select>
                  <div className="relative rounded-xl overflow-hidden border border-white/20">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-4 pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isGeocoding}
                    whileHover={{ scale: isGeocoding ? 1 : 1.02, boxShadow: isGeocoding ? "none" : "0 0 30px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: isGeocoding ? 1 : 0.98 }}
                    className={`flex-1 relative overflow-hidden ${
                      isGeocoding
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    } text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl opacity-50" />
                    <span className="relative flex items-center gap-2">
                      {isGeocoding ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Finding Location...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          Add Property
                        </>
                      )}
                    </span>
                  </motion.button>

                  <motion.button
                    type="button"
                    disabled={isGeocoding}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3.5 rounded-xl font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddPropertyForm;
