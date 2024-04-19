import React from "react";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ProfilePage = () => {
  const user = {
    name: "Ibeneme Ikenna",
    email: "ibenemeikenna2021@gmail.com",
    address: "123 Main St, City, Country",
    phoneNumber: "+1234567890",
    avatar:
      "https://f005.backblazeb2.com/file/Webimages-used/pexels-pixabay-276583.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    joinedDate: "April 1, 2020",
  };

  return (
    <div
      style={{
        paddingBottom: 120,
        paddingTop: 120,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={user.avatar}
          alt="User Avatar"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />
        <h2 style={{ marginBottom: "10px" }}>{user.name}</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>{user.bio}</p>
      </div>
      <div
        style={{
          backgroundColor: "#007bff17",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Contact Information</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FaEnvelope style={{ marginRight: "10px", color: "#007bff" }} />
          <p style={{}}>{user.email}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FaMapMarkerAlt style={{ marginRight: "10px", color: "#007bff" }} />
          <p style={{}}>{user.address}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaPhone style={{ marginRight: "10px", color: "#007bff" }} />
          <p style={{}}>{user.phoneNumber}</p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#007bff17",
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
          }}
        >
          <FaUser style={{ marginRight: "10px", color: "#007bff" }} />
          <p style={{}}>Joined Date: {user.joinedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
