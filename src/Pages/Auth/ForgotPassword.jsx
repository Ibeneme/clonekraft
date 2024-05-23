import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import logo from "../../assets/auth/right.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgot } from "../../Redux/auth/auth";
import { useEffect } from "react";

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState();
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    setErr("");
    dispatch(forgot(values))
      .then((response) => {
        console.log("Registration successful:", response);
        if (response?.payload === "OTP has been sent to your email.") {
          setSubmitting(false);
          navigate("/otp", { state: { email: values.email } });
        } else if (
          response?.error?.message === "Request failed with status code 400"
        ) {
          setSubmitting(false);
          setErr("An account with this email already exists");
        } else if (
          response?.payload?.response?.data === "Invalid email or password"
        ) {
          setErr("Invalid email or password");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setErr("An error Occurred");
        const returnErr = error.data;
        setErr(returnErr);
        console.log("Registration failed:", error);
        setSubmitting(false);
      });
  };  const imageContainerRef = useRef(null);
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
        <h2 style={{ margin: 0 }}>Forgot Password?</h2>
        <p className="auth-div-p">
          Enter your email address and we'll send you a link to reset your
          password.
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

export default ForgotPassword;
