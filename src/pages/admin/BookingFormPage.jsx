import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBooking, getRooms } from "@/firebase/firestore";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { toast } from "sonner";

const BookingFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rooms, setRooms] = useState([]);
  
  const [formData, setFormData] = useState({
    roomId: "",
    roomName: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    totalPrice: 0,
    status: "pending"
  });

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const roomsData = await getRooms();
        setRooms(roomsData.filter(room => room.available));
        if (roomsData.length > 0) {
          const availableRooms = roomsData.filter(room => room.available);
          if (availableRooms.length > 0) {
            const selectedRoom = availableRooms[0];
            setFormData({
              ...formData,
              roomId: selectedRoom.id,
              roomName: selectedRoom.name,
              totalPrice: selectedRoom.price
            });
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "roomId") {
      const selectedRoom = rooms.find(room => room.id === value);
      if (selectedRoom) {
        setFormData({
          ...formData,
          roomId: value,
          roomName: selectedRoom.name,
          totalPrice: calculateTotalPrice(selectedRoom.price, formData.checkIn, formData.checkOut)
        });
      }
    } else if (name === "checkIn" || name === "checkOut") {
      const selectedRoom = rooms.find(room => room.id === formData.roomId);
      const newCheckIn = name === "checkIn" ? value : formData.checkIn;
      const newCheckOut = name === "checkOut" ? value : formData.checkOut;
      
      setFormData({
        ...formData,
        [name]: value,
        totalPrice: selectedRoom ? calculateTotalPrice(selectedRoom.price, newCheckIn, newCheckOut) : 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const calculateTotalPrice = (pricePerNight, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return pricePerNight;
    
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return pricePerNight * (diffDays || 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.roomId || !formData.guestName || !formData.guestEmail || 
        !formData.guestPhone || !formData.checkIn || !formData.checkOut) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    
    setSubmitting(true);
    
    try {
      await addBooking({
        ...formData,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        createdAt: new Date()
      });
      
      toast.success("Booking created successfully");
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking");
    } finally {
      setSubmitting(false);
    }
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
              Create New Booking
            </h1>
            <button
              onClick={() => navigate("/dashboard/bookings")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Room Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Room *
                  </label>
                  <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - ${room.price}/night
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Guest Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Email *
                  </label>
                  <input
                    type="email"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Guest Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Phone *
                  </label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Total Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Price ($)
                  </label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Calculated based on room price and stay duration
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-hotel-600 hover:bg-hotel-700 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Booking...
                    </div>
                  ) : (
                    "Create Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormPage;
