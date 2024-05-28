import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import CreateAccount from "./Pages/Auth/CreateAccount";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import OTP from "./Pages/Auth/Otp";
import ResetPassword from "./Pages/Auth/NewPassword";
import OTPNew from "./Pages/Auth/OtpNew";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Main/Home";
import Footer from "./Pages/Home/Footer";
import Gallery from "./Pages/Home/Main/Gallery";
import { useEffect } from "react";
import ProfilePage from "./Pages/Home/Main/Profile";
//import ImageUpload from "./Pages/Home/Main/ImageUpload";
import ChatPage from "./Pages/Home/Main/ChatPage";
import Index from "./Pages/LandingPage/Index";
import AOS from "aos";
import "aos/dist/aos.css";
import TimerPricing from "./Pages/Home/Main/Pricing";
import OrderPage from "./Pages/Home/Main/Orders";
import OrderDescriptionPage from "./Pages/Home/Main/OrderDescription";
import AdminLogin from "./Admin/Auth/Login";
import NavbarAdmin from "./Admin/Navbar/Navbar";
import User from "./Admin/Users/Users";
import AdminOrders from "./Admin/Orders/Orders";
import AdminOrderDescriptionPage from "./Admin/Orders/OrderDescription";
import Chat from "./Admin/Chat/Chat";
import ObjectDetection from "./Pages/ObjeectDetection/ObjectDetection";
import PaymentSuccess from "./Pages/ObjeectDetection/PaymentSuccess";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  const isLoggedIn = !!localStorage.getItem("clone_kraft_user_token");
  const isAdminLoggedIn = !!localStorage.getItem("clone_kraft_admin_token"); // Separate storage for admin token

  useEffect(() => {
    const currentPath = window.location.pathname;
    const protectedPaths = [
      "/home",
      "/profile",
      "/chatpage",
      "/order",
      "/order-single",
      "/upload",
      "/gallery",
      "/pricing",
      "/users",
      "/orders",
    ];
    const adminProtectedPaths = ["/order-admin", "/chat-admin"]; // Admin-specific routes

    if (!isLoggedIn && protectedPaths.includes(currentPath)) {
      navigate("/"); // Redirect to login for non-admin protected routes
    } else if (!isAdminLoggedIn && adminProtectedPaths.includes(currentPath)) {
      navigate("/"); // Redirect to admin login for admin-specific routes
    }
  }, [isLoggedIn, isAdminLoggedIn]);

  // Protected Routes (non-admin)
  const ProtectedRoutes = ({ children }) => <>{children}</>;

  // Admin Protected Routes
  const AdminProtectedRoutes = ({ children }) => <>{children}</>;
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Navbar />
              <Home />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chatpage"
          element={
            <ProtectedRoutes>
              <Navbar />
              <ChatPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Navbar />
              <ProfilePage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Navbar />
              <OrderPage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order-single"
          element={
            <ProtectedRoutes>
              <Navbar />
              <OrderDescriptionPage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoutes>
              <Navbar />
              <ObjectDetection />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoutes>
              <Navbar />
              <Gallery />
              <Footer />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/pricing"
          element={
            <ProtectedRoutes>
              <Navbar />
              <TimerPricing />
              <Footer />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <NavbarAdmin />
              <User />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <NavbarAdmin />
              <AdminOrders />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order-admin"
          element={
            <AdminProtectedRoutes>
              <NavbarAdmin />
              <AdminOrderDescriptionPage />
              <Footer />
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/chats-admin"
          element={
            <AdminProtectedRoutes>
              <Navbar />
              <Chat />
              {/* <Footer /> */}
            </AdminProtectedRoutes>
          }
        />
        <Route
          path="/chat-user"
          element={
            <ProtectedRoutes>
              <NavbarAdmin />
              <Chat />
              {/* <Footer /> */}
            </ProtectedRoutes>
          }
        />

        {/* Other routes without the Navbar */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/otp-new" element={<OTPNew />} />
        <Route
          path="/upload"
          element={
            <>
              <Navbar /> <ObjectDetection /> <br /> <Footer />
            </>
          }
        />
        <Route path="/sucess" element={<PaymentSuccess />} />
        <Route
          path="/admin"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
