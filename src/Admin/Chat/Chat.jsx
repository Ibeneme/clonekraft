import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../../chat/context/useSocket";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin, getMessages } from "../../Redux/admin/admin";
import { RiSendPlane2Fill } from "react-icons/ri";
const Chat = () => {
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const [user, setUser] = useState("");
  const location = useLocation();
  const { order } = location.state || " ";

  const [fetchedMessages, setfetchedMessages] = useState([]);
  const [admin, setAdmin] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchMessages();
    handleFetchAdmin();
  }, []);

  const handleFetchMessages = () => {
    dispatch(getMessages(order?._id))
      .then((response) => {
        console.log("orders successful:", response);
        setfetchedMessages(response?.payload?.messages);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  const handleFetchAdmin = () => {
    dispatch(getAdmin())
      .then((response) => {
        console.log("orders admidndd:", response);
        setAdmin(response?.payload?.adminProfile);
        setUser(response?.payload?.adminProfile);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  const userId = admin?._id;
  const username = admin?.username;
  const chatContainerRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString();
      const messageWithTime = `[${currentTime}] ${message}`;
      // Send user ID, username, and message to the server
      socket.emit("messages", order?._id, {
        userId,
        username,
        message: message,
      });
      setMessage("");
    }
  };

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

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // Function to format the messages by date
  const currentTime =
    new Date()?.toLocaleTimeString()?.replace(/:\d+\s/, " ") || " "; // This will remove the seconds part

  const formatMessagesByDate = (messages) => {
    const formattedMessages = {};
    messages?.forEach((msg) => {
      const date = new Date(msg.timeSent);
      const formattedDate = date?.toDateString(); // Get the date string (e.g., "Mon May 17 2024")
      if (!formattedMessages[formattedDate]) {
        formattedMessages[formattedDate] = [];
      }
      formattedMessages[formattedDate]?.push(msg);
    });
    // Convert the object to an array
    return Object.entries(formattedMessages)?.map(([date, msgs]) => ({
      date,
      messages: msgs,
    }));
  };

  function formatDate(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const dateString = date.toLocaleDateString(undefined, options);
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return dateString.replace(/\b\d+\b/, day + suffix);
  }

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <div className="first-chat-div" style={{}}>
      <div className="chat-room" ref={chatContainerRef}>
        <h2 className="chat-room-h2"></h2>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fetchedMessages?.length === 0 && (
            <h3 className="chat-room-h2-date" style={{ textAlign: "center" }}>
              {formatDate(new Date()) || " "}
            </h3>
          )}
        </div>
        {formatMessagesByDate(fetchedMessages)?.map((dateGroup, index) => (
          <div key={index} className="chat-room-h2-div">
            <h3 className="chat-room-h2-date">{dateGroup.date}</h3>
            {dateGroup.messages.map((msg, msgIndex) => (
              <>
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
                        ? `24px 24px 24px 0`
                        : `24px 24px 0 024px`,
                    color: user?._id !== msg?.userId ? "white" : "#c19F62",
                    fontSize: 11,
                    width: "fit-content",
                    maxWidth: "70%",
                  }}
                >
                  <strong>
                    {user?._id !== msg?.userId
                      ? msg.username + " - Client"
                      : "You - Admin"}
                  </strong>

                  <br />
                  <p style={{ margin: 0, fontSize: 12 }}> {msg.message}</p>
                </p>

                <p
                  className={`${user?._id === msg?.userId ? "flex-end" : ""}`}
                  style={{ margin: 0, fontSize: 10, color: "#c19F62" }}
                >
                  {" "}
                  {msg?.timeSent
                    ? new Date(msg?.timeSent).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""}
                </p>
              </>
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
                    ? msg.username + " - Client"
                    : "You - Admin"}
                </strong>

                <br />
                <p style={{ margin: 0, fontSize: 12 }}> {msg.message}</p>
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
            style={{ padding: 16 }}
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
