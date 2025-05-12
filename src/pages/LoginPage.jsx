import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/firebase/auth-context";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to log in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "You have been logged in with Google successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to log in with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@bhotel.com");
      setPassword("admin123");
    } else {
      setEmail("staff@bhotel.com");
      setPassword("staff123");
    }

    toast({
      title: "Demo Credentials",
      description: `${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled. Click Sign In to continue.`,
    });
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navbar />
      <div className="min-h-[calc(100vh-5rem)] py-16 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-hotel-600 focus:ring-hotel-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-hotel-600 hover:text-hotel-700 dark:text-hotel-400 dark:hover:text-hotel-300"
              >
                Forgot password?
              </a>
            </div>
            <div className="space-y-2">
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-hotel-600 hover:bg-hotel-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-500 transition duration-200 dark:bg-hotel-700 dark:hover:bg-hotel-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                ) : (
                  "Sign In"
                )}
              </motion.button>

              {/* Demo credentials buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <motion.button
                  type="button"
                  onClick={() => fillDemoCredentials("admin")}
                  className="py-1 px-2 text-xs border border-hotel-300 text-hotel-700 rounded hover:bg-hotel-50 dark:border-hotel-600 dark:text-hotel-400 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use Admin Demo
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => fillDemoCredentials("staff")}
                  className="py-1 px-2 text-xs border border-hotel-300 text-hotel-700 rounded hover:bg-hotel-50 dark:border-hotel-600 dark:text-hotel-400 dark:hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Use Staff Demo
                </motion.button>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-500 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151L12.545 12.151M12.545 12.151L12.545 12.151L12.545 12.151M12.545 12.151L12.545 12.151L12.545 12.151M12.545 12.151L20.5 12.151C20.5 9.7 19.38 7.47 17.61 6.04C15.84 4.61 13.555 3.864 11.289 4.032C9.023 4.2 6.9 5.268 5.47 7.002C4.04 8.736 3.414 10.97 3.74 13.186C4.066 15.402 5.316 17.368 7.207 18.614C9.098 19.859 11.463 20.276 13.67 19.76C15.877 19.244 17.73 17.838 18.77 15.92"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Google
              </motion.button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-hotel-600 hover:text-hotel-700 dark:text-hotel-400 dark:hover:text-hotel-300 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
