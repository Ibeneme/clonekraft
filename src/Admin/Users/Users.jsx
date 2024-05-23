import React, { useState, useEffect } from "react";
import { getUsers } from "../../Redux/admin/admin";
import { useDispatch } from "react-redux";
import "./user.css";
import Navbar from "../Navbar/Navbar";
import { formatDate } from "../../Pages/Home/Main/Profile";

const User = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch users from Redux store
    const fetchUsers = () => {
      dispatch(getUsers())
        .then((response) => {
          console.log("profile successful:", response);
          setUsers(response?.payload);
        })
        .catch((error) => {
          console.log("Profile fetch failed:", error);
        });
    };

    // Call fetchUsers function
    fetchUsers();

    // Retrieve clone_kraft_admin_user from localStorage
    const adminUser = JSON.parse(
      localStorage.getItem("clone_kraft_admin_user")
    );
    if (adminUser) {
      console.log("Admin User:", adminUser);
      setAdmin(adminUser);
    }
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        paddingTop: 100,
      }}
    >
      <div className="user-list">
        <h3
          className="user-card"
          style={{
            backgroundColor: "#f4f4f4",
            margin: 0,
            padding: 0,
            marginTop: 48,
          }}
        >
          Hi, {admin?.fullname}
        </h3>
        <p
          style={{
            backgroundColor: "#f4f4f4",
            margin: 0,
            fontSize: 12,
            color: "#808080",
            padding: 0,
            marginTop: -16,
            marginBottom: 24,
          }}
          className="user-card"
        >
          {admin?.adminEmail}
        </p>
      </div>

      <div className="user-list">
        {users?.map((user) => (
          <div key={user?._id} className="user-card">
            <img src={user?.imageUrl} alt={user?.username} />
            <div>
              <h3 className="user-h2">{user?.username}</h3>
              <p className="user-email">
                {user?.email || formatDate(user?.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
