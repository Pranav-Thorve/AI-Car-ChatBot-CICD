import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // session list
  const [currentSessionIndex, setCurrentSessionIndex] = useState(null);
  const chatEndRef = useRef(null);

  const startNewSession = () => {
    setMessages([]);
    setCurrentSessionIndex(chatHistory.length);
    setChatHistory([
      ...chatHistory,
      { sessionName: "New Chat", messages: [] } // default name, will update after first message
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/generate-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      const botMessage = { type: "bot", text: data.text, audioUrl: `http://localhost:8000${data.audioUrl}` };
      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);

      // Update current session
      if (currentSessionIndex !== null) {
        const updatedHistory = [...chatHistory];
        updatedHistory[currentSessionIndex].messages = newMessages;

        // Set session name as first user message (max 30 chars)
        if (updatedHistory[currentSessionIndex].sessionName === "New Chat") {
          updatedHistory[currentSessionIndex].sessionName = input.length > 30 ? input.slice(0, 30) + "..." : input;
        }

        setChatHistory(updatedHistory);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { type: "bot", text: "Error contacting server" }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadSession = (index) => {
    setCurrentSessionIndex(index);
    setMessages(chatHistory[index].messages);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Chat History</h2>
        <button className="new-session-btn" onClick={startNewSession}>+ New Chat</button>
        <div className="history-list">
          {chatHistory.map((session, idx) => (
            <div
              key={idx}
              className={`history-item ${currentSessionIndex === idx ? "active" : ""}`}
              onClick={() => loadSession(idx)}
            >
              {session.sessionName}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`bubble ${msg.type}`}>
              <div>{msg.text}</div>
              {msg.audioUrl && <audio controls src={msg.audioUrl} className="audio-player" />}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
