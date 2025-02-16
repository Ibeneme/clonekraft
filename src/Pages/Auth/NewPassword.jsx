import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/auth/auth";
import useCustomToasts from "../ToastNotifications/Toastify";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const ResetPassword = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is Required"),
  });
  const location = useLocation();
  const { email } = location.state;
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle password reset submission here
    console.log("Submitting reset password form:", values);
    setSubmitting(false);
    setErr("");

    const payload = {
      email: email,
      newPassword: values.password,
    };
    dispatch(resetPassword(payload)) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful:", response);
        if (response?.payload === "Password reset successfully.") {
          setSubmitting(false);
          showSuccessToast("Password Reset Successful, Proceed to Login");
          navigate("/login");
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          showErrorToast("Password Reset Failed");
          setErr("Password Reset Failed");
        } else {
          setErr("An error Occurred");
          showErrorToast("Password Reset Failed");
        }
        setSubmitting(false);
        // Navigate to the OTP verification page or any other page
      })
      .catch((error) => {
        setErr("An error Occurred");
        showErrorToast("An error Occurred");
        console.log("Registration failed:", error);
        setSubmitting(false);
      });
  };

  const imageContainerRef = useRef(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop -= 1; // Change += to -= to scroll in the opposite direction
        if (
          imageContainerRef.current.scrollTop <= 0 // Update the condition for scrolling to top
        ) {
          imageContainerRef.current.scrollTop =
            imageContainerRef.current.scrollHeight -
            imageContainerRef.current.clientHeight; // Scroll to the bottom
        }
      }
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-div">
      <div style={{ width: "50%" }} data-aos="zoom-in">
        <div
          className="scrollingImages"
          ref={imageContainerRef}
          style={{ overflowY: "hidden", height: "800px", padding: 16 }}
        >
          <div className="image-containersz">
            <img
              src="https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/michael-oxendine-GHCVUtBECuY-unsplash_wuxwja.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8266_y1buyw.jpg"
              alt="Sample Image 3"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>

          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8264_scfefo.jpg"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715627032/5919f0d917510a632268b369b6e61be4_-_Copy_mvoiyw.webp"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427076/francesca-tosolini-Gh_UjjYoVwk-unsplash_vb28gq.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
          <div className="image-containersz">
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
              className="imagesz"
            />
            <div className="overlaysz"></div>
          </div>
        </div>{" "}
      </div>
      <div className="auth-div-div">
        <h2 style={{ margin: 0 }}>Reset Password</h2>
        <p className="auth-div-p">
          Don't have an account?
          <span
            style={{ color: "#007bff" }}
            onClick={() => navigate("/createaccount")}
          >
            {" "}
            Create an Account
          </span>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="div-input">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  className="input-field"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  className="err-field"
                  name="password"
                  component="div"
                />
              </div>
              <div className="div-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <Field
                  className="input-field"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  className="err-field"
                  name="confirmPassword"
                  component="div"
                />
              </div>
              <div style={{ marginTop: 64 }}>
                <div className="div-btn-auth"></div>
                <button
                  className="btn-auth"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit{" "}
                  <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
