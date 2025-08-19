import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

let stompClient = null;

function App() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = over(socket);
    stompClient.connect({}, () => {
      setConnected(true);
      stompClient.subscribe("/topic/messages", (msg) => {
        const received = JSON.parse(msg.body);
        setMessages((prev) => [...prev, received]);
      });
    });
  };

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage = { from: username, text: message };
      stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center mt-20">
        <h2>Enter your name to join chat</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={connect}>Join</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Chat Room</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.from}: </b> {m.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
