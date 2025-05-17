import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "@/firebase/firestore";
import { Wifi, Bath, Utensils, Bell, Bed } from "lucide-react";
import { motion } from "framer-motion";

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again later.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms =
    filter === "all" ? rooms : rooms.filter((room) => room.type === filter);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi size={16} />;
      case "pool":
        return <Bath size={16} />;
      case "restaurant":
        return <Utensils size={16} />;
      case "spa":
        return <Bell size={16} />;
      default:
        return <Bed size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="section-padding hotel-container dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Our Rooms
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600 dark:border-hotel-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding hotel-container dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Our Rooms
        </h2>
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="section-padding hotel-container dark:bg-gray-900"
      id="rooms"
    >
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-3 dark:text-white">
          Elegant Accommodations
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose from our selection of luxurious rooms, each designed for
          maximum comfort and relaxation.
        </p>
      </div>

      <div
        className="flex justify-center mb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              filter === "all"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border border-gray-200 dark:border-gray-700`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilter("standard")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "standard"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border-t border-b border-gray-200 dark:border-gray-700`}
          >
            Standard
          </button>
          <button
            onClick={() => setFilter("deluxe")}
            className={`px-4 py-2 text-sm font-medium ${
              filter === "deluxe"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border-t border-b border-gray-200 dark:border-gray-700`}
          >
            Deluxe
          </button>
          <button
            onClick={() => setFilter("suite")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              filter === "suite"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border border-gray-200 dark:border-gray-700`}
          >
            Suite
          </button>
          <button
            onClick={() => setFilter("family")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              filter === "family"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border border-gray-200 dark:border-gray-700`}
          >
            Family
          </button>
          <button 
            onClick={() => setFilter("executive")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              filter === "executive"
                ? "bg-hotel-600 text-white dark:bg-hotel-700"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } border border-gray-200 dark:border-gray-700`}
          >
            Executive
          </button>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No rooms available in this category at the moment.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {filteredRooms.map((room) => (
            <motion.div
              key={room.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              data-aos="fade-up"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={
                    room.images[0] ||
                    "https://via.placeholder.com/600x400?text=Room+Image"
                  }
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 dark:text-white">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                </p>
                <p className="text-2xl font-bold text-hotel-700 dark:text-hotel-400 mb-4">
                  ${room.price}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    /night
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/rooms/${room.id}`}
                    className="block w-full bg-hotel-600 hover:bg-hotel-700 dark:bg-hotel-700 dark:hover:bg-hotel-800 text-white text-center font-medium py-2 rounded transition duration-300"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RoomsList;
