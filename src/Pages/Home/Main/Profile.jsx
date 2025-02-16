import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { profile, updateUser, updateUserImage } from "../../../Redux/auth/auth";
import { MdEdit, MdLogout } from "react-icons/md";
import Modal from "../../Components/Modal/Modal";
import useCustomToasts from "../../ToastNotifications/Toastify";
import profilePic from "../../..//assets/auth/left.png";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../Components/Loader/ShimmerLoader";
import "./Profile.css"; // Ensure styles are linked here

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
  const [modalOpenLogoOut, setModalOpenLogoOut] = useState(false);
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
        <div className="profile-container">
          {/* Profile Modal for Editing */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            formContent={
              <div className="modal-form">
                <form onSubmit={handleUpdateProfile}>
                  <h2 className="modal-title">Update Profile</h2>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imageUrl && <img src={imageUrl} alt="Profile" />}
                  <button type="submit">
                    {isLoading ? "Loading..." : "Save Changes"}
                  </button>
                </form>
              </div>
            }
          />

          {/* Profile Container */}
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.imageUrl ? (
                  <img src={user?.imageUrl} alt="User Avatar" />
                ) : (
                  <img src={profilePic} alt="Default Avatar" />
                )}
              </div>
              <div className="profile-info">
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
                  className="logout-btn-pro"
                  onClick={() => setModalOpen(true)}
                >
                  <MdEdit /> Edit Profile
                </button>

                <button
                  className="logout-btn-pro"
                  onClick={() => setModalOpenLogoOut(true)}
                >
                  <MdLogout /> Log Out
                </button>
              </div>
            </div>

            {/* Logout Section */}
            <div className="logout-section"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
