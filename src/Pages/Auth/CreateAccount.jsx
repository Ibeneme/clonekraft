import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import "../LandingPage/Hero/Hero.css";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/auth/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the icons
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize params to access the referralId
  const params = useParams();
  const referralId = params.referralId || null; // Access referralId from params, if exists

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    referralId: referralId, // Include referralId in initialValues
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
    phoneNumber: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't be longer than 15 digits")
      .required("Phone number is Required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address can't be longer than 200 characters")
      .required("Address is Required"),
    referralId: Yup.string().nullable(), // ReferralId is optional in validation
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form values:", values); // Log form values including referralId
    setErr("");
    dispatch(register(values)) // Dispatch the register action with form values
      .then((response) => {
        console.log("Registration successful:", response);
        if (response?.payload?.token) {
          setSubmitting(false);
          navigate("/home");
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          setErr("An account with this email already exists");
        } else {
          setErr("An error occurred during registration");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setErr("An error occurred during registration");
        console.log("Registration failed:", error);
        setSubmitting(false);
      });
  };

  const imageContainerRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop -= 1;
        if (imageContainerRef.current.scrollTop <= 0) {
          imageContainerRef.current.scrollTop =
            imageContainerRef.current.scrollHeight -
            imageContainerRef.current.clientHeight;
        }
      }
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-div" style={{ height: "200vh", paddingTop: 120 }}>
      <div
        className="auth-div-div"
        style={{ height: "100%", overflowY: "scroll" }}
      >
        <h2 style={{ margin: 0 }}>Create an Account</h2>
        <p className="auth-div-p">
          Already have an account?
          <span style={{ color: "#C19F62" }} onClick={() => navigate("/login")}>
            {" "}
            Login
          </span>
        </p>
        {err && (
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
        )}
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
                <div className="password-field">
                  <Field
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  className="err-field"
                  name="password"
                  component="div"
                />
              </div>
              <div className="div-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <div className="password-field">
                  <Field
                    className="input-field"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <ErrorMessage
                  className="err-field"
                  name="confirmPassword"
                  component="div"
                />
              </div>

              <div className="div-input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <br />
                <Field
                  className="input-field"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  className="err-field"
                  name="phoneNumber"
                  component="div"
                />
              </div>

              {referralId && (
                <div className="div-input">
                  <label htmlFor="phoneNumber">Referral ID</label>
                  <br />
                  <Field
                    className="input-field"
                    type="text"
                    id="referralId"
                    name="referralId"
                    value={referralId}
                  />
                </div>
              )}

              <div className="div-input">
                <label htmlFor="address">Address</label>
                <br />
                <Field
                  className="input-field"
                  as="textarea"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  rows="4"
                />
                <ErrorMessage
                  className="err-field"
                  name="address"
                  component="div"
                />
              </div>
              <div style={{ marginTop: 24 }}>
                <button
                  className="btn-auth"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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

export default CreateAccount;
