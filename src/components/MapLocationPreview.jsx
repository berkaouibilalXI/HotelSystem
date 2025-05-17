import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MapLocationPreview = ({ 
  latitude = 35.6976, 
  longitude = -0.6367, 
  zoom = 14,
  height = "300px",
  showViewLargerLink = true
}) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
      }).setView([latitude, longitude], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      const hotelIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div class="marker-pin bg-hotel-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
              </div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      });

      L.marker([latitude, longitude], { icon: hotelIcon }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg overflow-hidden shadow-md"
    >
      <style jsx>{`
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .marker-pin svg {
          transform: rotate(45deg);
        }
      `}</style>
      <div 
        ref={mapContainerRef} 
        className="w-full z-0"
        style={{ height }}
      ></div>
      
      {showViewLargerLink && (
        <Link 
          to="/contact" 
          className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-md shadow-md text-sm font-medium text-hotel-600 dark:text-hotel-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          View larger map
        </Link>
      )}
    </motion.div>
  );
};

export default MapLocationPreview;
