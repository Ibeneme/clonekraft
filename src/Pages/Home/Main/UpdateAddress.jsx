import React, { useState } from "react";
import * as Yup from "yup";
import "../../Auth/Auth.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCustomToasts from "../../ToastNotifications/Toastify";
import { updateUser } from "../../../Redux/auth/auth";
import Modal from "../../Components/Modal/Modal";

const UpdateAddressModal = () => {

  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);

  const openmodal = () => {
    setModalOpenUpdate(true);
    console.log("Upload functionality will be implemented here");
  };

  const closeModal = () => {
    setModalOpenUpdate(false);
  };

  const { showSuccessToast, showErrorToast } = useCustomToasts();

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
          setModalOpenUpdate(false);
          //navigate("/home");
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
    <div>
      <div>
        {" "}
        <Modal
          isOpen={modalOpenUpdate}
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
                      Submit
                    </button>
                  </div>
                ) : null}
              </form>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UpdateAddressModal;
