import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/components/motion/animations";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  useEffect(() => {
    // If no booking data is available, redirect to home
    if (!booking) {
      navigate("/");
    }
  }, [booking, navigate]);

  if (!booking) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="hotel-container py-16">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Booking Confirmed!
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Thank you for your booking. We've sent a confirmation email to {booking.guestEmail}.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8 text-left">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Booking Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Room</p>
                    <p className="font-medium text-gray-800 dark:text-white">{booking.roomName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Guest Name</p>
                    <p className="font-medium text-gray-800 dark:text-white">{booking.guestName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {format(new Date(booking.checkIn), "MMMM d, yyyy")}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {format(new Date(booking.checkOut), "MMMM d, yyyy")}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Guests</p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {booking.adults} Adults, {booking.children} Children
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                    <p className="font-medium text-gray-800 dark:text-white">${booking.totalPrice}</p>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Special Requests</p>
                    <p className="font-medium text-gray-800 dark:text-white">{booking.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/">Return to Home</Link>
                </Button>
                
                <Button asChild>
                  <Link to="/rooms">Browse More Rooms</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;