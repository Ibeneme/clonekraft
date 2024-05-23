import React, { useState, useEffect } from "react";
import { useSocket } from "./useSocket";

const Home: React.FC = () => {
  const { socket } = useSocket();
  const [userId, setUserId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleMessage = (message: string) => {
      console.log(message, "receivedMessages");
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitUserId = () => {
    // Check if user ID is valid
    if (userId.trim() !== "") {
      // Emit the user ID to join the group
      socket.emit("joinRoom", userId);
      // Save user ID to localStorage
      localStorage.setItem("touchpfy_chat_user", userId);
      // Close the modal
      setModalVisible(false);
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  let messageSent = false;

  const sendMessage = () => {
    if (!messageSent && message.trim() !== "") {
      // Send the message to the server
      const  name = 'names'
      socket.emit("messages", userId, message , name);
      console.log(message, "sent to server");
      setMessage("");
      messageSent = true;
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Enter your User ID:</h2>
            <input type="text" value={userId} onChange={handleUserIdChange} />
            <button onClick={handleSubmitUserId}>Submit</button>
          </div>
        </div>
      )}

      {/* Display input field for sending messages */}
      <div>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Display received messages */}
      <div>
        <h2>Received Messages:</h2>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
