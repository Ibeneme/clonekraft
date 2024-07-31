import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateOtp } from "../../Redux/auth/auth";
import { useRef } from "react";

const OTP = () => {
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required("OTP is Required"),
  });
  const location = useLocation();
  const { email } = location.state;
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");

    const payload = {
      email: email,
      otp: values.otp,
    };
    dispatch(validateOtp(payload)) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful:", response);
        if (response?.payload?.token) {
          setSubmitting(false);
          navigate("/reset", { state: { email: email } });
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          setErr("An account with this email already exists");
        } else {
          setErr("An error Occurred");
        }
        setSubmitting(false);
        // Navigate to the OTP verification page or any other page
      })
      .catch((error) => {
        setErr("An error Occurred");
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
      <div className="auth-div-div">
        <h2 style={{ margin: 0 }}>Enter OTP</h2>
        <p className="auth-div-p">
          Enter the one-time password (OTP) sent to your email.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="div-input">
                <label htmlFor="otp">OTP</label>
                <br />
                <Field
                  className="input-field"
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                />
                <ErrorMessage
                  className="err-field"
                  name="otp"
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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OTP;
