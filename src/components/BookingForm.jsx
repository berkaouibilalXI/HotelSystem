import { useState, useEffect } from "react";
import { addBooking, getRooms } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const BookingForm = () => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms.filter((room) => room.available));
        if (fetchedRooms.length > 0) {
          // Ensure there's at least one available room before setting
          const availableRooms = fetchedRooms.filter(room => room.available);
          if (availableRooms.length > 0) {
            setSelectedRoomId(availableRooms[0].id || "");
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast({
          title: "Error",
          description: "Failed to load rooms. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchRooms();
  }, [toast]);

  // Calculate total price based on dates and room
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !selectedRoomId) return 0;

    const selectedRoom = rooms.find((room) => room.id === selectedRoomId);
    if (!selectedRoom) return 0;

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    return selectedRoom.price * (nights > 0 ? nights : 1); // Ensure at least 1 night is charged if dates are same
  };

  const totalPrice = calculateTotalPrice();
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !checkIn ||
      !checkOut ||
      !selectedRoomId ||
      !guestName ||
      !guestEmail ||
      !guestPhone
    ) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    if (checkOut <= checkIn) { // checkOut must be strictly after checkIn
      toast({
        title: "Error",
        description: "Check-out date must be after check-in date",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const booking = {
        roomId: selectedRoomId,
        roomName: selectedRoom?.name || "",
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        totalPrice,
        status: "pending",
      };

      await addBooking(booking);

      toast({
        title: "Success",
        description: "Your booking has been received successfully!",
      });

      // Reset form
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setCheckIn(undefined);
      setCheckOut(undefined);
      // Optionally reset selectedRoomId if desired, or keep it
      // if (rooms.length > 0 && rooms.filter(r => r.available).length > 0) {
      //   setSelectedRoomId(rooms.filter(r => r.available)[0].id || "");
      // } else {
      //   setSelectedRoomId("");
      // }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Error",
        description: "Failed to submit your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-gray-50 dark:bg-slate-900" id="booking">
      <div className="hotel-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 dark:text-white">Book Your Stay</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Reserve your perfect room with our simple booking form and start
            planning your dream getaway today.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-600",
                        !checkIn && "text-muted-foreground dark:text-gray-400",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? (
                        format(checkIn, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto dark:bg-slate-800"> {/* Shadcn Calendar should handle its own dark mode */}
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                      className="p-3 pointer-events-auto" // Calendar itself should be dark mode aware via Shadcn
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-out Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-600",
                        !checkOut && "text-muted-foreground dark:text-gray-400",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? (
                        format(checkOut, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto dark:bg-slate-800"> {/* Shadcn Calendar should handle its own dark mode */}
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                      disabled={(date) =>
                        checkIn ? date <= checkIn : date < new Date(new Date().setHours(0,0,0,0)) // Disable dates before or on checkIn
                      }
                      className="p-3 pointer-events-auto" // Calendar itself should be dark mode aware via Shadcn
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Room Type
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent"
                  required
                >
                  <option value="" disabled className="text-gray-500 dark:text-gray-400">
                    Select a room
                  </option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id} className="dark:bg-slate-700 dark:text-gray-200">
                      {room.name} - ${room.price}/night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            {checkIn && checkOut && selectedRoomId && (
              <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Booking Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Room:</span>{" "}
                    <span className="font-medium dark:text-gray-100">{selectedRoom?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Price per night:</span>{" "}
                    <span className="font-medium dark:text-gray-100">${selectedRoom?.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Check-in:</span>{" "}
                    <span className="font-medium dark:text-gray-100">
                      {checkIn ? format(checkIn, "PPP") : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Check-out:</span>{" "}
                    <span className="font-medium dark:text-gray-100">
                      {checkOut ? format(checkOut, "PPP") : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Nights:</span>{" "}
                    <span className="font-medium dark:text-gray-100">
                      {Math.ceil(
                        (checkOut.getTime() - checkIn.getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total:</span>{" "}
                    <span className="font-bold text-hotel-700 dark:text-hotel-400">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-hotel-600 hover:bg-hotel-700 dark:bg-hotel-500 dark:hover:bg-hotel-600 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <>
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
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
