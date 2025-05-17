import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking, updateBookingStatus } from "@/firebase/firestore";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { toast } from "sonner";

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBooking(id);
        if (!bookingData) {
          toast.error("Booking not found");
          navigate("/dashboard/bookings");
          return;
        }
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const handleStatusChange = async (newStatus) => {
    if (toast.message(`Are you sure you want to mark this booking as ${newStatus}?`)) {
      setUpdating(true);
      try {
        await updateBookingStatus(id, newStatus);
        setBooking({ ...booking, status: newStatus });
        toast.success(`Booking marked as ${newStatus}`);
      } catch (error) {
        console.error("Error updating booking status:", error);
        toast.error("Failed to update booking status");
      } finally {
        setUpdating(false);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    
    const date = timestamp.seconds 
      ? new Date(timestamp.seconds * 1000) 
      : new Date(timestamp);
      
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <DashboardSidebar />
        <div className="flex-1 ml-64">
          <div className="p-8 flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Booking Details
            </h1>
            <button
              onClick={() => navigate("/dashboard/bookings")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Back to Bookings
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {/* Booking Status Banner */}
            <div className={`px-6 py-4 ${
              booking.status === "confirmed" ? "bg-green-500" :
              booking.status === "pending" ? "bg-yellow-500" :
              booking.status === "cancelled" ? "bg-red-500" :
              booking.status === "completed" ? "bg-blue-500" : "bg-gray-500"
            } text-white`}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Booking #{id.slice(0, 8)}</h2>
                  <p className="text-sm opacity-90">Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p>
                </div>
                {!updating ? (
                  <div className="flex space-x-2">
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => handleStatusChange("confirmed")}
                        className="bg-white text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => handleStatusChange("cancelled")}
                        className="bg-white text-red-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    {booking.status !== "completed" && (
                      <button
                        onClick={() => handleStatusChange("completed")}
                        className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center text-white">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </div>
                )}
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Guest Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="text-gray-800 dark:text-white">{booking.guestName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-800 dark:text-white">{booking.guestEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-800 dark:text-white">{booking.guestPhone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Booking Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Room</p>
                      <p className="text-gray-800 dark:text-white">{booking.roomName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-in Date</p>
                      <p className="text-gray-800 dark:text-white">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Check-out Date</p>
                      <p className="text-gray-800 dark:text-white">{formatDate(booking.checkOut)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
                      <p className="text-gray-800 dark:text-white">${booking.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {booking.createdAt && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Booking created on {formatDate(booking.createdAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
