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
import Us from "./Pages/NewLandingPage/Hero/Us";

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
import ImageUpload from "./Pages/Home/Main/ImageUpload";
import TopLevel from "./Pages/LandingPage/Navbar/Navbar";
import AboutUsHeader from "./Pages/LandingPage/Hero/AboutUsHeader";
import TeamMembers from "./Pages/LandingPage/Hero/Team";
import GeneralPolicy from "./Pages/LandingPage/Hero/AboutUsRefund";
import AboutUsHeaderRefund from "./Pages/LandingPage/Hero/AboutUsRefundHeader";
import OrdersPage from "./Pages/Home/Main/OrdersPage";
import CreateAccountMarketers from "./Pages/AffilateMarketers/CreateAccount";
import LoginAsAffiliate from "./Pages/AffilateMarketers/LoginAsAffiliate";
import ForgotPasswordAffiliate from "./Pages/AffilateMarketers/ForgotPasswordAffilate";
import PasswordResetSuccess from "./Pages/AffilateMarketers/PasswordResetSuccessAffilate";
import ExpenseIndex from "./Pages/AffilateMarketers/analytics/Index";
import Dashboard from "./Pages/AffilateMarketers/analytics/Dashboard";
import WhatsAppRedirect from "./WhatsappRedirect/WhatsappRedirect";
import MobileNavbar from "./Redux/MobileNav/MobileNavbar";
import MobileNavbarMarketers from "./Pages/AffilateMarketers/MobileNavMarketers/MobileNavbarMarketers";
import DashboardOrders from "./Pages/AffilateMarketers/analytics/DashboardOrders";
import DashboardProfile from "./Pages/AffilateMarketers/analytics/DashboardProfile";
import IndexNewLandingPage from "./Pages/NewLandingPage/Index";
import NewNavbar from "./Pages/NewLandingPage/Navbar/Navbar";
import HeroHeader from "./Pages/NewLandingPage/Hero/HeroHeader";
import OurTeam from "./Pages/LandingPage/Hero/Our_Teams/OurTeams";

function App() {
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 10) {
        axios.get('https://clone-kraft-s-server-rjx3.onrender.com')
          .then((response) => {
            console.log('API response:', response.data); // Handle the response data
          })
          .catch((error) => {
            console.error('Error calling API:', error); // Handle error
          });
        count++;
      } else {
        clearInterval(interval); // Stop the interval after 10 calls
      }
    }, 1000); // Call every 1 second (1000ms)

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []); //
  

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

  const isLoggedIn =
    !!localStorage.getItem("clone_kraft_user_token") ||
    !!localStorage.getItem("clone_kraft_admin_token");
  //const isAdminLoggedIn = !!localStorage.getItem("clone_kraft_admin_token"); // Separate storage for admin token

  const token = localStorage.getItem("clone_kraft_user_token");

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
    //const adminProtectedPaths = ["/order-admin", "/chat-admin"]; // Admin-specific routes

    if (!isLoggedIn && protectedPaths.includes(currentPath)) {
      navigate("/"); // Redirect to login for non-admin protected routes
    }
    // else if ( adminProtectedPaths.includes(currentPath)) {
    //   navigate("/admin"); // Redirect to admin login for admin-specific routes
    // }
  }, [isLoggedIn]);

  // Protected Routes (non-admin)
  const ProtectedRoutes = ({ children }) => <>{children}</>;

  // Admin Protected Routes
  const AdminProtectedRoutes = ({ children }) => <>{children}</>;
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <IndexNewLandingPage />
              <WhatsAppRedirect />
              {token && <MobileNavbar />}
              <Footer />
            </>
          }
        />

        <Route path="/order-details/:orderId" element={<OrdersPage />} />

        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <MobileNavbar />
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
              <MobileNavbar />
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
              <MobileNavbar />
              <NavbarAdmin />
              <Chat />
              {/* <Footer /> */}
            </ProtectedRoutes>
          }
        />

        {/* Other routes without the Navbar */}
        {/* <Route
          path="/"
          element={
            <>
              <Index />
              <WhatsAppRedirect />
            </>
          }
        /> */}
        <Route
          path="/about"
          element={
            <>
              <NewNavbar />
              <HeroHeader
                title="About Us"
                subtitle="At Lukas Design Lab, we believe that furniture is more than just functional—it’s an expression of art, innovation, and craftsmanship. Our passion is in creating exceptional pieces that resonate with your soul and elevate your living spaces. We seamlessly blend form and function, using high-quality materials and cutting-edge technology. Every design is a unique reflection of your vision, crafted with meticulous attention to detail. We aim to transform environments and inspire those who experience our work. At Lukas Design Lab, furniture becomes a statement, not just an object."
              />
              <Us />
              <Footer />
            </>
          }
        />

        <Route
          path="/our-team"
          element={
            <>
              <NewNavbar />
              <HeroHeader
                title="Our Team"
                subtitle="Our team is a powerhouse of talent and creativity. With a crew of bold
                designers, sharp engineers, and marketing mavericks, Lukas Design Lab
                is a force to be reckoned with. We don’t just work together—we
                collaborate, challenge, and push each other to create designs that
                don’t just meet expectations—they shatter them."
              />
              <OurTeam />
              <Footer />
            </>
          }
        />

        <Route
          path="/policy"
          element={
            <>
              <NewNavbar />
              <HeroHeader
                title="Our Refund Policy"
                subtitle="Lukas Design Lab (LDL) is committed to customer satisfaction and strives to provide high-quality products and services. However, we understand that there may be circumstances where a refund is necessary. This refund policy outlines the terms and conditions for requesting and processing refunds for products and services purchased from LDL."
              />
              <GeneralPolicy />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/createaccount/:referralId" element={<CreateAccount />} />
        <Route path="/createaccount" element={<CreateAccount />} />

        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/otp-new" element={<OTPNew />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <MobileNavbar />
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
              <MobileNavbar />
              <Navbar />
              <ChatPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <NewNavbar />
              <MobileNavbar />
              <HeroHeader
                hideButton
                title="Your Profile"
                subtitle="Welcome to your personal space! Here, you can manage your account details, update your preferences, track your activity, and customize your experience. Stay in control of your journey, connect with your network, and access everything you need—all in one place."
              />
              <ProfilePage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <NewNavbar />
              <MobileNavbar />
              <HeroHeader
                hideButton
                title="Your Orders"
                subtitle="Welcome to your order management hub! Here, you can view all your past and current orders, track their status, manage your preferences, and make adjustments as needed. Stay updated, make informed decisions, and take full control of your orders—all in one place."
              />
              <OrderPage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order-single"
          element={
            <ProtectedRoutes>
              <MobileNavbar />
              <NewNavbar />
              <OrderDescriptionPage />
              <Footer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoutes>
              <MobileNavbar />
              <NewNavbar />

              <ImageUpload />
              <Footer />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoutes>
              <MobileNavbar />
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
              <MobileNavbar />
              <Navbar />
              <TimerPricing />
              <Footer />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/upload"
          element={
            <>
              <Navbar /> <ImageUpload /> <br /> <Footer />
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

        <Route
          path="/create-account-influencer"
          element={
            <>
              <CreateAccountMarketers />
            </>
          }
        />

        <Route
          path="/login-influencer"
          element={
            <>
              <LoginAsAffiliate />
            </>
          }
        />

        <Route
          path="/forgot-influencer"
          element={
            <>
              <ForgotPasswordAffiliate />
            </>
          }
        />

        <Route
          path="/profile-influencer"
          element={
            <>
              <DashboardProfile />
              <MobileNavbarMarketers />
            </>
          }
        />

        <Route
          path="/reset-success-influencer"
          element={
            <>
              <PasswordResetSuccess />
            </>
          }
        />

        <Route
          path="/index-dashboard"
          element={
            <>
              <Dashboard />
              <MobileNavbarMarketers />
            </>
          }
        />
        <Route
          path="/marketers-dashboard-orders"
          element={
            <>
              <DashboardOrders />
              <MobileNavbarMarketers />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
