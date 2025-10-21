const Property = require("../models/Property");
const axios = require("axios");

// Helper: geocode location (OpenStreetMap or Google as before)
const getCoordinates = async (location) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    const response = await axios.get(url, { headers: { "User-Agent": "RealEstateApp/1.0" } });
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
  } catch (err) {
    console.error("Geocoding failed:", err.message);
  }
  return { lat: null, lng: null };
};

// GET all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch properties." });
  }
};

// GET one property
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch property." });
  }
};

// POST new property
exports.addProperty = async (req, res) => {
  try {
    const { name, type, price, location, description } = req.body;
    if (!name || !type || !price || !location)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    // Geocode coordinates dynamically
    const { lat, lng } = await getCoordinates(location);

    const newProperty = new Property({
      name,
      type,
      price,
      location,
      description,
      image: `https://picsum.photos/400/300?random=${Date.now()}`, 
      lat,
      lng,
    });

    await newProperty.save();
    res.status(201).json({ success: true, data: newProperty });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add property." });
  }
};
