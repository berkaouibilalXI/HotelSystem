import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { toast } from "sonner"
import { Check, ChevronDown, CreditCard, Loader2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  fadeIn,
  fadeInUp,
  staggerContainer
} from "@/components/motion/animations"

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  checkInDate: z.date({ required_error: "Please select a check-in date." }),
  checkOutDate: z.date({ required_error: "Please select a check-out date." }),
  roomType: z.string({ required_error: "Please select a room type." }),
  adults: z.string().min(1, { message: "Please select the number of adults." }),
  children: z.string(),
  specialRequests: z.string().optional()
})

const BookNowPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      roomType: "",
      adults: "1",
      children: "0",
      specialRequests: ""
    }
  })

  const onSubmit = async data => {
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Booking submitted:", data)
      toast.success(
        "Booking submitted successfully! Check your email for confirmation."
      )
      form.reset()
      setIsSubmitting(false)
      setStep(1)
    }, 2000)
  }

  const nextStep = async () => {
    const fieldsToValidate =
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : ["checkInDate", "checkOutDate", "roomType", "adults"]

    const isValid = await form.trigger(fieldsToValidate)
    if (isValid) setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-800 to-hotel-600 text-white py-16">
          <div className="hotel-container">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                variants={fadeInUp}
              >
                Book Your Stay
              </motion.h1>
              <motion.p className="text-lg opacity-90" variants={fadeInUp}>
                Reserve your perfect room and enjoy a luxurious experience at
                B-Hotel
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="hotel-container">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-hotel-800 dark:text-white">
                    Reservation Form
                  </h2>
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1
                          ? "bg-hotel-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }`}
                    >
                      {step > 1 ? <Check size={18} /> : "1"}
                    </div>
                    <div
                      className={`h-1 w-8 ${
                        step >= 2
                          ? "bg-hotel-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2
                          ? "bg-hotel-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }`}
                    >
                      {step > 2 ? <Check size={18} /> : "2"}
                    </div>
                    <div
                      className={`h-1 w-8 ${
                        step >= 3
                          ? "bg-hotel-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 3
                          ? "bg-hotel-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }`}
                    >
                      3
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    {step === 1 && (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-xl mb-4">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="john.doe@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 234 567 8900"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end pt-4">
                          <Button type="button" onClick={nextStep}>
                            Next Step
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-xl mb-4">
                          Reservation Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="checkInDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Check-in Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={`w-full pl-3 text-left font-normal ${!field.value &&
                                          "text-muted-foreground"}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={date => date < new Date()}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="checkOutDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Check-out Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={`w-full pl-3 text-left font-normal ${!field.value &&
                                          "text-muted-foreground"}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={date => {
                                        const checkIn = form.getValues(
                                          "checkInDate"
                                        )
                                        return (
                                          date < new Date() ||
                                          (checkIn && date <= checkIn)
                                        )
                                      }}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="roomType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Room Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a room type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="standard">
                                    Standard Room ($180/night)
                                  </SelectItem>
                                  <SelectItem value="deluxe">
                                    Deluxe Room ($250/night)
                                  </SelectItem>
                                  <SelectItem value="suite">
                                    Suite ($350/night)
                                  </SelectItem>
                                  <SelectItem value="family">
                                    Family Room ($400/night)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="adults"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Adults</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select number of adults" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[1, 2, 3, 4].map(num => (
                                      <SelectItem
                                        key={num}
                                        value={num.toString()}
                                      >
                                        {num}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="children"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Children</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select number of children" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {[0, 1, 2, 3].map(num => (
                                      <SelectItem
                                        key={num}
                                        value={num.toString()}
                                      >
                                        {num}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Requests (optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any special requests or accommodations..."
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Let us know if you have any specific requests
                                for your stay
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            Back
                          </Button>
                          <Button type="button" onClick={nextStep}>
                            Next Step
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold text-xl mb-4">
                          Review & Confirm
                        </h3>

                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Guest Name
                              </h4>
                              <p className="font-medium">
                                {form.watch("firstName")}{" "}
                                {form.watch("lastName")}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Contact
                              </h4>
                              <p className="font-medium">
                                {form.watch("email")}
                              </p>
                              <p className="font-medium">
                                {form.watch("phone")}
                              </p>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Check-in
                              </h4>
                              <p className="font-medium">
                                {form.watch("checkInDate")
                                  ? format(form.watch("checkInDate"), "PPPP")
                                  : "Not selected"}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Check-out
                              </h4>
                              <p className="font-medium">
                                {form.watch("checkOutDate")
                                  ? format(form.watch("checkOutDate"), "PPPP")
                                  : "Not selected"}
                              </p>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Room Type
                              </h4>
                              <p className="font-medium capitalize">
                                {form.watch("roomType") || "Not selected"}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                Guests
                              </h4>
                              <p className="font-medium">
                                {form.watch("adults")} Adult
                                {parseInt(form.watch("adults") || "1") !== 1
                                  ? "s"
                                  : ""}
                                ,{form.watch("children")} Child
                                {parseInt(form.watch("children") || "0") !== 1
                                  ? "ren"
                                  : ""}
                              </p>
                            </div>
                          </div>

                          {form.watch("specialRequests") && (
                            <>
                              <Separator className="my-4" />
                              <div>
                                <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                                  Special Requests
                                </h4>
                                <p className="font-medium">
                                  {form.watch("specialRequests")}
                                </p>
                              </div>
                            </>
                          )}

                          <Separator className="my-4" />

                          <div className="flex justify-between font-semibold text-lg">
                            <span>Estimated Total</span>
                            <span>$350 USD</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Final price will be confirmed upon booking
                            confirmation
                          </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                          <div className="flex items-center mb-4">
                            <CreditCard className="mr-2 h-5 w-5 text-hotel-600" />
                            <h4 className="font-semibold">Payment</h4>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No payment is required at this time. You will pay
                            during your stay at the hotel.
                          </p>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            Back
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Confirm Booking"
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BookNowPage
