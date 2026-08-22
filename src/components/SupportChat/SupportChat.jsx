import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import "./SupportChat.css";

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hello! I am the Weather App assistant. How can I help you?",
    },
  ]);

  const getBotAnswer = (text) => {
    const value = text.toLowerCase();

    if (
      value.includes("city") ||
      value.includes("search") ||
      value.includes("місто") ||
      value.includes("город")
    ) {
      return "🔎 To check the weather, enter the city name in the search field and select the city you need.";
    }

    if (
      value.includes("location") ||
      value.includes("gps") ||
      value.includes("місцезнаходження") ||
      value.includes("геолока")
    ) {
      return "📍 You can use your current location. Please allow location access in your browser.";
    }

    if (
      value.includes("forecast") ||
      value.includes("прогноз")
    ) {
      return "🌤️ The app shows the current weather and forecast for the selected city.";
    }

    if (
      value.includes("temperature") ||
      value.includes("температур")
    ) {
      return "🌡️ The temperature is displayed for the currently selected city.";
    }

    if (
      value.includes("wind") ||
      value.includes("вітер") ||
      value.includes("ветер")
    ) {
      return "💨 Wind information is available in the weather details section.";
    }

    if (
      value.includes("humidity") ||
      value.includes("волог") ||
      value.includes("влаж")
    ) {
      return "💧 Humidity is displayed together with other weather information.";
    }

    if (
      value.includes("language") ||
      value.includes("мов") ||
      value.includes("язык")
    ) {
      return "🌍 You can change the website language using the language selector in the header.";
    }

    if (
      value.includes("data") ||
      value.includes("open-meteo") ||
      value.includes("api")
    ) {
      return "📊 Weather information is provided by the Open-Meteo weather service.";
    }

    if (
      value.includes("hello") ||
      value.includes("hi") ||
      value.includes("привіт") ||
      value.includes("привет")
    ) {
      return "👋 Hello! Ask me anything about using the Weather App.";
    }

    if (
      value.includes("thanks") ||
      value.includes("thank you") ||
      value.includes("дякую") ||
      value.includes("спасибо")
    ) {
      return "😊 You're welcome! If you have another question, just ask.";
    }

    return "🤔 I couldn't find an answer to that question. Try asking about city search, forecast, location, temperature, wind, humidity or language.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotAnswer(currentMessage),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div className="support-chat">
          <div className="support-chat__header">
            <div>
              <h3>Weather Assistant</h3>
              <p>
                <span className="online-dot"></span>
                Online
              </p>
            </div>

            <button
              className="support-chat__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </div>

          <div className="support-chat__body">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`chat-row ${
                  item.sender === "user"
                    ? "chat-row--user"
                    : "chat-row--bot"
                }`}
              >
                <div
                  className={`chat-message ${
                    item.sender === "user"
                      ? "chat-message--user"
                      : "chat-message--bot"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="support-chat__footer">
            <input
              type="text"
              placeholder="Ask a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={sendMessage}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}

      <button
        className="support-chat__button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open support chat"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </>
  );
}