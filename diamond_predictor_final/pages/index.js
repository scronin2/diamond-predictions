import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to The Diamond Predictor! Ask me anything about today's MLB matchups, betting picks, or bankroll advice." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "Oops, something went wrong. Try again later." }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Head>
        <title>The Diamond Predictor</title>
      </Head>
      <h1 style={{ fontSize: 24, textAlign: "center" }}>The Diamond Predictor</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, maxHeight: 400, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
            <p style={{ backgroundColor: msg.sender === "bot" ? "#f0f0f0" : "#cce5ff", padding: 8, borderRadius: 4 }}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          placeholder="Ask about a matchup, pick, or unit sizing..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={loading} style={{ padding: "8px 16px", marginLeft: 8 }}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
