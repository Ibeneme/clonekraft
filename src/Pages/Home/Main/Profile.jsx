import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { profile, updateUser, updateUserImage } from "../../../Redux/auth/auth";
import { MdEdit, MdLogout } from "react-icons/md";
import Modal from "../../Components/Modal/Modal";
import useCustomToasts from "../../ToastNotifications/Toastify";
import profilePic from "../../..//assets/auth/left.png";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../Components/Loader/ShimmerLoader";
import "./Profile.css";
import { getRatings } from "../../../Redux/order/order";
import RatingGrid from "../../LandingPage/Newsletter/RatingGrid";

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

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Redirect to login or home page
    navigate("/login"); // Change this to the appropriate path
  };

  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenLogoOut, setModalOpenLogoOut] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUserName] = useState("");
  const { showSuccessToast, showErrorToast } = useCustomToasts();
  const [image, setImage] = useState(null); // Added state for image file
  const [isLoading, setIsLoading] = useState(false); // Added state for loading status
  const [imageUrl, setImageUrl] = useState("");
  const [rating, setRatings] = useState([]);
  useEffect(() => {
    handleFetchUser();
    handleFetchRating();

    if (isLoading === true) {
      handleFetchUser();
    }
  }, []);

  const handleFetchRating = () => {
    dispatch(getRatings())
      .then((response) => {
        console.log("orders handleFetchRating:", response);
        setRatings(response?.payload);
        //setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        //setLoading(false);
      });
  };

  const handleFetchUser = () => {
    setIsLoading(true);
    dispatch(profile())
      .then((response) => {
        console.log("profile successful:", response);
        setUser(response?.payload);
        setIsLoading(false);
        if (response?.payload?.address === null) {
          setModalOpenUpdate(true);
        }

        //setImageUrl(response?.payload?.imageUrl);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setIsLoading(false);
      });
  };

  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(user?.username);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

      setIsLoading(true); // Set loading to true when upload starts

      dispatch(updateUserImage(formData))
        .then((response) => {
          console.log("Image upload successful:", response);
          showSuccessToast("Profile image updated successfully");
          handleFetchUser();
          setModalOpen(false);
          setImageUrl("");
        })
        .catch((error) => {
          console.log("Image upload failed:", error);
          showErrorToast("Failed to update profile image");
        })
        .finally(() => {
          setIsLoading(false); // Set loading to false after upload completes (whether success or failure)
        });
    }
    dispatch(
      updateUser({
        address: address ? address : user?.address,
        phoneNumber: phoneNumber ? phoneNumber : user?.phoneNumber,
        username: username ? username : user?.username,
      })
    )
      .then((response) => {
        console.log("Profile update successful:", response);
        showSuccessToast("User data updated successfully");
        handleFetchUser();
        setModalOpen(false);
      })
      .catch((error) => {
        console.log("Profile update failed:", error);
        showErrorToast("Failed to update user data");
      });
  };

  const handleSubmits = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
    setIsLoading(true);
    dispatch(
      updateUser({
        address: address,
        phoneNumber: phoneNumber,
      })
    ) // Dispatch the register action
      .then((response) => {
        // Handle successful registration
        console.log("update successful:", response);
        setIsLoading(false);
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
        setIsLoading(false);
        //setErr("An error Occurred");
        console.log("Registration failed:", error);
        showErrorToast("Failed to Update user");
        //setSubmitting(false);
      });
  };
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);

  return (
    <>
      {" "}
      {isLoading ? (
        <ShimmerLoader />
      ) : (
        <div
          style={{
            paddingBottom: 120,
            paddingTop: 120,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            ifClose={true}
            formContent={
              <div>
                <form onSubmit={handleUpdateProfile}>
                  <h2 className="vw-text" style={{ fontSize: 32 }}>
                    Update your Profile to serve you better
                  </h2>

                  <div className="vw">
                    <h2 className="vw-text" style={{ fontSize: 18 }}>
                      Your <span style={{ color: "#C19F62" }}>Username 📲</span>
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      className="input-field"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="vw">
                    <h2 className="vw-text" style={{ fontSize: 18 }}>
                      Your <span style={{ color: "#C19F62" }}>Address 🏡</span>
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
                    <h2 className="vw-text" style={{ fontSize: 18 }}>
                      Your{" "}
                      <span style={{ color: "#C19F62" }}>Phone Number 📲</span>
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
                  <div className="vw">
                    <h2 className="vw-text" style={{ fontSize: 18 }}>
                      Update Profile Picture
                    </h2>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{
                        backgroundColor: "#C19F6217",
                        color: "#C19F62",
                        padding: 24,
                        border: `2px solid #C19F6245`,
                      }}
                    />
                    {imageUrl && (
                      <img
                        src={imageUrl} // Changed from user?.avatar to user?.imageUrl
                        alt="User Avatar"
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: "50%",
                          alignSelf: "center",
                          marginBottom: "20px",
                        }}
                      />
                    )}
                  </div>
                  <br />
                  <div
                    style={{
                      cursor: "pointer",
                      marginTop: 40,
                      marginBottom: 96,
                    }}
                  >
                    <button className="btn-auth" type="submit">
                      {isLoading ? "Loading...... " : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            }
          />
          <Modal
            isOpen={modalOpenUpdate}
            onClose={() => setModalOpenUpdate(false)}
            //ifClose={true}
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
                      <span style={{ color: "#C19F62" }}>
                        {" "}
                        Phone Number 📲{" "}
                      </span>
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
          <Modal
            isOpen={modalOpenLogoOut}
            onClose={() => setModalOpenLogoOut(true)}
            ifClose={true}
            formContent={
              <div>
                <form onSubmit={handleUpdateProfile}>
                  <h2 className="vw-text" style={{ fontSize: 32 }}>
                    Confirm you want to log out
                  </h2>

                  <div
                    style={{
                      cursor: "pointer",
                      marginTop: 40,
                      marginBottom: 96,
                    }}
                  >
                    <button onClickclassName="btn-auth" type="submit">
                      {isLoading ? "Loading...... " : "Log Out"}
                    </button>
                  </div>
                </form>
              </div>
            }
          />

          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <>
              {user?.imageUrl ? (
                <img
                  src={user?.imageUrl} // Changed from user?.avatar to user?.imageUrl
                  alt="User Avatar"
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 120000,
                    marginBottom: "20px",
                  }}
                />
              ) : (
                <img
                  src={profilePic} // Changed from user?.avatar to user?.imageUrl
                  alt="User Avatar"
                  style={{
                    width: 200,
                    height: 220,
                    borderRadius: 12,
                    marginBottom: "20px",
                  }}
                />
              )}
              <h2 style={{ marginBottom: "-4px" }}>{formattedUsername}</h2>
              <p
                style={{
                  marginBottom: "20px",
                  color: "#C19F62",
                  backgroundColor: "#C19F6217",
                  width: "fit-content",
                  padding: 12,
                  borderRadius: 24,
                  alignSelf: "center",
                  cursor: "pointer",
                }}
                onClick={openModal}
              >
                <MdEdit /> Edit
              </p>
            </>
          </div>
          <div
            style={{
              // backgroundColor: "#C19F6217",
              padding: "20px",
              borderRadius: "10px",
              //  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Contact Information</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#C19F62",
                color: "#fff",
                paddingLeft: 16,
                borderRadius: 16,
              }}
            >
              <FaEnvelope style={{ marginRight: "10px", color: "#fff" }} />
              <p>{user?.email}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#C19F62",
                color: "#fff",
                paddingLeft: 16,
                borderRadius: 16,
              }}
            >
              <FaMapMarkerAlt style={{ marginRight: "10px", color: "#fff" }} />
              <p>{user?.address}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#C19F62",
                color: "#fff",
                paddingLeft: 16,
                borderRadius: 16,
              }}
            >
              <FaPhone style={{ marginRight: "10px", color: "#fff" }} />
              <p>{user?.phoneNumber}</p>
            </div>
          </div>
          <div
            style={{
              //backgroundColor: "#C19F6230",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Additional Information</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#C19F62",
                color: "#fff",
                paddingLeft: 16,
                borderRadius: 16,
              }}
            >
              <FaUser style={{ marginRight: "10px", color: "#fff" }} />
              <p>Joined Date: {formatDate(user?.createdAt)}</p>
            </div>

            <div
              style={{
                cursor: "pointer",
                padding: 16,
                borderRadius: 24,
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                backgroundColor: "#C19F62",
                color: "#fff",
                paddingLeft: 16,
                borderRadius: 16,
                // backgroundColor: "#C19F6245",
                // color: "#C19F6230",
              }}
              onClick={handleLogout}
            >
              <MdLogout style={{ marginRight: "10px", color: "#fff" }} />
              <span>Log Out</span>
            </div>
          </div>

          {/* {rating ? (
            <>
              <br /> <br />
              <h1 style={{ margin: 0, fontSize: 18, marginTop: 64 }}>
                Your Ratings
              </h1>
              <RatingGrid ratings={rating} />
            </>
          ) : null} */}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
