import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();  // Updated from currentUser to user and logout to signOut

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: {
      opacity: 0,
      maxHeight: 0, // Animate maxHeight for smoother performance
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      maxHeight: "500px", // Set a sufficiently large maxHeight
      transition: {
        duration: 0.4, // Slightly longer for a smoother feel
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  // Variants for the hamburger/close icon paths
  const pathVariants = {
    closed: { d: "M4 6h16M4 12h16M4 18h16", transition: { duration: 0.3, ease: "easeInOut" } },
    open: { d: "M6 18L18 6M6 6l12 12", transition: { duration: 0.3, ease: "easeInOut" } },
  };
  
  // Simpler hamburger animation by rotating lines
  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }, // y value depends on stroke-width and desired position
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }, // y value depends on stroke-width and desired position
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
            {user ? (
              <>
                {user.role && (user.role === "admin" || user.role === "staff") && (
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
              className="text-gray-700 hover:text-hotel-600 focus:outline-none dark:text-white p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu" // Added aria-controls
            >
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" // Ensure viewBox is appropriate for the icon
                xmlns="http://www.w3.org/2000/svg"
                animate={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16"
                  variants={topBarVariants}
                />
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12h16"
                  variants={middleBarVariants}
                />
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 18h16"
                  variants={bottomBarVariants}
                />
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu" // Added id for aria-controls
              className="md:hidden py-2 space-y-1 overflow-hidden" // Adjusted padding
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[
                { to: "/", label: "Home" },
                { to: "/rooms", label: "Rooms" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <motion.div key={item.to} variants={menuItemVariants}>
                  <Link
                    to={item.to}
                    className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <>
                  {user.role && (user.role === "admin" || user.role === "staff") && (
                    <motion.div variants={menuItemVariants}>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                  <motion.div variants={menuItemVariants}>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/login"
                    className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:text-hotel-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
              <motion.div variants={menuItemVariants} className="pt-2 pb-2"> {/* Added pb-2 */}
                <Link
                  to="/book-now"
                  className="block text-center bg-hotel-600 text-white px-6 py-2.5 rounded-md hover:bg-hotel-700 transition-colors dark:bg-hotel-700 dark:hover:bg-hotel-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
