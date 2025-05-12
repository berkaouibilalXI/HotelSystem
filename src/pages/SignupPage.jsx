import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/firebase/auth-context";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);

    try {
      await loginWithGoogle();
      toast({
        title: "Success",
        description: "You have been signed up with Google successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up with Google:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950"> {/* Added dark bg to main container */}
      <Navbar />
      <main className="flex-grow"> {/* Added flex-grow to main content area */}
        <div className="min-h-[calc(100vh-10rem)] py-12 md:py-16 flex items-center justify-center bg-gray-50 dark:bg-slate-950"> {/* Adjusted min-height and padding */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md dark:shadow-slate-800"> {/* Adjusted padding and shadow */}
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Create Account
            </h2>
            <form onSubmit={handleSignup} className="space-y-5"> {/* Increased space-y */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>
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
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
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
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-hotel-600 dark:text-hotel-500 focus:ring-hotel-500 dark:focus:ring-hotel-400 border-gray-300 dark:border-slate-600 rounded bg-gray-100 dark:bg-slate-700"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-400"
                >
                  I agree to the{" "}
                  <a href="#" className="text-hotel-600 dark:text-hotel-400 hover:text-hotel-700 dark:hover:text-hotel-300 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-hotel-600 dark:text-hotel-400 hover:text-hotel-700 dark:hover:text-hotel-300 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white bg-hotel-600 hover:bg-hotel-700 dark:bg-hotel-500 dark:hover:bg-hotel-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 dark:ring-offset-slate-900 transition duration-200"
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
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hotel-500 dark:focus:ring-hotel-400 dark:ring-offset-slate-900 transition duration-200"
                >
                  <svg className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> {/* Adjusted Google icon color */}
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    <path d="M1 1h22v22H1z" fill="none"/>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"> {/* Increased margin-top */}
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-hotel-600 dark:text-hotel-400 hover:text-hotel-700 dark:hover:text-hotel-300 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
