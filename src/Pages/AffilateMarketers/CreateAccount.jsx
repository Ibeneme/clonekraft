import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/auth/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerAffiliate } from "../../Redux/marketers/marketers";

const CreateAccountMarketers = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object({
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

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");

    const payload = {
      email: values.email,
      password: values.password,
    };
    console.log(payload, "values");
    dispatch(registerAffiliate(payload))
      .then((response) => {
        console.log("Registration successful:", response);
        if (response?.payload?.token) {
          setSubmitting(false);
          localStorage.setItem(
            "marketer",
            JSON.stringify(response.payload.marketer)
          );
          localStorage.setItem("token", response.payload.token);

          navigate("/index-dashboard");
          // navigate("/home");
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          setErr("Affiliate Marketer already exists.");
        } else {
          setErr("An error Occurred");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setErr("An error Occurred");
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
        <h2 style={{ margin: 0 }}>
          Create an Account as an Affiliate Marketer
        </h2>
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
              <div className="div-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
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
    </div>
  );
};

export default CreateAccountMarketers;
