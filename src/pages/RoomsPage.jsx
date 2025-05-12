import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import RoomsList from "@/components/RoomsList"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { staggerContainer } from "@/components/motion/animations"
import RoomFilters from "@/components/RoomFilters"

const RoomsPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    price: [100, 500],
    capacity: 0,
    amenities: []
  })

  const handleFilterChange = filters => {
    setActiveFilters(filters)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <motion.div
          className="hotel-container py-8 md:py-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/rooms">Rooms</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-hotel-800 mt-6 mb-8 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Rooms
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <RoomFilters onFilterChange={handleFilterChange} />
            </aside>

            <div className="lg:col-span-3">
              <RoomsList filters={activeFilters} />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default RoomsPage
