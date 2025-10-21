import { motion } from 'framer-motion';
import { PROPERTY_TYPES } from '../utils/constants';

const FilterBar = ({ selectedType, onTypeChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-2"
    >
      {PROPERTY_TYPES.map((type, index) => (
        <motion.button
          key={type}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange(type)}
          className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
            selectedType === type
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {selectedType === type && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{type}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FilterBar;
