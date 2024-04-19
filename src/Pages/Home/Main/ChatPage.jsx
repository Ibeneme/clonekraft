import React, { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (message) => {
    // Add user's message to the messages state
    setMessages([...messages, { sender: "user", text: message }]);

    // Clear the input field if it's not empty
    if (message.trim() !== "") {
      document.getElementById("chat-input").value = "";
    }

    // Simulate bot's response after a delay
    if (message.trim() !== "") {
      // // setTimeout(() => {
      // //   // Add bot's response to the messages state
      // //   setMessages([
      // //     ...messages,
      // //     { sender: "bot", text: "This is a text chat" }
      // //   ]);
      // // }, 500); // Simulating a delay for the bot's response
    }
  };

  // Filter messages to display only user's messages
  const userMessages = messages.filter((message) => message.sender === "user");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "70px 24px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 24px",
          maxWidth: 400,
          alignItems: "center",
        }}
      >
        <h2>Chat with CloneKraft</h2>
        <div
          style={{
            height: "300px",
            border: "1px solid #ccc",
            padding: "10px",
            width: 300,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto", // Changed overflowY to auto
          }}
        >
          {userMessages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                textAlign: "right",
                color: "#007bff",
                backgroundColor: "#007bff17",
                alignItems: "flex-end",
                alignSelf: "flex-end",
                padding: "10px",
                width: "fit-content",
                borderRadius: 12,
                maxWidth: 200,
              }}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input
          id="chat-input"
          className="input-field"
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
          style={{ marginTop: "10px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default ChatPage;
