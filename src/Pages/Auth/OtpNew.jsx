import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, updateUser, validateOtp } from "../../Redux/auth/auth";
import { useDispatch } from "react-redux";
import useCustomToasts from "../ToastNotifications/Toastify";
import Modal from "../Components/Modal/Modal";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const OTPNew = () => {
  const location = useLocation();
  const { email } = location.state;
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  //const email = "hhhdhdhd";

  console.log(email, "emailemail");
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string().required("OTP is Required"),
  });
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const openmodal = () => {
    setModalOpen(true);
    console.log("Upload functionality will be implemented here");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setErr("");
    const payload = {
      email: email,
      otp: values.otp,
    };
    dispatch(validateOtp(payload)) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("Registration successful:", response, payload);
        if (response?.payload?.token) {
          setSubmitting(false);
          setModalOpen(true);
          //navigate("/home");
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          setErr("Invalid or Expired Otp");
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

    // // Handle OTP submission here (e.g., verify OTP)
    // console.log("Submitting OTP form:", values);
    // setSubmitting(false);
    // navigate("/home")
  };

  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const handleResend = () => {
    setErr("");
    dispatch(resendOtp(email)) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        if (response?.payload === "New OTP has been sent to your email.") {
          console.log("Registration successful:", response);
          showSuccessToast("OTP resend successful");
        } else {
          showErrorToast("OTP Resend Failed");
        }
      })
      .catch((error) => {
        //setErr("An error Occurred");
        console.log("Registration failed:", error);
        showErrorToast("OTP Resend Failed");
        //setSubmitting(false);
      });
  };
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmits = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);

    dispatch(
      updateUser({
        address: address,
        phoneNumber: phoneNumber,
      })
    ) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("update successful:", response);
        if (response?.payload?.address) {
          console.log("Registration successful:", response);
          showSuccessToast("User data updated successful");
          navigate("/home");
        } else {
          showErrorToast("Failed to Update user");
        }
      })
      .catch((error) => {
        //setErr("An error Occurred");
        console.log("Registration failed:", error);
        showErrorToast("Failed to Update user");
        //setSubmitting(false);
      });
  };

  return (
    <div className="auth-div">
      <div>
        {" "}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          ifClose={true}
          formContent={
            <div>
              <form onSubmit={handleSubmits}>
                <h2
                  className="vw-text"
                  style={{
                    fontSize: 32,
                  }}
                >
                  <span style={{ color: "#C19F62" }}></span> Let's get this
                  details to serve you better
                </h2>

                <div className="vw">
                  <h2
                    className="vw-text"
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Tell us, what's your{" "}
                    <span style={{ color: "#C19F62" }}> Address 🏡 </span>
                  </h2>
                  <textarea
                    placeholder="Enter your address"
                    value={address}
                    className="input-field"
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ height: 120 }}
                  />
                </div>

                <br />

                <div className="vw">
                  <h2
                    className="vw-text"
                    style={{
                      fontSize: 18,
                    }}
                  >
                    What's your
                    <span style={{ color: "#C19F62" }}> Phone Number 📲 </span>
                  </h2>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    className="input-field"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <br />
                {phoneNumber && address ? (
                  <div
                    style={{
                      cursor: "pointer",
                      marginTop: 40,
                      marginBottom: 96,
                    }}
                  >
                    <div className="div-btn-auth"></div>
                    <button
                      // onClick={() => navigate("/pricing")}
                      // onClick={handleUploads}
                      className="btn-auth"
                      type="submit"
                    >
                      Submit{" "}
                      <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          }
        />
      </div>
      <div className="auth-div-div">
        <h2 style={{ margin: 0 }}>Enter OTP</h2>
        <p className="auth-div-p">
          Enter the one-time password (OTP) sent to your email.
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
                  <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
                </button>
                <br /> <br />
                <p style={{ cursor: "pointer" }} onClick={handleResend}>
                  Didn't get an OTP? Resend
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OTPNew;
