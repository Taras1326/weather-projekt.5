import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const languageNames = {
      uk: "Ukrainian",
      ru: "Russian",
      de: "German",
      en: "English",
    };

    const currentLanguage =
      languageNames[language] || "English";

    const response = await openai.responses.create({
      model: "gpt-5.6",

      instructions: `
You are a friendly support assistant integrated into a weather website.

The website allows users to:
- search weather by city
- see current weather
- see weather forecast
- see temperature
- see humidity
- see wind information
- use geolocation
- change website language
- view weather information provided by Open-Meteo

The interface supports:
- English
- Ukrainian
- German
- Russian

Current website language: ${currentLanguage}.

Rules:
- Answer clearly and briefly.
- Prefer the language the user writes in.
- If the user asks about this weather website, help them use it.
- You may also answer normal general questions.
- Do not pretend to know private information about the user.
- If you do not know something, say so.
- Keep answers suitable for a small support-chat window.
`,

      input: message,
    });

    res.json({
      answer:
        response.output_text ||
        "I couldn't generate an answer.",
    });
  } catch (error) {
    console.error("OpenAI error:", error);

    res.status(500).json({
      error: "AI assistant is temporarily unavailable.",
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `AI server running on http://localhost:${PORT}`
  );
});