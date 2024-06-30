import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/auth/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Auth/Auth.css"; // Ensure your CSS file path is correct
import { loginAffiliate } from "../../Redux/marketers/marketers";

const LoginAsAffiliate = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");
    dispatch(loginAffiliate(values))
      .then((response) => {
        console.log("Login successful:", response);
        if (response?.payload?.token) {
          localStorage.setItem(
            "marketer",
            JSON.stringify(response.payload.marketer)
          );
          localStorage.setItem("token", response.payload.token);
          setSubmitting(false);
          navigate("/index-dashboard"); // Redirect to the dashboard or home page after successful login
        } else {
          setErr("Invalid email or password");
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setErr("An error occurred while logging in");
        console.log("Login failed:", error);
        setSubmitting(false);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-marketer"); // Navigate to the Forgot Password page
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
        <h2 style={{ margin: 0 }}>Affiliate Marketer Login</h2>
        <div className="background-image" />{" "}
        {/* Replace with your background image */}
        <p className="auth-div-p">
          Don't have an account?
          <span
            style={{ color: "#C19F62" }}
            onClick={() => navigate("/create-account-marketer")}
          >
            {" "}
            Create Account
          </span>
        </p>
        <p className="auth-div-p">
          <span
            style={{ color: "#C19F62", cursor: "pointer", fontWeight: "Bold" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div
                className="div-input"
                style={{ display: "flex", flexDirection: "column" }}
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
              <div className="div-input">
                <label htmlFor="password">Password</label>
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
              <div style={{ marginTop: 64 }}>
                <button
                  className="btn-auth"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginAsAffiliate;
