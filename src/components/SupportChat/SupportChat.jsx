import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext.jsx";
import { supportAnswers } from "./supportAnswers.js";

import "./SupportChat.css";

export default function SupportChat() {
  const { language } = useLanguage();

  const text = {
    en: {
      title: "Weather Assistant",
      online: "Online",
      placeholder: "Ask a question...",
      hello: "👋 Hello! I can help you with questions about this Weather App.",
      unknown:
        "🤔 I don't have an exact answer yet. Try asking about weather, city search, forecast, location, temperature, wind, humidity or website features.",
    },

    uk: {
      title: "Помічник погоди",
      online: "Онлайн",
      placeholder: "Напишіть запитання...",
      hello: "👋 Привіт! Я можу допомогти з питаннями про цей Weather App.",
      unknown:
        "🤔 Я поки не маю точної відповіді. Спробуйте запитати про погоду, пошук міста, прогноз, геолокацію, температуру, вітер, вологість або функції сайту.",
    },

    de: {
      title: "Wetter-Assistent",
      online: "Online",
      placeholder: "Frage stellen...",
      hello: "👋 Hallo! Ich kann dir bei Fragen zu dieser Weather App helfen.",
      unknown:
        "🤔 Ich habe darauf noch keine genaue Antwort. Frage nach Wetter, Stadtsuche, Vorhersage, Standort, Temperatur, Wind, Luftfeuchtigkeit oder Website-Funktionen.",
    },

    ru: {
      title: "Помощник погоды",
      online: "Онлайн",
      placeholder: "Задайте вопрос...",
      hello: "👋 Привет! Я могу помочь с вопросами об этом Weather App.",
      unknown:
        "🤔 У меня пока нет точного ответа. Попробуйте спросить о погоде, поиске города, прогнозе, геолокации, температуре, ветре, влажности или функциях сайта.",
    },
  };

  const quickQuestions = {
    en: [
      "Weather forecast",
      "My location",
      "Temperature",
      "Wind",
      "Humidity",
      "Change language",
      "Will it rain today?",
      "What does feels like mean?",
      "What is air pressure?",
      "What is UV index?",
      "Why is weather not loading?",
      "Where does weather data come from?",
    ],
  
    uk: [
      "Прогноз погоди",
      "Моє місцезнаходження",
      "Температура",
      "Вітер",
      "Вологість",
      "Змінити мову",
      "Чи буде сьогодні дощ?",
      "Що означає відчувається як?",
      "Що таке атмосферний тиск?",
      "Що таке UV-індекс?",
      "Чому не завантажується погода?",
      "Звідки беруться дані про погоду?",
    ],
  
    de: [
      "Wettervorhersage",
      "Mein Standort",
      "Temperatur",
      "Wind",
      "Luftfeuchtigkeit",
      "Sprache ändern",
      "Wird es heute regnen?",
      "Was bedeutet gefühlte Temperatur?",
      "Was ist Luftdruck?",
      "Was ist der UV-Index?",
      "Warum lädt das Wetter nicht?",
      "Woher kommen die Wetterdaten?",
    ],
  
    ru: [
      "Прогноз погоды",
      "Моё местоположение",
      "Температура",
      "Ветер",
      "Влажность",
      "Изменить язык",
      "Будет ли сегодня дождь?",
      "Что значит ощущается как?",
      "Что такое атмосферное давление?",
      "Что такое UV-индекс?",
      "Почему не загружается погода?",
      "Откуда берутся данные о погоде?",
    ],
  };

  const translatedAnswers = {
    uk: {
      city: "🔎 Щоб знайти місто, введіть його назву в поле пошуку та виберіть потрібний результат.",

      forecast: "🌤️ Виберіть місто, щоб побачити поточну погоду та прогноз.",

      location:
        "📍 Дозвольте браузеру доступ до геолокації, щоб використати поточне місцезнаходження.",

      temperature: "🌡️ Температура показується для вибраного міста.",

      wind: "💨 Швидкість та напрямок вітру показуються в деталях погоди.",

      humidity: "💧 Вологість показує кількість вологи у повітрі.",

      rain: "🌧️ Інформацію про дощ можна побачити у прогнозі погоди.",

      snow: "❄️ Якщо очікується сніг, це буде показано у прогнозі.",

      pressure: "🌡️ Атмосферний тиск показує тиск повітря.",

      language:
        "🌍 Мову сайту можна змінити через перемикач мов у верхній частині сайту.",

      error: "⚠️ Перевірте інтернет-з'єднання та оновіть сторінку.",

      openMeteo: "📊 Дані про погоду надає сервіс Open-Meteo.",

      mobile: "📱 Сайт адаптований для телефонів, планшетів та комп'ютерів.",
    },

    ru: {
      city: "🔎 Чтобы найти город, введите его название в поле поиска и выберите нужный результат.",

      forecast: "🌤️ Выберите город, чтобы увидеть текущую погоду и прогноз.",

      location:
        "📍 Разрешите браузеру доступ к геолокации, чтобы использовать текущее местоположение.",

      temperature: "🌡️ Температура отображается для выбранного города.",

      wind: "💨 Скорость и направление ветра отображаются в деталях погоды.",

      humidity: "💧 Влажность показывает количество влаги в воздухе.",

      rain: "🌧️ Информацию о дожде можно посмотреть в прогнозе.",

      snow: "❄️ Если ожидается снег, это будет показано в прогнозе.",

      pressure: "🌡️ Атмосферное давление показывает давление воздуха.",

      language:
        "🌍 Язык сайта можно изменить через переключатель языков в верхней части сайта.",

      error: "⚠️ Проверьте интернет-соединение и обновите страницу.",

      openMeteo: "📊 Данные о погоде предоставляет сервис Open-Meteo.",

      mobile: "📱 Сайт адаптирован для телефонов, планшетов и компьютеров.",
    },

    de: {
      city: "🔎 Gib den Namen der Stadt in das Suchfeld ein und wähle das passende Ergebnis.",

      forecast:
        "🌤️ Wähle eine Stadt aus, um das aktuelle Wetter und die Vorhersage zu sehen.",

      location:
        "📍 Erlaube deinem Browser den Standortzugriff, um deinen aktuellen Standort zu verwenden.",

      temperature:
        "🌡️ Die Temperatur wird für die ausgewählte Stadt angezeigt.",

      wind: "💨 Windgeschwindigkeit und Windrichtung werden in den Wetterdetails angezeigt.",

      humidity:
        "💧 Die Luftfeuchtigkeit zeigt den Feuchtigkeitsgehalt der Luft.",

      rain: "🌧️ Regeninformationen findest du in der Wettervorhersage.",

      snow: "❄️ Erwarteter Schnee wird in der Wettervorhersage angezeigt.",

      pressure: "🌡️ Der Luftdruck beschreibt den atmosphärischen Druck.",

      language:
        "🌍 Die Sprache kannst du über die Sprachauswahl im Header ändern.",

      error: "⚠️ Überprüfe deine Internetverbindung und lade die Seite neu.",

      openMeteo: "📊 Die Wetterdaten werden von Open-Meteo bereitgestellt.",

      mobile:
        "📱 Die Website ist für Smartphone, Tablet und Desktop optimiert.",
    },
  };

  const t = text[language] || text.en;

  const currentQuickQuestions = quickQuestions[language] || quickQuestions.en;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getBotAnswer = (userText) => {
    const value = userText.toLowerCase();

    const commonCategories = [
      {
        words: [
          "city",
          "місто",
          "город",
          "stadt",
          "search",
          "пошук",
          "поиск",
          "suchen",
        ],
        key: "city",
      },

      {
        words: [
          "forecast",
          "прогноз",
          "vorhersage",
          "tomorrow",
          "завтра",
          "morgen",
        ],
        key: "forecast",
      },

      {
        words: [
          "location",
          "geolocation",
          "gps",
          "геолока",
          "місцезнаходження",
          "местоположение",
          "standort",
        ],
        key: "location",
      },

      {
        words: ["temperature", "температур", "temperatur", "degrees", "градус"],
        key: "temperature",
      },

      {
        words: ["wind", "вітер", "ветер"],
        key: "wind",
      },

      {
        words: ["humidity", "волог", "влаж", "luftfeuchtigkeit"],
        key: "humidity",
      },

      {
        words: ["rain", "дощ", "дожд", "regen"],
        key: "rain",
      },

      {
        words: ["snow", "сніг", "снег", "schnee"],
        key: "snow",
      },

      {
        words: ["pressure", "тиск", "давление", "luftdruck"],
        key: "pressure",
      },

      {
        words: [
          "language",
          "change language",
          "мова",
          "мову",
          "змінити мову",
          "язык",
          "изменить язык",
          "sprache",
          "sprache ändern",
        ],
        key: "language",
      },

      {
        words: [
          "error",
          "помилка",
          "ошибка",
          "fehler",
          "not working",
          "не працює",
          "не работает",
        ],
        key: "error",
      },

      {
        words: [
          "open-meteo",
          "open meteo",
          "weather data",
          "дані",
          "данные",
          "wetterdaten",
        ],
        key: "openMeteo",
      },

      {
        words: [
          "mobile",
          "phone",
          "телефон",
          "мобіль",
          "handy",
          "tablet",
          "планшет",
        ],
        key: "mobile",
      },
    ];

    for (const category of commonCategories) {
      const found = category.words.some((word) => value.includes(word));

      if (found) {
        if (language !== "en" && translatedAnswers[language]?.[category.key]) {
          return translatedAnswers[language][category.key];
        }

        break;
      }
    }

    const answers =
      supportAnswers[language]?.length > 0
        ? supportAnswers[language]
        : supportAnswers.en;

    for (const item of answers) {
      const found = item.keywords.some((keyword) =>
        value.includes(keyword.toLowerCase())
      );

      if (found) {
        return item.answer;
      }
    }

    return t.unknown;
  };

  const sendQuestion = (question) => {
    const currentMessage = question.trim();

    if (!currentMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotAnswer(currentMessage),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  const sendMessage = () => {
    const currentMessage = inputValue.trim();

    if (!currentMessage) return;

    setInputValue("");

    sendQuestion(currentMessage);
  };

  const sendQuickQuestion = (question) => {
    sendQuestion(question);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div className="support-chat">
          <div className="support-chat__header">
            <div>
              <h3>{t.title}</h3>

              <p>
                <span className="online-dot"></span>
                {t.online}
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
            <div className="chat-row chat-row--bot">
              <div className="chat-message chat-message--bot">{t.hello}</div>
            </div>

            {messages.length === 0 && (
              <div className="quick-questions">
                {currentQuickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="quick-question"
                    onClick={() => sendQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {messages.map((item) => (
              <div
                key={item.id}
                className={`chat-row ${
                  item.sender === "user" ? "chat-row--user" : "chat-row--bot"
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
              value={inputValue}
              placeholder={t.placeholder}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
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
        aria-label="Support chat"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </>
  );
}
