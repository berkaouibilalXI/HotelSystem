import { Link } from "react-router-dom";
import { useAuth } from "@/firebase/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UnauthorizedPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <p className="text-gray-700">
              {user
                ? `You are logged in as ${user.email} with role: ${
                    user.role || "No role"
                  }`
                : "You are not logged in."}
            </p>
            <p className="text-gray-700">
              This page requires admin or staff privileges.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-hotel-600 hover:bg-hotel-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-500"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UnauthorizedPage;
