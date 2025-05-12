import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Wifi, Coffee, CarFront, Pool, Dumbbell, Spa } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { fadeIn, fadeInUp } from "@/components/motion/animations"

const roomsData = [
  {
    id: "1",
    name: "Deluxe King Room",
    type: "deluxe",
    price: 250,
    description:
      "Spacious deluxe room with king-sized bed and city view. Perfect for couples or business travelers looking for comfort and luxury. Enjoy modern amenities in a stylish setting.",
    longDescription:
      "The Deluxe King Room offers an exceptional experience with high-end furnishings and premium bedding. Floor-to-ceiling windows provide stunning city views, while the spacious bathroom features a soaking tub and rainfall shower. Work comfortably at the ergonomic desk or relax in the plush seating area with a book from our curated library. Advanced climate control ensures your perfect temperature year-round.",
    capacity: 2,
    size: "35m²",
    bedType: "King",
    amenities: ["wifi", "breakfast", "parking", "minibar", "roomService"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2067&auto=format&fit=crop"
    ],
    featured: true
  },
  {
    id: "2",
    name: "Superior Twin Room",
    type: "standard",
    price: 180,
    description:
      "Comfortable twin room with two single beds. Ideal for friends or colleagues traveling together.",
    longDescription:
      "The Superior Twin Room is designed for comfort and convenience with two plush single beds and modern amenities. The room features a well-appointed bathroom with premium toiletries, a work desk with high-speed internet access, and a Smart TV with international channels. The soundproofed windows ensure a peaceful night's sleep regardless of city activity.",
    capacity: 2,
    size: "28m²",
    bedType: "Twin",
    amenities: ["wifi", "parking"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "3",
    name: "Family Suite",
    type: "suite",
    price: 350,
    description:
      "Spacious family suite with separate living area and two bedrooms. Perfect for families.",
    longDescription:
      "The Family Suite provides the ideal accommodation for families with a master bedroom featuring a king-size bed and a second bedroom with two single beds. The large living area offers comfortable seating and a dining table. The suite includes two bathrooms, one with a bathtub ideal for children. A kitchenette with microwave and refrigerator lets you prepare simple meals and snacks for the little ones.",
    capacity: 4,
    size: "55m²",
    bedType: "1 King + 2 Singles",
    amenities: ["wifi", "breakfast", "parking", "pool", "kitchenette"],
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1957&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c5b7a0df6a73?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: true
  }
]

const amenityIcons = {
  wifi: Wifi,
  breakfast: Coffee,
  parking: CarFront,
  pool: Pool,
  gym: Dumbbell,
  spa: Spa
}

const RoomDetail = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [selectedDates, setSelectedDates] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const foundRoom = roomsData.find(r => r.id === id)
      setRoom(foundRoom || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-10 w-72 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow hotel-container py-8 md:py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Room Not Found</h1>
          <p className="mb-6">
            Sorry, the room you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/rooms">Back to Rooms</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="hotel-container py-8 md:py-12">
          <motion.div
            className="flex flex-col space-y-8"
            initial="hidden"
            animate="visible"
          >
            {/* Room Header */}
            <motion.div variants={fadeIn} className="space-y-4">
              <Link
                to="/rooms"
                className="text-sm text-hotel-600 hover:underline flex items-center gap-2"
              >
                &larr; Back to Rooms
              </Link>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white">
                    {room.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge>{room.type}</Badge>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {room.capacity} Guests
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {room.size}
                    </span>
                  </div>
                </div>

                <div className="text-2xl md:text-3xl font-bold text-hotel-600">
                  ${room.price}
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                    /night
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Room Images */}
            <motion.div variants={fadeInUp}>
              <Carousel className="w-full">
                <CarouselContent>
                  {room.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img
                          src={image}
                          alt={`${room.name} - View ${index + 1}`}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </motion.div>

            {/* Room Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="lg:col-span-2">
                <Tabs defaultValue="description">
                  <TabsList className="mb-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="policies">Policies</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {room.longDescription}
                    </p>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Room Details
                      </h3>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Room Type:</span>{" "}
                          {room.type.charAt(0).toUpperCase() +
                            room.type.slice(1)}
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Capacity:</span>{" "}
                          {room.capacity} Persons
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Size:</span> {room.size}
                        </li>
                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Bed Type:</span>{" "}
                          {room.bedType}
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {room.amenities.map(amenity => {
                        const Icon = amenityIcons[amenity] || null
                        return (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                          >
                            {Icon && (
                              <Icon className="h-5 w-5 text-hotel-600" />
                            )}
                            <span className="capitalize">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="policies">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Check-in/Check-out
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Check-in: 3:00 PM - 12:00 AM
                          <br />
                          Check-out: By 11:00 AM
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Cancellation Policy
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          Free cancellation up to 48 hours before check-in.
                          Cancellations less than 48 hours before check-in are
                          subject to a one-night charge.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Additional Policies
                        </h3>
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                          <li>No smoking</li>
                          <li>No parties or events</li>
                          <li>Pets not allowed</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Book This Room</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Select Dates
                    </label>
                    <div className="border rounded-md p-3 bg-white dark:bg-gray-700">
                      <Calendar
                        mode="range"
                        selected={selectedDates}
                        onSelect={setSelectedDates}
                        className="rounded-md border-0"
                        disabled={date => date < new Date()}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t border-b">
                    <span>Total:</span>
                    <span className="text-xl font-bold">
                      $
                      {selectedDates?.length
                        ? room.price * (selectedDates.length - 1)
                        : room.price}
                    </span>
                  </div>

                  <Button className="w-full mt-4" size="lg">
                    Book Now
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                    You won't be charged yet
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RoomDetail
