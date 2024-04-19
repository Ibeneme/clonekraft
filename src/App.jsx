import { Route, Routes, useLocation } from "react-router-dom";
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
import OrderPage from "./Pages/Home/Main/Orders";
import ProfilePage from "./Pages/Home/Main/Profile";
import ImageUpload from "./Pages/Home/Main/ImageUpload";
import TimerPricing from "./Pages/Home/Main/Pricing";
import ChatPage from "./Pages/Home/Main/ChatPage";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/chatpage"
          element={
            <>
              <Navbar />
              <ChatPage />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <ProfilePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/order"
          element={
            <>
              <Navbar />
              <OrderPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <Navbar />
              <ImageUpload />
              <Footer />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <Navbar />
              <Gallery />
              <Footer />
            </>
          }
        />

        <Route
          path="/pricing"
          element={
            <>
              <Navbar />
              <TimerPricing />
              <Footer />
            </>
          }
        />

        {/* Other routes without the Navbar */}
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/otp-new" element={<OTPNew />} />
      </Routes>
    </>
  );
}

export default App;
