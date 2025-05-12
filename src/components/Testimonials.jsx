import { useState, useEffect } from "react";
import { getApprovedReviews } from "@/firebase/firestore";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getApprovedReviews();
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load testimonials. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  if (loading) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="hotel-container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Guests Say
          </h2>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="hotel-container">
          <h2 className="text-3xl font-bold mb-8 text-center">
            What Our Guests Say
          </h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  // Sample reviews in case there are no reviews in the database yet
  const sampleReviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The most elegant hotel I've ever stayed in. The staff went above and beyond to make our anniversary special!",
      approved: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      rating: 5,
      comment:
        "Pristine rooms, excellent service, and the restaurant was phenomenal. Will definitely return on my next business trip.",
      approved: true,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      rating: 4,
      comment:
        "Beautiful views from our suite and the spa services were top-notch. Highly recommend the couple's massage!",
      approved: true,
    },
  ];

  const displayedReviews = reviews.length > 0 ? reviews : sampleReviews;

  return (
    <div className="section-padding bg-gray-50" id="testimonials">
      <div className="hotel-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Guests Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read the experiences of our valued guests and discover why B-Hotel
            is the perfect choice for your stay.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {displayedReviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-hotel-100 rounded-full flex items-center justify-center text-hotel-700 font-bold text-xl">
                          {review.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{review.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-lg text-gray-700 italic">
                      "{review.comment}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {displayedReviews.length > 1 && (
            <div className="flex justify-center mt-6">
              {displayedReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`mx-2 w-3 h-3 rounded-full ${currentSlide === index ? "bg-hotel-600" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
