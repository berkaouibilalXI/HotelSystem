import Hero from "@/components/Hero";
import RoomsList from "@/components/RoomsList";
import BookingForm from "../components/BookingForm";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationSection from "../components/LocationSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <RoomsList />
      <Amenities />
      <BookingForm />
      <Testimonials />
      <LocationSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
