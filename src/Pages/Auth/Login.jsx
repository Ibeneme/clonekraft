import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

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
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle login submission here
    console.log("Submitting login form:", values);
    setSubmitting(false);
  };
  const navigate = useNavigate();
  return (
    <div className="auth-div">
      <div>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="auth-div-div">
        <h2 style={{ margin: 0 }}>Welcome to CloneKraft</h2>
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
                <br />{" "}
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

              <p
                style={{
                  color: "#808080",
                  fontSize: 14,
                  marginTop: 48,
                }}
                onClick={() => navigate("/forgot")}
              >
                Forgot Password?
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
