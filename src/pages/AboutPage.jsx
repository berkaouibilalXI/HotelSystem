import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer
} from "@/components/motion/animations"

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-hotel-800 to-hotel-600 text-white py-16 md:py-24">
          <div className="hotel-container">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                variants={fadeInUp}
              >
                About B-Hotel
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl opacity-90"
                variants={fadeInUp}
              >
                Experience luxury and comfort in the heart of the city since
                1985.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="hotel-container">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInLeft}>
                <h2 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Founded in 1985 by the visionary hotelier James Wilson,
                    B-Hotel began as a modest establishment with just 15 rooms.
                    With a commitment to exceptional service and attention to
                    detail, it quickly gained a reputation as the city's premier
                    boutique hotel.
                  </p>
                  <p>
                    Over the decades, we have grown and evolved, but our core
                    values remain unchanged. We believe in creating memorable
                    experiences, not just providing accommodation. Every aspect
                    of our hotel, from the architecture to the amenities, has
                    been carefully designed with our guests' comfort in mind.
                  </p>
                  <p>
                    Today, B-Hotel stands as a landmark of luxury and
                    hospitality, welcoming guests from around the world. Whether
                    you're visiting for business or pleasure, our dedicated team
                    is committed to making your stay exceptional.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInRight} className="relative">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                  alt="B-Hotel Historic Building"
                  className="rounded-lg shadow-xl w-full object-cover"
                  style={{ height: "500px" }}
                />
                <div className="absolute -bottom-6 -left-6 bg-hotel-600 text-white p-4 rounded shadow-lg">
                  <p className="font-semibold">Established</p>
                  <p className="text-3xl font-bold">1985</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="hotel-container">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                At B-Hotel, our values guide every decision we make and every
                service we provide.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
              >
                <div className="w-14 h-14 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center text-hotel-600 dark:text-hotel-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hotel-800 dark:text-white">
                  Excellence
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We strive for excellence in everything we do, from the
                  cleanliness of our rooms to the quality of our service.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
              >
                <div className="w-14 h-14 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center text-hotel-600 dark:text-hotel-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hotel-800 dark:text-white">
                  Hospitality
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in warm, genuine hospitality that makes our guests
                  feel welcome and valued.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
              >
                <div className="w-14 h-14 bg-hotel-100 dark:bg-hotel-800 rounded-full flex items-center justify-center text-hotel-600 dark:text-hotel-400 mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hotel-800 dark:text-white">
                  Comfort
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We create spaces that offer comfort and relaxation, ensuring
                  our guests have a restful stay.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="hotel-container">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white mb-4">
                Our Leadership Team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Meet the dedicated professionals who ensure that every aspect of
                your stay exceeds expectations.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  name: "Sarah Johnson",
                  position: "General Manager",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                  bio:
                    "Sarah brings over 15 years of luxury hospitality experience to B-Hotel."
                },
                {
                  name: "Michael Chen",
                  position: "Executive Chef",
                  image:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                  bio:
                    "Michael's innovative culinary creations have earned our restaurant multiple awards."
                },
                {
                  name: "David Williams",
                  position: "Director of Operations",
                  image:
                    "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1974&auto=format&fit=crop",
                  bio:
                    "David ensures that every aspect of our hotel runs smoothly and efficiently."
                },
                {
                  name: "Aisha Patel",
                  position: "Head of Guest Relations",
                  image:
                    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop",
                  bio:
                    "Aisha is dedicated to providing exceptional service to every guest."
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="mb-4 relative group">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-hotel-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.position}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="hotel-container">
            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Find answers to commonly asked questions about our hotel and
                  services.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {[
                    {
                      question: "What time is check-in and check-out?",
                      answer:
                        "Check-in time is 3:00 PM, and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability."
                    },
                    {
                      question: "Is breakfast included in the room rate?",
                      answer:
                        "Yes, a complimentary continental breakfast is included for all guests. Our full breakfast buffet is available at an additional charge."
                    },
                    {
                      question: "Do you offer airport transportation?",
                      answer:
                        "Yes, we offer airport shuttle service for an additional fee. Please contact us at least 24 hours prior to your arrival to arrange transportation."
                    },
                    {
                      question: "Is there parking available at the hotel?",
                      answer:
                        "Yes, we offer both self-parking and valet parking options. Self-parking is $25 per night, and valet parking is $35 per night."
                    },
                    {
                      question: "Are pets allowed at the hotel?",
                      answer:
                        "We welcome pets in designated pet-friendly rooms. There is a non-refundable pet fee of $50 per stay. Please inform us in advance if you plan to bring a pet."
                    }
                  ].map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg p-2 bg-white dark:bg-gray-900"
                    >
                      <AccordionTrigger className="px-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
