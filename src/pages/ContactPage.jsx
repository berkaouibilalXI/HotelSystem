import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapLocation from "@/components/MapLocation";

const ContactPage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Contact Info Section */}
        <section className="py-16 md:py-24">
          <div className="hotel-container">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-hotel-800 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-hotel-800 dark:text-white mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-hotel-500 focus:border-hotel-500 dark:bg-gray-700 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-hotel-500 focus:border-hotel-500 dark:bg-gray-700 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-hotel-500 focus:border-hotel-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Booking Inquiry"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-hotel-500 focus:border-hotel-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-hotel-600 hover:bg-hotel-700 text-white font-medium py-2 px-4 rounded-md transition-colors dark:bg-hotel-700 dark:hover:bg-hotel-800"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-hotel-800 dark:text-white mb-6">
                  Contact Information
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
                        69 Rue Afroul Mohammed
                        <br />
                        Oran City, 31001
                        <br />
                        Algeria
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
                        Reservations: +213 795 800 312
                        <br />
                        Front Desk: +213 795 800 313
                        <br />
                        Customer Service: +213 795 800 314
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
                        General Inquiries: berkaouibilal@mail.ru
                      </p>
                    </div>
                  </div>
                </div>
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
              <MapLocation 
                latitude={35.6976} 
                longitude={-0.6367} 
                zoom={15}
                title="B-Hotel"
                address="69 Rue Afroul Mohammed, Oran City, 31001, Algeria"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
