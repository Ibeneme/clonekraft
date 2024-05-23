import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import "../LandingPage/Hero/Hero.css";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/auth/auth";
import { useState } from "react";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
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

  const handleSubmits = (values, { setSubmitting }) => {
    // Handle signup submission here
    console.log("Submitting signup form:", values);
    setSubmitting(false);
    navigate("/otp-new");
  };


  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");
    dispatch(register(values)) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful:", response);
        if (response?.payload === "OTP sent to your email for verification.") {
          setSubmitting(false);
          navigate("/otp-new", { state: { email: values.email } });
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
        <h2 style={{ margin: 0 }}>Create an Account</h2>
        <p className="auth-div-p">
          Already have an account?
          <span style={{ color: "#C19F62" }} onClick={() => navigate("/login")}>
            {" "}
            Login
          </span>
        </p>
        {err ? (
          <p
            style={{
              fontSize: 14,
              color: "#ff0000",
              backgroundColor: "#ff000017",
              padding: 16,
              width: "fit-content",
            }}
          >
            {err}
          </p>
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="div-input">
                <label htmlFor="username">Username</label>
                <br />
                <Field
                  className="input-field"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  className="err-field"
                  name="username"
                  component="div"
                />
              </div>
              <div className="div-input">
                <label htmlFor="email">Email</label>
                <br />
                <Field
                  className="input-field"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  className="err-field"
                  name="email"
                  component="div"
                />
              </div>
              <div className="div-input">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  className="input-field"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
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
                  placeholder="Confirm your password"
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

export default CreateAccount;
