import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp } from "@/components/motion/animations"

const RoomFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "all",
    price: [100, 500],
    capacity: 0,
    amenities: []
  })

  const roomTypes = ["all", "standard", "deluxe", "suite", "family"]
  const amenitiesList = ["wifi", "breakfast", "parking", "pool", "gym", "spa"]

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleTypeChange = type => {
    setFilters({ ...filters, type })
  }

  const handlePriceChange = value => {
    setFilters({ ...filters, price: value })
  }

  const handleCapacityChange = capacity => {
    setFilters({ ...filters, capacity })
  }

  const handleAmenityToggle = amenity => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]

    setFilters({ ...filters, amenities: newAmenities })
  }

  const handleReset = () => {
    setFilters({
      type: "all",
      price: [100, 500],
      capacity: 0,
      amenities: []
    })
  }

  return (
    <motion.div variants={fadeInUp}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filter Rooms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Room Type */}
          <div className="space-y-2">
            <Label className="font-medium">Room Type</Label>
            <div className="flex flex-wrap gap-2">
              {roomTypes.map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={filters.type === type ? "default" : "outline"}
                  onClick={() => handleTypeChange(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-medium">Price Range</Label>
              <span className="text-sm text-muted-foreground">
                ${filters.price[0]} - ${filters.price[1]}
              </span>
            </div>
            <Slider
              defaultValue={[100, 500]}
              min={50}
              max={1000}
              step={10}
              value={filters.price}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label className="font-medium">Guests</Label>
            <div className="flex items-center space-x-2">
              {[0, 1, 2, 3, 4, "5+"].map((num, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={
                    filters.capacity === (typeof num === "string" ? 5 : num)
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    handleCapacityChange(typeof num === "string" ? 5 : num)
                  }
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label className="font-medium">Amenities</Label>
            <div className="grid grid-cols-2 gap-3">
              {amenitiesList.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Switch
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityToggle(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="capitalize">
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RoomFilters
