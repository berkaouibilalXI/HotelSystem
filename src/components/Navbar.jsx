import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userRole, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:text-white dark:shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hotel-container">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold text-hotel-800 dark:text-white"
                whileHover={{ scale: 1.05 }}
              >
                B-Hotel
              </motion.span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Rooms
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
            {currentUser ? (
              <>
                {userRole && (userRole === "admin" || userRole === "staff") && (
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Login
              </Link>
            )}
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/book-now"
                className="bg-hotel-600 text-white px-6 py-2 rounded hover:bg-hotel-700 transition-colors dark:bg-hotel-700 dark:hover:bg-hotel-800"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-hotel-600 focus:outline-none dark:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {currentUser ? (
              <>
                {userRole && (userRole === "admin" || userRole === "staff") && (
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-gray-700 hover:text-hotel-600 transition-colors dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
            <Link
              to="/book-now"
              className="block bg-hotel-600 text-white px-6 py-2 rounded hover:bg-hotel-700 transition-colors dark:bg-hotel-700 dark:hover:bg-hotel-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
