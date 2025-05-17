import { useState } from "react";
import { addContactMessage } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const contactMessage = {
        name,
        email,
        message,
        read: false,
        createdAt: new Date(), // Added createdAt for sorting/tracking
      };

      await addContactMessage(contactMessage);

      toast({
        title: "Message Sent",
        description:
          "Thank you for contacting us! We'll respond as soon as possible.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting message:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-gray-50 dark:bg-slate-900" id="contact"> {/* Added dark mode background */}
      <div className="hotel-container">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"> {/* Added items-start for better alignment */}
          <div>
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions or need assistance? Reach out to our friendly team
              and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-hotel-100 dark:bg-hotel-700 p-3 rounded-full mr-4">
                  <MapPin className="h-4 w-4 dark:text-gray-300 text-hotel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg dark:text-gray-100">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    69 Rue Afroul Mohammed, Oran City, 31001, Algeria
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-hotel-100 dark:bg-hotel-700 p-3 rounded-full mr-4">
                  <Mail className="h-4 w-4 dark:text-gray-300 text-hotel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg dark:text-gray-100">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">berkaouibilal@mail.ru</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-hotel-100 dark:bg-hotel-700 p-3 rounded-full mr-4">
                  <Phone className="h-4 w-4 dark:text-gray-300 text-hotel-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg dark:text-gray-100">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+213795800312</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8"> {/* Added md:p-8 for more padding on larger screens */}
            <h3 className="text-2xl font-bold mb-6 dark:text-white">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5"> {/* Increased space-y */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Your email address"
                  required
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-600 dark:focus:ring-hotel-500 focus:border-transparent dark:focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-hotel-600 hover:bg-hotel-700 dark:bg-hotel-500 dark:hover:bg-hotel-600 text-white font-medium py-2.5 px-4 rounded-md transition duration-300 flex justify-center items-center" /* Adjusted py */
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
