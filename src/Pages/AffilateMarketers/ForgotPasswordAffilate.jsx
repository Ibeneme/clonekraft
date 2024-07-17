import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  forgotPasswordAffiliate,
  validatePasswordAffiliate,
} from "../../Redux/marketers/marketers";
import { FaArrowLeft } from "react-icons/fa";
const ForgotPasswordAffiliate = () => {
  const [step, setStep] = useState(1); // To manage different steps of the forgot password flow
  const [email, setEmail] = useState(""); // State to hold user's email for sending OTP
  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchemaEmail = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
  });

  const validationSchemaOTPAndReset = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be 6 characters")
      .matches(/^\d+$/, "OTP must be numeric")
      .required("OTP is Required"),
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

  const handleEmailSubmit = (values, { setSubmitting }) => {
    setEmail(values.email);
    setSubmitting(false);
    const payload = { email: values.email };
    dispatch(forgotPasswordAffiliate(payload)) // Dispatch the send OTP action
      .then((response) => {
        console.log(response, "response");
        if (response.payload === "OTP sent to your email.") {
          setStep(2);
          setErr("");
        } else {
          setErr("Failed to send OTP. Account with this Email doesn't exist.");
        }
        //setStep(3); // Proceed to step 3 after sending OTP
      })
      .catch((error) => {
        setErr("Failed to send OTP. Please try again later.");
        console.log("Failed to send OTP:", error);
      });
    //setStep(2); // Proceed to step 2 after validating email
  };

  const handleResetSubmit = (values, { setSubmitting }) => {
    console.log(values, email, "valuesvalues");
    setErr("");
    const resetData = {
      email,
      otp: values.otp,
      newPassword: values.password,
    };

    dispatch(validatePasswordAffiliate(resetData)) // Dispatch the reset password action
      .then((response) => {
        console.log("Password reset successful:", response);
        setSubmitting(false);
        if (response.payload === "Password updated successfully.") {
          navigate("/reset-success-marketer");
        } else {
          setErr("Incorrect OTP");
        }
        //navigate("/password-reset-success"); // Navigate to password reset success page
      })
      .catch((error) => {
        setErr("An error occurred while resetting password");
        console.log("Password reset failed:", error);
        setSubmitting(false);
      });
  };

  const handleSendOTP = () => {
    setErr("");
    dispatch(forgotPasswordAffiliate(email)) // Dispatch the send OTP action
      .then(() => {
        setStep(3); // Proceed to step 3 after sending OTP
      })
      .catch((error) => {
        setErr("Failed to send OTP. Please try again later.");
        console.log("Failed to send OTP:", error);
      });
  };

  return (
    <div
      className="auth-div"
      style={{ height: "200vh", paddingTop: 120, width: "96vw" }}
    >
      <div
        className="auth-div-div"
        style={{ height: "100%", overflowY: "scroll" }}
      >
        {step === 1 && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchemaEmail}
            onSubmit={handleEmailSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2 style={{ margin: 0 }}>Forgot Password as a Promoter</h2>
                <p className="auth-div-p">
                  Already have an account?
                  <span
                    style={{ color: "#C19F62" }}
                    onClick={() => navigate("/login-marketer")}
                  >
                    {" "}
                    Login
                  </span>
                </p>
                {err && (
                  <p
                    className="error-message"
                    style={{
                      color: "#C19F62",
                      backgroundColor: "#C19F6220",
                      width: "fit-content",
                      padding: 16,
                      marginBottom: 48,
                    }}
                  >
                    {err}
                  </p>
                )}

                <div
                  className="div-input"
                  style={{
                    display: "flex",
                    marginTop: 45,
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="email">Email</label>
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
                <div style={{ marginTop: 64 }}>
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
        )}
        {step === 2 && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaOTPAndReset}
            onSubmit={handleResetSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div
                  onClick={() => {
                    setStep(1);
                    setErr("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowLeft />
                </div>
                <br />
                <h2 style={{ margin: 0 }}>Reset Password</h2>
                {err && (
                  <p
                    className="error-message"
                    style={{
                      color: "#ff0000",
                      backgroundColor: "#ff000020",
                      width: "fit-content",
                      padding: 16,
                      marginBottom: 48,
                    }}
                  >
                    {err}
                  </p>
                )}
                <p
                  className="error-message"
                  style={{
                    color: "#C19F62",
                    backgroundColor: "#C19F6220",
                    width: "fit-content",
                    padding: 16,
                    marginBottom: 48,
                  }}
                >
                  Pls Check your email an OTP has been sent
                </p>
                <div
                  className="div-input"
                  style={{
                    display: "flex",
                    marginTop: 45,
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="otp">Enter OTP</label>
                  <Field
                    className="input-field"
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP sent to your email"
                  />
                  <ErrorMessage
                    className="err-field"
                    name="otp"
                    component="div"
                  />
                </div>
                <div className="div-input">
                  <label htmlFor="password">New Password</label>
                  <div className="password-field">
                    <Field
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your new password"
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
                  <div className="password-field">
                    <Field
                      className="input-field"
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                    />
                    <span
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                {err && <p className="error-message">{err}</p>}
                <div style={{ marginTop: 64 }}>
                  <button
                    className="btn-auth"
                    type="submit"
                    onClick={handleResetSubmit}
                    disabled={isSubmitting}
                  >
                    Send OTP
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {/* {step === 3 && (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaOTPAndReset}
              onSubmit={handleResetSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div onClick={() => setStep(2)} style={{ cursor: "pointer" }}>
                    <FaArrowLeft />
                  </div>
                  <br />
                  <h2 style={{ margin: 0 }}>Enter OTP and New Password</h2>

                  <div
                    className="div-input"
                    style={{
                      display: "flex",
                      marginTop: 45,
                      flexDirection: "column",
                    }}
                  >
                    <label htmlFor="otp">Enter OTP</label>
                    <Field
                      className="input-field"
                      type="text"
                      id="otp"
                      name="otp"
                      placeholder="Enter OTP sent to your email"
                    />
                    <ErrorMessage
                      className="err-field"
                      name="otp"
                      component="div"
                    />
                  </div>
                  <div className="div-input">
                    <label htmlFor="password">New Password</label>
                    <div className="password-field">
                      <Field
                        className="input-field"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your new password"
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
                    <div className="password-field">
                      <Field
                        className="input-field"
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your new password"
                      />
                      <span
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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
                  {err && <p className="error-message">{err}</p>}
                  <div style={{ marginTop: 64 }}>
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
        )} */}
      </div>
    </div>
  );
};

export default ForgotPasswordAffiliate;
