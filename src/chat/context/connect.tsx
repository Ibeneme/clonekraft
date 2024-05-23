import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "./useSocket";
import axios from "axios";
import "./connect.css";
import ModalSearch from "./Modal/ModalSearch";
import { BsChatFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

interface Message {
  message: string;
  senderEmail: string;
  timestamp?: string;
  seen?: boolean;
  timeSent?: any; // Assuming timeSent is a string representing the timestamp
}

const RealTimeComponent: React.FC = () => {
  const { socket } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false); // State to track typing status
  const [fetchedMessages, setFetchedMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Check if the user ID is already stored in local storage
    const userId = localStorage.getItem("touchpfy_chat_user");
    const email = localStorage.getItem("touchpfy_chat_email") || " ";
    if (userId) {
      // If user ID exists, create or join the room with that ID
      socket.emit("joinRoom", userId);
      setID(userId);
      setEmail(email);
      setEmailModalVisible(false);
      fetchMessages(userId); // Fetch messages for the user ID
    } else {
      // Display the email modal if the user ID is not found
      setEmailModalVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (newMessage: Message) => {
      console.log(newMessage, "llmessage");
      // const newMessagse = {
      //   message: message?.message,
      //   timestamp: new Date().toISOString(), // Get the current timestamp
      //   senderEmail: message?.senderEmail, // Assuming the sender is always Admin
      // };
      setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("message", handleMessage);

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    socket.on("isTyping", () => {
      setIsTyping(true);
    });
  }, []);

  useEffect(() => {
    // Function to emit typing event when user starts typing
    const handleTyping = () => {
      socket.emit("typing", ID); // Emit typing event with user ID
      setIsTyping(true); // Set typing status to true
    };

    // Function to emit stoppedTyping event when user stops typing
    const handleStopTyping = () => {
      socket.emit("stoppedTyping", ID); // Emit stoppedTyping event with user ID
      setIsTyping(false); // Set typing status to false
    };

    // Event listener for input field to detect typing
    const inputField = document.getElementById("message-input");
    inputField?.addEventListener("input", handleTyping);

    // Event listener for input field blur to detect stopped typing
    inputField?.addEventListener("blur", handleStopTyping);

    // Clean up event listeners when component unmounts
    return () => {
      inputField?.removeEventListener("input", handleTyping);
      inputField?.removeEventListener("blur", handleStopTyping);
    };
  }, [ID, socket]);

  // const handleCloseModal = () => {
  //   setEmailModalVisible(false);
  // };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmitEmail = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!fullName.trim()) {
      setEmailError("Please enter your full name");
      return;
    }

    // Make a POST request to the backend to create or retrieve user ID
    axios
      .post(`https://live-chat-server-ag.onrender.com/users/${email}`, {
        fullName: fullName,
      })
      .then((response) => {
        const userId = response?.data?.userId || response?.data?._id;
        if (userId) {
          localStorage.setItem("touchpfy_chat_user", userId);
          localStorage.setItem("touchpfy_chat_email", email);
          setEmailModalVisible(false);
          // Create or join the room with the user ID
          setID(userId);
          setEmail(response?.data?.email);
          socket.emit("joinRoom", userId);
          fetchMessages(userId); // Fetch messages for the user ID
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      console.log(email, "sss");
      socket.emit("messages", ID, message, email); // Emit message event with user ID and message content
      setMessage("");
    }
  };

  // Function to fetch messages for a given user ID
  const fetchMessages = (ID: string) => {
    axios
      .get(`https://live-chat-server-ag.onrender.com/messages/${ID}`)
      .then((response) => {
        const messages = response?.data;
        if (messages) {
          setFetchedMessages(messages);
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

  const [modalOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [fetchedMessages, receivedMessages]);

  return (
    <div className="chat-container">
      <ModalSearch
        isOpen={modalOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        formContent={
          <div className="chat">
            <div className="messages">
              {emailModalVisible ? (
                <div className="email-modal">
                  <h3 style={{ fontFamily: `var(--font-family)` }}>
                    Start a Chat with TouchPfy
                  </h3>
                  <br /> <br />
                  <div>
                    <p
                      style={{
                        fontSize: 16,
                        marginBottom: 0,
                        fontFamily: `var(--fontFamily)`,
                      }}
                    >
                      Enter your email
                    </p>
                    <input
                      type="email"
                      value={email}
                      placeholder="Enter your email address"
                      onChange={handleEmailChange}
                      className="inputss-forms"
                    />
                    <div>
                      <p
                        style={{
                          fontSize: 16,
                          marginBottom: 0,
                          fontFamily: `var(--fontFamily)`,
                        }}
                      >
                        Enter your Full Name:
                      </p>
                      <input
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        placeholder="Enter your email address"
                        className="inputss-forms"
                      />
                    </div>
                  </div>
                  {emailError && <p className="error">{emailError}</p>}
                  <button
                    className="btn-live-0chat"
                    onClick={handleSubmitEmail}
                  >
                    Submit
                  </button>
                  <p
                    style={{
                      color: "#ff6b00",
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 48,
                    }}
                  >
                    Chat by Antigravity
                  </p>
                </div>
              ) : (
                <>
                  <h4 style={{ fontFamily: `var(--font-family)` }}>
                    Chat with TouchPfy
                  </h4>{" "}
                  <br /> <br />
                  {fetchedMessages.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No messages selected</p>
                  ) : (
                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      ref={messagesEndRef}
                    >
                      {fetchedMessages.map((msg, index) => (
                        <div
                          className="message-item"
                          style={{
                            backgroundColor:
                              msg?.senderEmail !== "Admin"
                                ? "#ff6b0025"
                                : "#ff6b00",
                            color:
                              msg?.senderEmail !== "Admin" ? "#ff6b00" : "#fff",
                            alignSelf:
                              msg?.senderEmail !== "Admin"
                                ? "flex-end"
                                : "flex-start",
                          }}
                          key={index}
                        >
                          <p>{msg.message}</p>
                          <p className="message-item-time">
                            {formatTimeSent(msg.timeSent)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}{" "}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {receivedMessages.map((msg, index) => (
                      <div
                        className="message-item"
                        style={{
                          backgroundColor:
                            msg?.senderEmail === "Admin"
                              ? "#ff6b0025"
                              : "#ff6b00",
                          color:
                            msg?.senderEmail === "Admin" ? "#ff6b00" : "#fff",
                          alignSelf:
                            msg?.senderEmail === "Admin"
                              ? "flex-start"
                              : "flex-end",
                        }}
                        key={index}
                      >
                        <p>{msg.message}</p>
                        <p className="message-item-time">
                          {formatTimeSent(msg?.timeSent)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="input-area">
                    <div style={{ height: 40 }}>
                      {isTyping && (
                        <p className="typing-indicator">Typing...</p>
                      )}
                    </div>
                    <div className="input-container">
                      <input
                        id="message-input"
                        type="text"
                        value={message}
                        onChange={handleMessageChange}
                        className="message-input"
                        placeholder="Enter a Text"
                      />
                      <button onClick={sendMessage} className="send-button">
                        Send
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        }
      />

      <div
        style={{
          backgroundColor: "#ff6b00",
          padding: 16,
          borderRadius: 333,
          height: 24,
          width: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          zIndex: 40000,
          bottom: 24,
          right: 24,
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!modalOpen)} //
      >
        {!modalOpen ? (
          <BsChatFill color={"#fff"} fontSize={32} />
        ) : (
          <MdCancel color={"#fff"} fontSize={32} />
        )}
      </div>
    </div>
  );
};

export default RealTimeComponent;
