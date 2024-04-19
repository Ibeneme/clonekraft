import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required("OTP is Required"),
  });
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle OTP submission here (e.g., verify OTP)
    console.log("Submitting OTP form:", values);
    setSubmitting(false);
    navigate("/reset")
  };

  return (
    <div className="auth-div">
      <div>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
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
