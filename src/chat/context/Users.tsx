import React, { useState, useEffect } from "react";
import { useSocket } from "./useSocket";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  updated_at: string;
  seen: boolean;
  lastMessage: string;
}
interface Message {
  message: string;
  timeSent: string; // Assuming timeSent is a string representing the timestamp
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { socket } = useSocket();
  const [userId, setUserId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false); // State to track typing status
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      //setUsers(data);
      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect to fetch users
  useEffect(() => {
    fetchUsers();
    fetchMessages(userId)
  }, []);

  // useEffect for handling user data and typing status
  useEffect(() => {
    const handleUserData = (userData: User[]) => {
      // Sort the user data based on the updated_at timestamp
      const sortedUserData = userData.sort((a, b) => {
        const dateA = new Date(a?.updated_at)?.getTime();
        const dateB = new Date(b?.updated_at)?.getTime();
        return dateB - dateA; // Sort in descending order (most recent first)
      });
      setUsers(sortedUserData);
      console.log(sortedUserData, "sortedUserData");
    };

    const handleIsTyping = (userId: string) => {
      console.log("isTyping isTyping:", userId);
      setIsTyping(true);
    };

    socket.on("userData", handleUserData);
    socket.on("isTyping", handleIsTyping);

    return () => {
      socket.off("userData", handleUserData);
      socket.off("isTyping", handleIsTyping);
    };
  }, [socket]);

  // useEffect for handling received messages
  useEffect(() => {
    const handleMessageFromServer = (data: string) => {
      fetchUsers();
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("messageFromServer", handleMessageFromServer);

    return () => {
      socket.off("messageFromServer", handleMessageFromServer);
    };
  }, [socket]);

  // useEffect for handling incoming messages
  useEffect(() => {
    const handleMessage = (message: string) => {
      console.log(message, "receivedMessages");
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  // useEffect for handling typing and stopped typing events
  useEffect(() => {
    const handleTyping = () => {
      socket.emit("typing", userId);
      console.log("typing", userId);
      setIsTyping(true);
    };

    const handleStopTyping = () => {
      socket.emit("stoppedTyping", userId);
      setIsTyping(false);
    };

    const inputField = document.getElementById("message-input");
    inputField?.addEventListener("input", handleTyping);
    inputField?.addEventListener("blur", handleStopTyping);

    return () => {
      inputField?.removeEventListener("input", handleTyping);
      inputField?.removeEventListener("blur", handleStopTyping);
    };
  }, [userId, socket]);

  const handleSubmitUserId = (userId: string) => {
    console.log(userId, "userId");
    setUserId(userId);
    fetchMessages(userId)
    if (userId.trim() !== "") {
      socket.emit("joinRoom", userId);
      localStorage.setItem("touchpfy_chat_user", userId);
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  let messageSent = false;

  const sendMessage = () => {
    if (!messageSent && message.trim() !== "") {
      const name = "names";
      socket.emit("messages", userId, message);
      console.log(message, userId, name, "sent to server");
      setMessage("");
      messageSent = true;
    }
  };

  // Function to fetch messages for a given user ID
  const fetchMessages = (userId: string) => {
    console.log(userId, 'lllll')
    axios
      .get(`http://localhost:3000/messages/${userId}`)
      .then((response) => {
        console.log(response, "responseresponseresponse");
        const messages = response?.data;
        if (messages) {
          setFetchedMessages(messages);
          // setReceivedMessages(messages); // Set received messages state
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };
  const formatTimeSent = (time: string): string => {
    const currentTime = new Date();
    const sentTime = new Date(time);
    const diff = currentTime.getTime() - sentTime.getTime();

    // Define time intervals in milliseconds
    const intervals: Record<string, number> = {
      year: 31536000000,
      month: 2592000000,
      week: 604800000,
      day: 86400000,
      hour: 3600000,
      minute: 60000,
      second: 1000,
    };

    // Calculate the difference in each time interval
    for (const [unit, milliseconds] of Object.entries(intervals)) {
      const unitDiff = Math.floor(diff / milliseconds);
      if (unitDiff > 0) {
        return unitDiff === 1 ? `1 ${unit} ago` : `${unitDiff} ${unit}s ago`;
      }
    }

    return "Just now";
  };

  return (
    <div style={{ display: "flex" }}>
      <ul>
        {users?.map((user) => (
          <li key={user?._id} onClick={() => handleSubmitUserId(user._id)}>
            <strong>{user?.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
      <div>
        <div>
          <input
            id="message-input"
            type="text"
            value={message}
            onChange={handleMessageChange}
          />
          <button onClick={sendMessage}>Send</button>
          {isTyping && <p>Someone is typing...</p>}
        </div>
        <div>
          <h2>Received Messages:</h2>
          {fetchedMessages.map((msg, index) => (
            <div key={index}>
              <p>{msg.message}</p>
              <p>{formatTimeSent(msg.timeSent)}</p> {/* Format the timeSent */}
            </div>
          ))}
          {receivedMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
