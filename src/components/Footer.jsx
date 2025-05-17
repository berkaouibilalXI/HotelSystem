import { Link } from "react-router-dom";
import {Facebook, Instagram, Twitter, Github, MapPin, Mail, Phone} from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialMedia=[
    {
      name:"Facebook",
      icon:Facebook,
      href:"https://facebook.com/thatsbilal",
    },
    {
      name:"Instagram",
      icon:Instagram,
      href:"https://instagram.com/bilaaaaaaaaaaaaaaal",
    },
    {
      name:"Twitter",
      icon:Twitter,
      href:"https://twitter.com/thatsbilal",
    },
    {
      name:"Github",
      icon:Github,
      href:"https://github.com/berkaouibilalXI",
    },
  ]
  const contactInfo = [
    {
      name: "Address",
      icon: MapPin,
      value: "69 Rue Afroul Mohammed, Oran City, 31001, Algeria",
    },
    {
      name: "Phone",
      icon: Phone,
      value: "+213795800312",
    },
    {
      name: "Email",
      icon: Mail,
      value: "berkaouibilal@mail.ru",
      },
  ]
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="hotel-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">B-Hotel</h3>
            <p className="text-gray-400 mb-4">
              Experience luxury and comfort in the heart of the city. Your dream
              vacation awaits at B-Hotel.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) =>
              social.href ? (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon />
                </a>
              ) : null
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/book-now"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Airport Transfer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Restaurant & Bar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Spa & Wellness
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Conference Rooms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tour Booking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <div className="text-gray-400 mr-2 mt-0.5">
                    <info.icon />
                  </div>
                  <span className="text-gray-400">{info.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} B-Hotel. All rights reserved. Contact on mail or Github!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
