import { Wifi, Bath, Utensils, Bell } from "lucide-react";
import { motion } from "framer-motion";

const amenities = [
  {
    icon: <Wifi size={32} />,
    title: "High-Speed WiFi",
    description:
      "Stay connected with complimentary high-speed WiFi available throughout the hotel.",
  },
  {
    icon: <Bath size={32} />,
    title: "Luxury Pool",
    description:
      "Relax and unwind in our pristine swimming pool with panoramic views.",
  },
  {
    icon: <Bell size={32} />,
    title: "Premium Spa",
    description:
      "Rejuvenate your body and mind with our range of spa treatments and services.",
  },
  {
    icon: <Utensils size={32} />,
    title: "Gourmet Restaurant",
    description:
      "Experience exquisite dining with our award-winning chefs and premium cuisine.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Amenities = () => {
  return (
    <div
      className="section-padding bg-white dark:bg-gray-900 dark:text-white"
      id="amenities"
    >
      <div className="hotel-container">
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="text-3xl font-bold mb-3 dark:text-white">
            Hotel Amenities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Enjoy our premium facilities designed for your comfort and
            convenience during your stay.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow flex flex-col items-center text-center group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-hotel-600 dark:text-hotel-400 mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 5 }}
              >
                {amenity.icon}
              </motion.div>
              <h3 className="font-bold text-xl mb-2 dark:text-white">
                {amenity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Amenities;
