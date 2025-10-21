import { motion } from "framer-motion";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

const PropertyCard = ({ property, onViewDetails }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all shadow-2xl">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold border border-white/20">
            {property.type}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-blue-400 transition-colors">
            {property.name}
          </h3>

          <div className="flex items-center text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-blue-400" />
            <span className="text-sm truncate">{property.location}</span>
          </div>

          <div className="flex items-center text-green-400 font-bold mb-4">
            <DollarSign className="w-5 h-5" />
            <span className="text-lg">₹{property.price.toLocaleString()}</span>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(property)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
