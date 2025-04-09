// pages/chat.js
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  // Each message now includes text, sender, and a timestamp.
  const [messages, setMessages] = useState([]);
  // Track whether the chat has started.
  const [chatStarted, setChatStarted] = useState(false);
  const chatRef = useRef(null);

  // Request browser notification permission on mount.
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Initialize Socket.IO and set up incoming message handling.
  useEffect(() => {
    fetch("/api/socket").finally(() => {
      socket = io();

      socket.on("connect", () => {
        console.log("Connected with id:", socket.id);
      });

      socket.on("message", (msg) => {
        const newMsg = {
          text: msg,
          sender: "friend",
          time: new Date().toLocaleString(),
        };
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        // Trigger a push notification if permission is granted.
        if (Notification.permission === "granted") {
          new Notification("New Message", { body: msg });
        }
      });
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // Handle sending a message.
  const sendMessage = () => {
    if (message.trim() !== "") {
      if (!chatStarted) {
        setChatStarted(true);
      }
      const timeStamp = new Date().toLocaleString();
      const newMsg = { text: message, sender: "you", time: timeStamp };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      socket.emit("message", message);
      setMessage("");
    }
  };

  // Send message if the user presses Enter.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Scroll smoothly to the chat section.
  const scrollToChat = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Overall container style.
  const containerStyle = {
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  };

  // Landing Section Styles (displayed only until chatting starts).
  const landingStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#1E1E1E",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    animation: "fadeIn 1.5s ease",
    marginBottom: "20px",
    textAlign: "center",
  };

  const landingTitleStyle = {
    color: "#FF5C5C",
    fontSize: "28px",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const landingMessageStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const landingButtonStyle = {
    padding: "12px 25px",
    backgroundColor: "#FF5C5C",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  };

  // Chat Section Styles.
  const chatContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#1E1E1E",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const chatHeaderStyle = {
    backgroundColor: "#FF5C5C",
    color: "#fff",
    padding: "18px",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const messagesContainerStyle = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#1E1E1E",
  };

  const inputContainerStyle = {
    display: "flex",
    borderTop: "1px solid #333",
  };

  const inputStyle = {
    flex: 1,
    padding: "15px 20px",
    border: "none",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#333",
    color: "#fff",
  };

  const buttonStyle = {
    padding: "15px 20px",
    backgroundColor: "#FF5C5C",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  // Message bubble styles with slideIn animation.
  const messageBubbleStyle = {
    maxWidth: "80%",
    padding: "12px 18px",
    borderRadius: "20px",
    lineHeight: "1.4",
    fontSize: "15px",
    wordBreak: "break-word",
    position: "relative",
    animation: "slideIn 0.5s ease",
  };

  // Your message style (aligned right).
  const yourMessageStyle = {
    ...messageBubbleStyle,
    backgroundColor: "#B22222",
    alignSelf: "flex-end",
    borderTopRightRadius: "0",
    color: "#fff",
  };

  // Friend's message style (aligned left).
  const friendMessageStyle = {
    ...messageBubbleStyle,
    backgroundColor: "#2C2C2C",
    border: "1px solid #FF5C5C",
    alignSelf: "flex-start",
    borderTopLeftRadius: "0",
    color: "#fff",
  };

  const timestampStyle = {
    fontSize: "10px",
    color: "#ccc",
    marginTop: "5px",
    textAlign: "right",
  };

  return (
    <div style={containerStyle}>
      {/* Landing section shows only before the chat starts */}
      {!chatStarted && (
        <div style={landingStyle}>
          <h2 style={landingTitleStyle}>My Dearest Love</h2>
          <p style={landingMessageStyle}>
            My dearest love, every moment spent with you is a treasure.
            Your smile lights up my world and fills my heart with unending joy.
            I am forever grateful for the laughter, the quiet moments, and the love we share.
            You are my inspiration, my comfort, and my eternal joy.
          </p>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src="https://via.placeholder.com/300x200"
              alt="Your Beauty"
              style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }}
            />
          </div>
          <button
            onClick={() => {
              setChatStarted(true);
              scrollToChat();
            }}
            style={landingButtonStyle}
          >
            Check Out What I Created
          </button>
        </div>
      )}

      {/* Chat section – rendered once chatting starts */}
      {chatStarted && (
        <div ref={chatRef} style={chatContainerStyle}>
          <div style={chatHeaderStyle}>I AM HERE FOR YOU, ALWAYS</div>
          <div style={messagesContainerStyle}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={msg.sender === "you" ? yourMessageStyle : friendMessageStyle}
              >
                <div>{msg.text}</div>
                <div style={timestampStyle}>{msg.time}</div>
              </div>
            ))}
          </div>
          <div style={inputContainerStyle}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={inputStyle}
            />
            <button onClick={sendMessage} style={buttonStyle}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Keyframe animations for fade and slide effects */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}