import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../chat/context/useSocket";
import { useDispatch } from "react-redux";
import { getMessages } from "../../../Redux/admin/admin";
import { profile } from "../../../Redux/auth/auth";
import { RiSendPlane2Fill } from "react-icons/ri";

const Chat = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const chatContainerRef = useRef(null); // Ref for chat container

  const location = useLocation();
  const { order } = location.state || {};
  console.log(order, "order");

  const [fetchedMessages, setFetchedMessages] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleFetchMessages = () => {
    dispatch(getMessages(order?._id))
      .then((response) => {
        console.log("orders setFetchedMessages:", response);
        setFetchedMessages(response?.payload?.messages);
        setLoading(false);
        scrollToBottom(); // Scroll to bottom after fetching messages
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  const handleFetchUser = () => {
    dispatch(profile(order?._id))
      .then((response) => {
        console.log("usersss successful:", response);
        setUser(response?.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    handleFetchMessages();
    handleFetchUser();
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", order?._id);
    socket.on("message", (msg) => {
      console.log(msg, "msgmsg");
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom(); // Scroll to bottom when new message arrives
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("messages", order?._id, {
        userId: order?.userId,
        username: order?.username,
        message: message, // Add the current time to the message
      });
      setMessage("");
    }
  };

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Function to format the messages by date
  const currentTime =
    new Date()?.toLocaleTimeString()?.replace(/:\d+\s/, " ") || " "; // This will remove the seconds part

  const formatMessagesByDate = (messages) => {
    const formattedMessages = {};
    messages.forEach((msg) => {
      const date = new Date(msg.timeSent);
      const formattedDate = date.toDateString(); // Get the date string (e.g., "Mon May 17 2024")
      if (!formattedMessages[formattedDate]) {
        formattedMessages[formattedDate] = [];
      }
      formattedMessages[formattedDate].push(msg);
    });
    // Convert the object to an array
    return Object.entries(formattedMessages).map(([date, msgs]) => ({
      date,
      messages: msgs,
    }));
  };

  return (
    <div className="first-chat-div">
      <div className="chat-room" ref={chatContainerRef}>
        <h2 className="chat-room-h2"></h2>
        {/* Display fetched messages */}
        {formatMessagesByDate(fetchedMessages)?.map((dateGroup, index) => (
          <div key={index} className="chat-room-h2-div">
            <h3 className="chat-room-h2-date">{dateGroup.date}</h3>
            {dateGroup.messages.map((msg, msgIndex) => (
              <p
                key={msgIndex}
                className={`${user?._id === msg?.userId ? "flex-end" : ""}`}
                style={{
                  backgroundColor:
                    user?._id !== msg?.userId ? "#c19F62" : "#c19F6215",
                  padding: 12,
                  marginBottom: 4,
                  marginTop: 0,
                  borderRadius:
                    user?._id !== msg?.userId
                      ? `12px 12px 12px 0`
                      : `12px 12px 0 01 2px`,
                  color: user?._id !== msg?.userId ? "white" : "#c19F62",
                  fontSize: 11,
                  width: "fit-content",
                  maxWidth: "70%",
                }}
              >
                <strong>
                  {user?._id !== msg?.userId
                    ? msg.username + " - Admin"
                    : "You"}
                </strong>

                <br />
                <p style={{ margin: 0, fontSize: 14 }}> {msg.message}</p>
                <p style={{ margin: 0, fontSize: 10, textAlign: "left" }}>
                  {" "}
                  {msg?.timeSent
                    ? new Date(msg?.timeSent).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""}
                </p>
              </p>
            ))}
          </div>
        ))}

        {formatMessagesByDate(messages)?.map((dateGroup, index) => (
          <div key={index} className="chat-room-h2-div">
            {dateGroup.messages.map((msg, msgIndex) => (
              <p
                key={msgIndex}
                className={`${user?._id === msg?.userId ? "flex-end" : ""}`}
                style={{
                  backgroundColor:
                    user?._id !== msg?.userId ? "#c19F62" : "#c19F6215",
                  padding: 12,
                  marginBottom: 4,
                  marginTop: 0,
                  borderRadius:
                    user?._id !== msg?.userId
                      ? `12px 12px 12px 0`
                      : `12px 12px 0 01 2px`,
                  color: user?._id !== msg?.userId ? "white" : "#c19F62",
                  fontSize: 11,
                  width: "fit-content",
                  maxWidth: "70%",
                }}
              >
                <strong>
                  {user?._id !== msg?.userId
                    ? msg.username + " - Admin"
                    : "You"}
                </strong>

                <br />
                <p style={{ margin: 0, fontSize: 14 }}> {msg.message}</p>
                <p style={{ margin: 0, fontSize: 10, textAlign: "left" }}>
                  {currentTime}
                </p>
              </p>
            ))}
          </div>
        ))}

        <div
          className="message-input"
          style={{
            position: "fixed",
            bottom: 24,
          }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
            className="chat-input-box"
          />
          <button className="chat-input-btn" onClick={handleSendMessage}>
            <RiSendPlane2Fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
