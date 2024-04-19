import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
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

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle signup submission here
    console.log("Submitting signup form:", values);
    setSubmitting(false);
    navigate("/otp-new");
  };

  return (
    <div className="auth-div">
      <div>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="auth-div-div">
        <h2 style={{ margin: 0 }}>Create an Account</h2>
        <p className="auth-div-p">
          Already have an account?
          <span style={{ color: "#007bff" }} onClick={() => navigate("/login")}>
            {" "}
            Login
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
