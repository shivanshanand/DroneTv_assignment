// Free Nominatim OpenStreetMap Geocoding API
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export const geocodeLocation = async (locationName) => {
  try {
    const response = await fetch(
      `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(
        locationName
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "PropertyListingApp/1.0", // Required by Nominatim
        },
      }
    );

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }

    // Fallback to India center if location not found
    return {
      lat: 20.5937,
      lng: 78.9629,
      displayName: locationName,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    // Fallback to India center
    return {
      lat: 20.5937,
      lng: 78.9629,
      displayName: locationName,
    };
  }
};
