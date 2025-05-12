import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  fadeIn,
  fadeInUp,
  staggerContainer
} from "@/components/motion/animations"

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
})

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

  const onSubmit = async data => {
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Form submitted:", data)
      toast.success("Message sent successfully! We'll get back to you soon.")
      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-800 to-hotel-600 text-white py-16">
          <div className="hotel-container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                variants={fadeInUp}
              >
                Contact Us
              </motion.h1>
              <motion.p className="text-lg opacity-90" variants={fadeInUp}>
                Get in touch with our team for reservations, information, or any
                inquiries about our services.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info and Form Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="hotel-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-2xl md:text-3xl font-bold text-hotel-800 dark:text-white mb-6">
                    How to Reach Us
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-hotel-100 dark:bg-hotel-800 p-3 rounded-full text-hotel-600 dark:text-hotel-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1 text-hotel-800 dark:text-white">
                          Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          123 Luxury Lane
                          <br />
                          Downtown District
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-hotel-100 dark:bg-hotel-800 p-3 rounded-full text-hotel-600 dark:text-hotel-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1 text-hotel-800 dark:text-white">
                          Phone
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Reservations: +1 (555) 123-4567
                          <br />
                          Reception: +1 (555) 765-4321
                          <br />
                          Customer Support: +1 (555) 987-6543
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-hotel-100 dark:bg-hotel-800 p-3 rounded-full text-hotel-600 dark:text-hotel-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-1 text-hotel-800 dark:text-white">
                          Email
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Reservations: reservations@bhotel.com
                          <br />
                          Customer Support: support@bhotel.com
                          <br />
                          General Inquiries: info@bhotel.com
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-8">
                  <h3 className="font-semibold text-xl mb-4 text-hotel-800 dark:text-white">
                    Hours of Operation
                  </h3>
                  <table className="w-full text-gray-600 dark:text-gray-400">
                    <tbody>
                      <tr>
                        <td className="py-2 font-medium">Front Desk</td>
                        <td className="py-2">24 hours, 7 days a week</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Restaurant</td>
                        <td className="py-2">6:30 AM - 10:30 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Room Service</td>
                        <td className="py-2">7:00 AM - 11:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Fitness Center</td>
                        <td className="py-2">5:00 AM - 12:00 AM</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Spa</td>
                        <td className="py-2">9:00 AM - 9:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-hotel-800 dark:text-white mb-6">
                  Send us a Message
                </h2>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What is this regarding?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="hotel-container">
            <motion.div
              className="text-center mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-hotel-800 dark:text-white">
                Find Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                We're conveniently located in the heart of downtown
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              {/* Map would normally go here - using placeholder for now */}
              <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Interactive Map Would Be Displayed Here
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
