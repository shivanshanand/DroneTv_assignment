import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom property marker icon (house/building icon)
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/619/619032.png", // House/building icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [40, 40],
  shadowAnchor: [12, 40],
});

function MapView({ lat, lng, name }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl shadow-2xl border border-gray-50 bg-white/70 backdrop-blur-xl"
      style={{
        minHeight: "320px",
        position: "relative",
        boxShadow: "0 6px 32px 0 rgba(59, 130, 246, 0.15)",
      }}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ minHeight: "320px", width: "100%" }}
        dragging={true}
        zoomControl={true}
        attributionControl={true}
        className="rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={markerIcon}>
          <Popup>
            <div className="p-2">
              <p className="text-blue-700 font-semibold text-base">🏠 {name}</p>
              <p className="text-xs text-gray-600 mt-1">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating location badge */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute left-4 bottom-4 bg-white/95 text-blue-700 font-bold px-4 py-2 rounded-xl shadow-lg text-sm pointer-events-none backdrop-blur-sm"
      >
        📍 {name}
      </motion.div>
    </motion.div>
  );
}

export default MapView;
