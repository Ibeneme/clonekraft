import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { profile, updateUser, updateUserImage } from "../../../Redux/auth/auth";
import { MdEdit, MdLogout } from "react-icons/md";
import useCustomToasts from "../../ToastNotifications/Toastify";
import profilePic from "../../..//assets/auth/left.png";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../Components/Loader/ShimmerLoader";
import "./Profile.css";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const [user, setUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenLogout, setModalOpenLogout] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = () => {
    setIsLoading(true);
    dispatch(profile())
      .then((response) => {
        setUser(response?.payload);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setIsLoading(false);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      setIsLoading(true);

      dispatch(updateUserImage(formData))
        .then((response) => {
          showSuccessToast("Profile image updated successfully");
          handleFetchUser();
        })
        .catch((error) => {
          showErrorToast("Failed to update profile image");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    dispatch(updateUser({ address, phoneNumber, username }))
      .then((response) => {
        showSuccessToast("User data updated successfully");
        handleFetchUser();
        setModalOpen(false);
      })
      .catch((error) => {
        showErrorToast("Failed to update user data");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const formattedUsername = (name) =>
    name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();

  return (
    <>
      {isLoading ? (
        <ShimmerLoader />
      ) : (
        <div className="profile-container-profile">
          {/* Profile Modal for Editing */}
          {modalOpen && (
            <div className="modal-overlay-profile">
              <div
                className="modal-content-profile"
                style={{ maxWidth: 500, alignSelf: "center" }}
              >
                <div
                  className="close-modal-btn-pro-profile"
                  onClick={() => setModalOpen(false)}
                >
                  <FaTimes />
                </div>
                <div className="modal-form-profile">
                  <form onSubmit={handleUpdateProfile}>
                    <h2 className="modal-title-profile">Update Profile</h2>
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="input-field-profile"
                    />
                    <textarea
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-field-profile"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="input-field-profile"
                    />
                    <br />
                    <br />

                    {/* Profile Picture Change Label */}
                    <label
                      htmlFor="profile-picture"
                      className="file-label-profile"
                    >
                      Change Profile Picture
                    </label>
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="input-field-profile file-input-profile"
                    />

                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        className="image-preview-profile"
                      />
                    )}
                    <button type="submit" className="submit-btn-profile">
                      {isLoading ? "Loading..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Profile Container */}
          <div className="profile-content-profile">
            <div className="profile-header-profile">
              <div className="profile-avatar-profile">
                {user?.imageUrl ? (
                  <img src={user?.imageUrl} alt="User Avatar" />
                ) : (
                  <img src={profilePic} alt="Default Avatar" />
                )}
              </div>
              <div className="profile-info-profile">
                <h2>{formattedUsername(user?.username)}</h2>
                <p>
                  <FaEnvelope /> {user?.email || "No Email"}
                </p>
                <p>
                  <FaMapMarkerAlt /> {user?.address || "No Address"}
                </p>
                <p>
                  <FaPhone /> {user?.phoneNumber || "No Phone Number"}
                </p>
                <p>
                  <FaCalendarAlt />{" "}
                  {formatDate(user?.createdAt) || "No Registration Date"}
                </p>
                <button
                  className="logout-btn-pro-profile"
                  onClick={() => setModalOpen(true)}
                >
                  <MdEdit /> Edit Profile
                </button>

                <button
                  className="logout-btn-pro-profile"
                  onClick={() => setModalOpenLogout(true)}
                >
                  <MdLogout /> Log Out
                </button>
              </div>
            </div>

            {/* Logout Confirmation Modal */}
            {modalOpenLogout && (
              <div className="modal-overlay-profile">
                <div
                  className="modal-content-profile"
                  style={{
                    maxWidth: 500,
                    backgroundColor: "var(--darkBlue)",
                    padding: "20px",
                    borderRadius: "8px",
                    color: "#fff",
                    width: "80%",
                  }}
                >
                  <h2 style={{ color: "#fff", margin: 0 }}>
                    Are you sure you want to log out?
                  </h2>
                  <p style={{ color: "#ccc", marginTop: "10px" }}>
                    You will be logged out of your account. Any unsaved data may
                    be lost. Please confirm if you wish to proceed.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      onClick={handleLogout}
                      className="logout-confirm-btn"
                      style={{
                        backgroundColor: "var(--darkBlue)",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        width: "45%",
                        textAlign: "center",
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setModalOpenLogout(false)}
                      className="logout-cancel-btn"
                      style={{
                        backgroundColor: "var(--darkBlue)",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        width: "45%",
                        textAlign: "center",
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
