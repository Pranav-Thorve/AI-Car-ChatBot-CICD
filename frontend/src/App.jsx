import { useState } from "react";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "http://172.17.0.2:9000/infer";

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.answer || "No response" },
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2 className="title">CarBot 🚗</h2>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          placeholder="Ask about any car..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

