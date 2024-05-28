import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useNavigate } from "react-router-dom";
import GallerySectionIi from "../Home/Main/DeliverySectionII";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/auth/auth";
import useCustomToasts from "../ToastNotifications/Toastify";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");
    dispatch(login(values))
      .then((response) => {
        console.log("Registration successful:", response);
        if (response?.payload?.token) {
          setSubmitting(false);
          showSuccessToast("Login Successful");

          navigate("/home", { state: { email: values.email } });
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          showErrorToast("Can not find an account with this email");
          setErr("Can not find an account with this email");
        } else if (
          response?.payload?.response?.data === "Invalid email or password"
        ) {
          showErrorToast("Invalid email or password");

          setErr("Invalid email or password");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setErr("An error Occurred");
        showErrorToast("An error Occurred");
        const returnErr = error.data;
        setErr(returnErr);
        console.log("Registration failed:", error);
        setSubmitting(false);
      });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <GallerySectionIi /> */}

      <div
        style={{
          position: "absolute",
          top: 0,

          backgroundColor: "#0000099",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          paddingTop: 120,
          paddingRight: 24,
        }}
      >
        <div
          className="auth-div-div-div"
          style={{
            backgroundColor: "#fff",
            height: "fit-content",
            borderRadius: 24,
            padding: 24,
          }}
        >
          <h2 style={{ margin: 0, paddingTop: 48 }}>Welcome to CloneKraft</h2>
          <p className="auth-div-p">
            Don't have an account?
            <span
              style={{ color: "#C19F62" }}
              onClick={() => navigate("/createaccount")}
            >
              {" "}
              Create an Account
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
                  <label htmlFor="email">Email</label>
                  <br />
                  <Field
                    className="input-fields"
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
                    className="input-fields"
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
    </div>
  );
};

export default Login;
