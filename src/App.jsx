import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/firebase/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css"

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFound from "./pages/NotFound";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "@/pages/RoomDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookNowPage from "./pages/BookNowPage";
import RoleDebugger from "./components/RoleDebugger";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import AdminRoomsPage from "./pages/admin/RoomsPage";
import AdminBookingsPage from "./pages/admin/BookingsPage";
import AdminReviewsPage from "./pages/admin/ReviewsPage";
import AdminMessagesPage from "./pages/admin/MessagesPage";
import RoomFormPage from "./pages/admin/RoomFormPage";
import BookingFormPage from "./pages/admin/BookingFormPage";
import BookingDetailPage from "./pages/admin/BookingDetailPage";

// Protected route
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize AOS animation library with default configuration
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="b-hotel-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RoleDebugger />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:id" element={<RoomDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/book-now" element={<BookNowPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/rooms"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <AdminRoomsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/rooms/new"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <RoomFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/rooms/edit/:id"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <RoomFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/bookings"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <AdminBookingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/bookings/new"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <BookingFormPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/bookings/:id"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <BookingDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/reviews"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <AdminReviewsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/messages"
                  element={
                    <ProtectedRoute requiredRole={["admin", "staff"]}>
                      <AdminMessagesPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
