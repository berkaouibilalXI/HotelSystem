import { useState, useEffect } from "react";
import { getReviews, updateReviewStatus, deleteReview } from "@/firebase/firestore";
import DashboardSidebar from "@/components/admin/DashboardSidebar";
import { toast } from "sonner";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateReviewStatus(id, true);
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, approved: true } : review
        )
      );
      toast.success("Review approved");
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("Failed to approve review");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateReviewStatus(id, false);
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, approved: false } : review
        )
      );
      toast.success("Review rejected");
    } catch (error) {
      console.error("Error rejecting review:", error);
      toast.error("Failed to reject review");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
        setReviews(reviews.filter((review) => review.id !== id));
        toast.success("Review deleted");
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to delete review");
      }
    }
  };

  const filteredReviews = filter === "all" 
    ? reviews 
    : filter === "approved" 
    ? reviews.filter(review => review.approved) 
    : reviews.filter(review => !review.approved);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Manage Reviews</h1>
          </div>

          <div className="mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-4 py-2 rounded-md ${
                  filter === "approved"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-md ${
                  filter === "pending"
                    ? "bg-hotel-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pending/Rejected
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {review.createdAt
                          ? new Date(review.createdAt.seconds * 1000).toLocaleDateString()
                          : ""}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          review.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {review.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <div className="flex justify-end space-x-2">
                    {!review.approved && (
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {review.approved && (
                      <button
                        onClick={() => handleReject(review.id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {filteredReviews.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
                  No reviews found with the selected filter.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
