import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiGrid,
  FiHelpCircle,
  FiPlay,
  FiRefreshCw,
  FiRotateCcw,
  FiSun,
  FiTarget,
  FiZap,
} from "react-icons/fi";

import { useLanguage } from "../context/LanguageContext.jsx";

import "./WeatherGame.css";

/* =========================================================
   HELPERS
========================================================= */

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getRandomPosition() {
  return {
    x: Math.random() * 80 + 10,
    y: Math.random() * 68 + 12,
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function WeatherGame({ onNavigate }) {
  const { language } = useLanguage();

  const [activeGame, setActiveGame] = useState("sun");

  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const text = {
    en: {
      back: "Back to weather",
      label: "WEATHER GAME CENTER",
      title: "Play with the weather.",
      subtitle:
        "Four mini games, personal records and a little break from checking the forecast.",

      bestScore: "Best score",
      gamesPlayed: "Games played",
      chooseGame: "Choose a game",

      play: "Play",
      restart: "Restart",
      playAgain: "Play again",
      score: "Score",
      time: "Time",
      best: "Best",
      moves: "Moves",
      lives: "Lives",
      points: "points",

      sunTitle: "Catch the Sun",
      sunShort: "Catch the sun before it moves away.",
      sunDescription:
        "You have 30 seconds. The sun gives +10 points. Clouds take away 5 points.",
      ready: "Are you ready?",
      sunReady:
        "Click the sun as quickly as possible. Avoid clicking the clouds.",
      newRecord: "🔥 New personal record!",
      gameOver: "Game over",

      memoryTitle: "Weather Memory",
      memoryShort: "Find all matching weather cards.",
      memoryDescription:
        "Turn over two cards at a time and find all matching weather symbols.",
      memoryReady: "Find all pairs using as few moves as possible.",
      pairs: "Pairs",
      completed: "Memory completed!",
      perfectMemory: "Excellent memory!",

      quizTitle: "Weather Quiz",
      quizShort: "Test your weather knowledge.",
      quizDescription:
        "Answer weather questions and see how many you can get right.",
      question: "Question",
      correct: "Correct!",
      wrong: "Wrong answer",
      quizFinished: "Quiz completed!",
      nextQuestion: "Next question",

      rainTitle: "Avoid the Rain",
      rainShort: "Move left and right and avoid the rain.",
      rainDescription:
        "Use the arrow keys or the buttons below. Survive as long as possible.",
      rainReady: "Move the umbrella left and right. You have three lives.",
      startRain: "Start survival",
      survived: "You survived",
      seconds: "seconds",
      keyboard: "Use ← → keyboard arrows",

      game01: "GAME 01",
      game02: "GAME 02",
      game03: "GAME 03",
      game04: "GAME 04",
    },

    de: {
      back: "Zurück zum Wetter",
      label: "WETTER-SPIELZENTRUM",
      title: "Spiele mit dem Wetter.",
      subtitle:
        "Vier Minispiele, persönliche Rekorde und eine kleine Pause vom Wetterbericht.",

      bestScore: "Bestes Ergebnis",
      gamesPlayed: "Gespielte Spiele",
      chooseGame: "Spiel auswählen",

      play: "Spielen",
      restart: "Neu starten",
      playAgain: "Nochmal spielen",
      score: "Punkte",
      time: "Zeit",
      best: "Beste",
      moves: "Züge",
      lives: "Leben",
      points: "Punkte",

      sunTitle: "Fang die Sonne",
      sunShort: "Fange die Sonne, bevor sie verschwindet.",
      sunDescription:
        "Du hast 30 Sekunden. Die Sonne gibt +10 Punkte, Wolken ziehen 5 ab.",
      ready: "Bist du bereit?",
      sunReady:
        "Klicke so schnell wie möglich auf die Sonne. Vermeide die Wolken.",
      newRecord: "🔥 Neuer persönlicher Rekord!",
      gameOver: "Spiel vorbei",

      memoryTitle: "Wetter-Memory",
      memoryShort: "Finde alle gleichen Wetterkarten.",
      memoryDescription:
        "Drehe zwei Karten gleichzeitig um und finde alle Wetterpaare.",
      memoryReady: "Finde alle Paare mit möglichst wenigen Zügen.",
      pairs: "Paare",
      completed: "Memory geschafft!",
      perfectMemory: "Sehr gutes Gedächtnis!",

      quizTitle: "Wetter-Quiz",
      quizShort: "Teste dein Wetterwissen.",
      quizDescription:
        "Beantworte Wetterfragen und sammle so viele Punkte wie möglich.",
      question: "Frage",
      correct: "Richtig!",
      wrong: "Falsche Antwort",
      quizFinished: "Quiz beendet!",
      nextQuestion: "Nächste Frage",

      rainTitle: "Regen vermeiden",
      rainShort: "Bewege dich und weiche dem Regen aus.",
      rainDescription:
        "Nutze die Pfeiltasten oder die Buttons. Halte so lange wie möglich durch.",
      rainReady:
        "Bewege den Regenschirm nach links und rechts. Du hast drei Leben.",
      startRain: "Überleben starten",
      survived: "Du hast überlebt",
      seconds: "Sekunden",
      keyboard: "Tastatur: ← →",

      game01: "SPIEL 01",
      game02: "SPIEL 02",
      game03: "SPIEL 03",
      game04: "SPIEL 04",
    },

    uk: {
      back: "Назад до погоди",
      label: "ЦЕНТР ПОГОДНИХ ІГОР",
      title: "Пограйся з погодою.",
      subtitle:
        "Чотири мініігри, особисті рекорди та невелика перерва від прогнозу погоди.",

      bestScore: "Найкращий результат",
      gamesPlayed: "Зіграно ігор",
      chooseGame: "Обери гру",

      play: "Грати",
      restart: "Почати заново",
      playAgain: "Грати ще раз",
      score: "Рахунок",
      time: "Час",
      best: "Рекорд",
      moves: "Ходи",
      lives: "Життя",
      points: "очок",

      sunTitle: "Спіймай сонечко",
      sunShort: "Лови сонечко, поки воно не втекло.",
      sunDescription:
        "У тебе 30 секунд. Сонечко дає +10 очок, а хмара забирає 5.",
      ready: "Готовий?",
      sunReady: "Натискай на сонечко якомога швидше. Уникай хмар.",
      newRecord: "🔥 Новий особистий рекорд!",
      gameOver: "Гру завершено",

      memoryTitle: "Погодна пам'ять",
      memoryShort: "Знайди всі однакові погодні картки.",
      memoryDescription:
        "Перевертай по дві картки та знаходь однакові погодні символи.",
      memoryReady: "Знайди всі пари за якомога меншу кількість ходів.",
      pairs: "Пари",
      completed: "Пам'ять пройдена!",
      perfectMemory: "Чудова пам'ять!",

      quizTitle: "Погодна вікторина",
      quizShort: "Перевір свої знання про погоду.",
      quizDescription:
        "Відповідай на погодні питання та набирай якомога більше балів.",
      question: "Питання",
      correct: "Правильно!",
      wrong: "Неправильна відповідь",
      quizFinished: "Вікторину завершено!",
      nextQuestion: "Наступне питання",

      rainTitle: "Уникай дощу",
      rainShort: "Рухайся вліво та вправо й уникай дощу.",
      rainDescription:
        "Використовуй стрілки клавіатури або кнопки. Протримайся якомога довше.",
      rainReady: "Рухай парасольку вліво та вправо. У тебе три життя.",
      startRain: "Почати виживання",
      survived: "Ти протримався",
      seconds: "секунд",
      keyboard: "Клавіатура: ← →",

      game01: "ГРА 01",
      game02: "ГРА 02",
      game03: "ГРА 03",
      game04: "ГРА 04",
    },

    ru: {
      back: "Назад к погоде",
      label: "ЦЕНТР ПОГОДНЫХ ИГР",
      title: "Поиграй с погодой.",
      subtitle:
        "Четыре мини-игры, личные рекорды и небольшой перерыв от прогноза погоды.",

      bestScore: "Лучший результат",
      gamesPlayed: "Сыграно игр",
      chooseGame: "Выбери игру",

      play: "Играть",
      restart: "Начать заново",
      playAgain: "Играть ещё раз",
      score: "Счёт",
      time: "Время",
      best: "Рекорд",
      moves: "Ходы",
      lives: "Жизни",
      points: "очков",

      sunTitle: "Поймай солнышко",
      sunShort: "Лови солнышко, пока оно не убежало.",
      sunDescription:
        "У тебя 30 секунд. Солнышко даёт +10 очков, облако забирает 5.",
      ready: "Готов?",
      sunReady: "Нажимай на солнышко как можно быстрее. Избегай облаков.",
      newRecord: "🔥 Новый личный рекорд!",
      gameOver: "Игра окончена",

      memoryTitle: "Погодная память",
      memoryShort: "Найди все одинаковые погодные карточки.",
      memoryDescription:
        "Переворачивай по две карточки и находи одинаковые символы.",
      memoryReady: "Найди все пары за минимальное количество ходов.",
      pairs: "Пары",
      completed: "Память пройдена!",
      perfectMemory: "Отличная память!",

      quizTitle: "Погодная викторина",
      quizShort: "Проверь свои знания о погоде.",
      quizDescription:
        "Отвечай на вопросы о погоде и набирай как можно больше баллов.",
      question: "Вопрос",
      correct: "Правильно!",
      wrong: "Неправильный ответ",
      quizFinished: "Викторина завершена!",
      nextQuestion: "Следующий вопрос",

      rainTitle: "Избегай дождя",
      rainShort: "Двигайся влево и вправо и избегай дождя.",
      rainDescription:
        "Используй стрелки клавиатуры или кнопки. Продержись как можно дольше.",
      rainReady: "Двигай зонтик влево и вправо. У тебя три жизни.",
      startRain: "Начать выживание",
      survived: "Ты продержался",
      seconds: "секунд",
      keyboard: "Клавиатура: ← →",

      game01: "ИГРА 01",
      game02: "ИГРА 02",
      game03: "ИГРА 03",
      game04: "ИГРА 04",
    },
  };

  const currentText = text[language] || text.en;

  /* =========================================================
     GLOBAL STATS
  ========================================================= */

  const [gamesPlayed, setGamesPlayed] = useState(() => {
    return Number(localStorage.getItem("weatherGamesPlayed")) || 0;
  });

  function registerGame() {
    setGamesPlayed((previous) => {
      const next = previous + 1;

      localStorage.setItem("weatherGamesPlayed", String(next));

      return next;
    });
  }

  /* =========================================================
     GAME 01 — CATCH THE SUN
  ========================================================= */

  const [sunStarted, setSunStarted] = useState(false);
  const [sunGameOver, setSunGameOver] = useState(false);

  const [sunScore, setSunScore] = useState(0);
  const [sunTime, setSunTime] = useState(30);

  const [sunPosition, setSunPosition] = useState({
    x: 50,
    y: 50,
  });

  const [clouds, setClouds] = useState([]);

  const [sunBest, setSunBest] = useState(() => {
    return Number(localStorage.getItem("weatherGameBestScore")) || 0;
  });

  function startSunGame() {
    setSunScore(0);
    setSunTime(30);
    setClouds([]);
    setSunGameOver(false);
    setSunStarted(true);
    setSunPosition(getRandomPosition());

    registerGame();
  }

  function catchSun() {
    if (!sunStarted) return;

    setSunScore((previous) => previous + 10);

    setSunPosition(getRandomPosition());

    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  }

  function hitCloud(id) {
    if (!sunStarted) return;

    setSunScore((previous) => Math.max(previous - 5, 0));

    setClouds((previous) =>
      previous.map((cloud) =>
        cloud.id === id
          ? {
              ...cloud,
              hit: true,
            }
          : cloud
      )
    );

    setTimeout(() => {
      setClouds((previous) => previous.filter((cloud) => cloud.id !== id));
    }, 220);
  }

  useEffect(() => {
    if (!sunStarted) return undefined;

    const timer = setInterval(() => {
      setSunTime((previous) => {
        if (previous <= 1) {
          setSunStarted(false);
          setSunGameOver(true);

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sunStarted]);

  useEffect(() => {
    if (!sunStarted) return undefined;

    const cloudSpawner = setInterval(() => {
      const position = getRandomPosition();

      const cloud = {
        id: `${Date.now()}-${Math.random()}`,
        ...position,
        hit: false,
      };

      setClouds((previous) => [...previous.slice(-6), cloud]);

      setTimeout(() => {
        setClouds((previous) =>
          previous.filter((item) => item.id !== cloud.id)
        );
      }, 2300);
    }, 850);

    return () => clearInterval(cloudSpawner);
  }, [sunStarted]);

  useEffect(() => {
    if (!sunGameOver) return;

    if (sunScore > sunBest) {
      setSunBest(sunScore);

      localStorage.setItem("weatherGameBestScore", String(sunScore));
    }
  }, [sunGameOver, sunScore, sunBest]);

  /* =========================================================
     GAME 02 — MEMORY
  ========================================================= */

  const memoryIcons = ["☀️", "🌧️", "❄️", "🌈", "🌪️", "⛈️"];

  const createMemoryCards = () =>
    shuffleArray(
      [...memoryIcons, ...memoryIcons].map((icon, index) => ({
        id: `${icon}-${index}-${Math.random()}`,
        icon,
      }))
    );

  const [memoryCards, setMemoryCards] = useState(createMemoryCards);

  const [memoryStarted, setMemoryStarted] = useState(false);

  const [memoryFlipped, setMemoryFlipped] = useState([]);

  const [memoryMatched, setMemoryMatched] = useState([]);

  const [memoryMoves, setMemoryMoves] = useState(0);

  const [memoryTime, setMemoryTime] = useState(0);

  const [memoryComplete, setMemoryComplete] = useState(false);

  const [memoryBest, setMemoryBest] = useState(() => {
    return Number(localStorage.getItem("weatherMemoryBest")) || 0;
  });

  function startMemoryGame() {
    setMemoryCards(createMemoryCards());
    setMemoryFlipped([]);
    setMemoryMatched([]);
    setMemoryMoves(0);
    setMemoryTime(0);
    setMemoryComplete(false);
    setMemoryStarted(true);

    registerGame();
  }

  function flipMemoryCard(index) {
    if (!memoryStarted) return;
    if (memoryFlipped.includes(index)) return;
    if (memoryMatched.includes(index)) return;
    if (memoryFlipped.length === 2) return;

    const nextFlipped = [...memoryFlipped, index];

    setMemoryFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves((previous) => previous + 1);

      const first = nextFlipped[0];
      const second = nextFlipped[1];

      if (memoryCards[first].icon === memoryCards[second].icon) {
        setTimeout(() => {
          setMemoryMatched((previous) => [...previous, first, second]);

          setMemoryFlipped([]);
        }, 400);
      } else {
        setTimeout(() => {
          setMemoryFlipped([]);
        }, 850);
      }
    }
  }

  useEffect(() => {
    if (!memoryStarted || memoryComplete) return undefined;

    const timer = setInterval(() => {
      setMemoryTime((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [memoryStarted, memoryComplete]);

  useEffect(() => {
    if (
      memoryStarted &&
      memoryMatched.length === memoryCards.length &&
      memoryCards.length > 0
    ) {
      setMemoryComplete(true);
      setMemoryStarted(false);

      if (memoryBest === 0 || memoryMoves < memoryBest) {
        setMemoryBest(memoryMoves);

        localStorage.setItem("weatherMemoryBest", String(memoryMoves));
      }
    }
  }, [memoryMatched, memoryCards, memoryStarted, memoryMoves, memoryBest]);

  /* =========================================================
     GAME 03 — QUIZ
  ========================================================= */

  const quizQuestions = useMemo(() => {
    const quizzes = {
      en: [
        {
          icon: "🌡️",
          question: "What instrument measures air temperature?",
          answers: ["Barometer", "Thermometer", "Anemometer", "Compass"],
          correct: 1,
        },
        {
          icon: "💨",
          question: "What instrument measures wind speed?",
          answers: ["Anemometer", "Thermometer", "Radar", "Altimeter"],
          correct: 0,
        },
        {
          icon: "🌧️",
          question: "What does a 90% chance of rain mean?",
          answers: [
            "It will rain for 90% of the day",
            "Rain is very likely",
            "90% of the city floods",
            "It rains exactly 90 minutes",
          ],
          correct: 1,
        },
        {
          icon: "❄️",
          question: "At approximately what temperature does water freeze?",
          answers: ["10°C", "5°C", "0°C", "-20°C"],
          correct: 2,
        },
        {
          icon: "⚡",
          question: "What weather phenomenon produces thunder?",
          answers: ["Fog", "Thunderstorm", "Snow", "Rainbow"],
          correct: 1,
        },
        {
          icon: "🌈",
          question: "What is needed to see a rainbow?",
          answers: [
            "Sunlight and water droplets",
            "Only wind",
            "Only snow",
            "Darkness",
          ],
          correct: 0,
        },
      ],

      de: [
        {
          icon: "🌡️",
          question: "Welches Gerät misst die Lufttemperatur?",
          answers: ["Barometer", "Thermometer", "Anemometer", "Kompass"],
          correct: 1,
        },
        {
          icon: "💨",
          question: "Welches Gerät misst die Windgeschwindigkeit?",
          answers: ["Anemometer", "Thermometer", "Radar", "Höhenmesser"],
          correct: 0,
        },
        {
          icon: "🌧️",
          question: "Was bedeutet eine Regenwahrscheinlichkeit von 90 %?",
          answers: [
            "Es regnet 90 % des Tages",
            "Regen ist sehr wahrscheinlich",
            "90 % der Stadt wird überflutet",
            "Es regnet genau 90 Minuten",
          ],
          correct: 1,
        },
        {
          icon: "❄️",
          question: "Bei welcher Temperatur gefriert Wasser ungefähr?",
          answers: ["10°C", "5°C", "0°C", "-20°C"],
          correct: 2,
        },
        {
          icon: "⚡",
          question: "Welches Wetterphänomen erzeugt Donner?",
          answers: ["Nebel", "Gewitter", "Schnee", "Regenbogen"],
          correct: 1,
        },
        {
          icon: "🌈",
          question: "Was braucht man, um einen Regenbogen zu sehen?",
          answers: [
            "Sonnenlicht und Wassertropfen",
            "Nur Wind",
            "Nur Schnee",
            "Dunkelheit",
          ],
          correct: 0,
        },
      ],

      uk: [
        {
          icon: "🌡️",
          question: "Який прилад вимірює температуру повітря?",
          answers: ["Барометр", "Термометр", "Анемометр", "Компас"],
          correct: 1,
        },
        {
          icon: "💨",
          question: "Який прилад вимірює швидкість вітру?",
          answers: ["Анемометр", "Термометр", "Радар", "Висотомір"],
          correct: 0,
        },
        {
          icon: "🌧️",
          question: "Що означає 90% ймовірності дощу?",
          answers: [
            "Дощ буде 90% дня",
            "Дощ дуже ймовірний",
            "90% міста затопить",
            "Дощ триватиме рівно 90 хвилин",
          ],
          correct: 1,
        },
        {
          icon: "❄️",
          question: "При якій температурі приблизно замерзає вода?",
          answers: ["10°C", "5°C", "0°C", "-20°C"],
          correct: 2,
        },
        {
          icon: "⚡",
          question: "Яке погодне явище створює грім?",
          answers: ["Туман", "Гроза", "Сніг", "Веселка"],
          correct: 1,
        },
        {
          icon: "🌈",
          question: "Що потрібно для появи веселки?",
          answers: [
            "Сонячне світло та краплі води",
            "Тільки вітер",
            "Тільки сніг",
            "Темрява",
          ],
          correct: 0,
        },
      ],

      ru: [
        {
          icon: "🌡️",
          question: "Какой прибор измеряет температуру воздуха?",
          answers: ["Барометр", "Термометр", "Анемометр", "Компас"],
          correct: 1,
        },
        {
          icon: "💨",
          question: "Какой прибор измеряет скорость ветра?",
          answers: ["Анемометр", "Термометр", "Радар", "Высотомер"],
          correct: 0,
        },
        {
          icon: "🌧️",
          question: "Что означает вероятность дождя 90%?",
          answers: [
            "Дождь будет идти 90% дня",
            "Дождь очень вероятен",
            "90% города затопит",
            "Дождь будет идти ровно 90 минут",
          ],
          correct: 1,
        },
        {
          icon: "❄️",
          question: "При какой температуре примерно замерзает вода?",
          answers: ["10°C", "5°C", "0°C", "-20°C"],
          correct: 2,
        },
        {
          icon: "⚡",
          question: "Какое погодное явление создаёт гром?",
          answers: ["Туман", "Гроза", "Снег", "Радуга"],
          correct: 1,
        },
        {
          icon: "🌈",
          question: "Что необходимо для появления радуги?",
          answers: [
            "Солнечный свет и капли воды",
            "Только ветер",
            "Только снег",
            "Темнота",
          ],
          correct: 0,
        },
      ],
    };

    return quizzes[language] || quizzes.en;
  }, [language]);

  const [quizStarted, setQuizStarted] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);

  const [quizScore, setQuizScore] = useState(0);

  const [quizSelected, setQuizSelected] = useState(null);

  const [quizComplete, setQuizComplete] = useState(false);

  const [quizBest, setQuizBest] = useState(() => {
    return Number(localStorage.getItem("weatherQuizBest")) || 0;
  });

  function startQuiz() {
    setQuizStarted(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelected(null);
    setQuizComplete(false);

    registerGame();
  }

  function answerQuiz(answerIndex) {
    if (quizSelected !== null) return;

    setQuizSelected(answerIndex);

    const currentQuestion = quizQuestions[quizIndex];

    const isCorrect = answerIndex === currentQuestion.correct;

    if (isCorrect) {
      setQuizScore((previous) => previous + 10);
    }

    setTimeout(() => {
      if (quizIndex >= quizQuestions.length - 1) {
        const finalScore = quizScore + (isCorrect ? 10 : 0);

        setQuizComplete(true);
        setQuizStarted(false);

        if (finalScore > quizBest) {
          setQuizBest(finalScore);

          localStorage.setItem("weatherQuizBest", String(finalScore));
        }
      } else {
        setQuizIndex((previous) => previous + 1);
        setQuizSelected(null);
      }
    }, 900);
  }

  /* =========================================================
     GAME 04 — AVOID THE RAIN
  ========================================================= */

  const [rainStarted, setRainStarted] = useState(false);

  const [rainGameOver, setRainGameOver] = useState(false);

  const [rainPlayer, setRainPlayer] = useState(50);

  const [rainDrops, setRainDrops] = useState([]);

  const [rainLives, setRainLives] = useState(3);

  const [rainScore, setRainScore] = useState(0);

  const [rainBest, setRainBest] = useState(() => {
    return Number(localStorage.getItem("weatherRainBest")) || 0;
  });

  function startRainGame() {
    setRainStarted(true);
    setRainGameOver(false);
    setRainPlayer(50);
    setRainDrops([]);
    setRainLives(3);
    setRainScore(0);

    registerGame();
  }

  function moveRainPlayer(direction) {
    setRainPlayer((previous) => {
      const amount = direction === "left" ? -8 : 8;

      return Math.min(92, Math.max(8, previous + amount));
    });
  }

  useEffect(() => {
    if (!rainStarted) return undefined;

    const handleKeyboard = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveRainPlayer("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveRainPlayer("right");
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [rainStarted]);

  useEffect(() => {
    if (!rainStarted) return undefined;

    const scoreTimer = setInterval(() => {
      setRainScore((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(scoreTimer);
  }, [rainStarted]);

  useEffect(() => {
    if (!rainStarted) return undefined;

    const spawner = setInterval(() => {
      setRainDrops((previous) => [
        ...previous,
        {
          id: `${Date.now()}-${Math.random()}`,
          x: Math.random() * 86 + 7,
          y: -10,
        },
      ]);
    }, 650);

    return () => clearInterval(spawner);
  }, [rainStarted]);

  useEffect(() => {
    if (!rainStarted) return undefined;

    const movement = setInterval(() => {
      setRainDrops((previousDrops) => {
        const nextDrops = [];

        previousDrops.forEach((drop) => {
          const moved = {
            ...drop,
            y: drop.y + 4,
          };

          const hitPlayer =
            moved.y >= 78 &&
            moved.y <= 94 &&
            Math.abs(moved.x - rainPlayer) < 8;

          if (hitPlayer) {
            setRainLives((previousLives) => {
              const nextLives = previousLives - 1;

              if (nextLives <= 0) {
                setRainStarted(false);
                setRainGameOver(true);
              }

              return Math.max(nextLives, 0);
            });

            return;
          }

          if (moved.y < 110) {
            nextDrops.push(moved);
          }
        });

        return nextDrops;
      });
    }, 55);

    return () => clearInterval(movement);
  }, [rainStarted, rainPlayer]);

  useEffect(() => {
    if (!rainGameOver) return;

    if (rainScore > rainBest) {
      setRainBest(rainScore);

      localStorage.setItem("weatherRainBest", String(rainScore));
    }
  }, [rainGameOver, rainScore, rainBest]);

  /* =========================================================
     GAME CARDS
  ========================================================= */

  const gameCards = [
    {
      id: "sun",
      number: currentText.game01,
      icon: "☀️",
      title: currentText.sunTitle,
      description: currentText.sunShort,
      record: `${sunBest} ${currentText.points}`,
    },
    {
      id: "memory",
      number: currentText.game02,
      icon: "🧠",
      title: currentText.memoryTitle,
      description: currentText.memoryShort,
      record: memoryBest > 0 ? `${memoryBest} ${currentText.moves}` : "—",
    },
    {
      id: "quiz",
      number: currentText.game03,
      icon: "🌦️",
      title: currentText.quizTitle,
      description: currentText.quizShort,
      record: `${quizBest}/${quizQuestions.length * 10}`,
    },
    {
      id: "rain",
      number: currentText.game04,
      icon: "🌧️",
      title: currentText.rainTitle,
      description: currentText.rainShort,
      record: `${rainBest}s`,
    },
  ];

  /* =========================================================
     BACK
  ========================================================= */

  function handleBack() {
    onNavigate?.("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="games-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="games-hero">
        <div className="games-container">
          <button className="games-back" type="button" onClick={handleBack}>
            <FiArrowLeft />
            {currentText.back}
          </button>

          <div className="games-hero__content">
            <span className="games-hero__label">🎮 {currentText.label}</span>

            <h1>{currentText.title}</h1>

            <p>{currentText.subtitle}</p>
          </div>

          <div className="games-overview">
            <div>
              <FiAward />

              <span>{currentText.bestScore}</span>

              <strong>{Math.max(sunBest, quizBest, rainBest)}</strong>
            </div>

            <div>
              <FiZap />

              <span>{currentText.gamesPlayed}</span>

              <strong>{gamesPlayed}</strong>
            </div>

            <div>
              <FiGrid />

              <span>{currentText.chooseGame}</span>

              <strong>4</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GAME SELECTOR
      ===================================================== */}

      <section className="game-selector-section">
        <div className="games-container">
          <div className="game-selector-grid">
            {gameCards.map((game) => (
              <button
                key={game.id}
                type="button"
                className={`game-selector-card ${
                  activeGame === game.id ? "active" : ""
                }`}
                onClick={() => setActiveGame(game.id)}
              >
                <div className="game-selector-card__icon">{game.icon}</div>

                <span>{game.number}</span>

                <h3>{game.title}</h3>

                <p>{game.description}</p>

                <div className="game-selector-card__bottom">
                  <strong>{game.record}</strong>

                  <span className="game-selector-play">
                    <FiPlay />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          GAME 01
      ===================================================== */}

      {activeGame === "sun" && (
        <section className="weather-game">
          <div className="games-container">
            <div className="weather-game__heading">
              <div>
                <span className="weather-game__eyebrow">
                  {currentText.game01}
                </span>

                <h2>☀️ {currentText.sunTitle}</h2>

                <p>{currentText.sunDescription}</p>
              </div>

              <div className="weather-game__status">
                <div>
                  <span>{currentText.score}</span>
                  <strong>{sunScore}</strong>
                </div>

                <div>
                  <span>{currentText.time}</span>
                  <strong>{sunTime}s</strong>
                </div>

                <div>
                  <span>{currentText.best}</span>
                  <strong>{sunBest}</strong>
                </div>
              </div>
            </div>

            <div className="weather-game__field sun-game-field">
              <div className="weather-game__background">
                <span className="game-cloud-decoration game-cloud-decoration--1">
                  ☁️
                </span>

                <span className="game-cloud-decoration game-cloud-decoration--2">
                  ☁️
                </span>
              </div>

              {sunStarted && (
                <>
                  <button
                    type="button"
                    className="weather-game__sun"
                    style={{
                      left: `${sunPosition.x}%`,
                      top: `${sunPosition.y}%`,
                    }}
                    onClick={catchSun}
                  >
                    ☀️
                  </button>

                  {clouds.map((cloud) => (
                    <button
                      type="button"
                      key={cloud.id}
                      className={`weather-game__cloud ${
                        cloud.hit ? "is-hit" : ""
                      }`}
                      style={{
                        left: `${cloud.x}%`,
                        top: `${cloud.y}%`,
                      }}
                      onClick={() => hitCloud(cloud.id)}
                    >
                      ☁️
                    </button>
                  ))}
                </>
              )}

              {!sunStarted && !sunGameOver && (
                <GameStartScreen
                  icon="☀️"
                  eyebrow={currentText.ready}
                  title={currentText.sunTitle}
                  description={currentText.sunReady}
                  button={currentText.play}
                  onStart={startSunGame}
                />
              )}

              {sunGameOver && (
                <GameStartScreen
                  icon="🏆"
                  eyebrow={currentText.gameOver}
                  title={`${sunScore} ${currentText.points}`}
                  description={
                    sunScore >= sunBest && sunScore > 0
                      ? currentText.newRecord
                      : `${currentText.best}: ${sunBest}`
                  }
                  button={currentText.playAgain}
                  onStart={startSunGame}
                  restart
                />
              )}

              {sunStarted && (
                <div className="weather-game__legend">
                  <span>☀️ +10</span>
                  <span>☁️ -5</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          MEMORY
      ===================================================== */}

      {activeGame === "memory" && (
        <section className="weather-game">
          <div className="games-container">
            <div className="weather-game__heading">
              <div>
                <span className="weather-game__eyebrow">
                  {currentText.game02}
                </span>

                <h2>🧠 {currentText.memoryTitle}</h2>

                <p>{currentText.memoryDescription}</p>
              </div>

              <div className="weather-game__status">
                <div>
                  <span>{currentText.moves}</span>
                  <strong>{memoryMoves}</strong>
                </div>

                <div>
                  <span>{currentText.time}</span>
                  <strong>{memoryTime}s</strong>
                </div>

                <div>
                  <span>{currentText.best}</span>
                  <strong>{memoryBest || "—"}</strong>
                </div>
              </div>
            </div>

            <div className="memory-game-field">
              {!memoryStarted && !memoryComplete ? (
                <GameStartScreen
                  icon="🧠"
                  eyebrow={currentText.ready}
                  title={currentText.memoryTitle}
                  description={currentText.memoryReady}
                  button={currentText.play}
                  onStart={startMemoryGame}
                />
              ) : memoryComplete ? (
                <GameStartScreen
                  icon="🎉"
                  eyebrow={currentText.completed}
                  title={`${memoryMoves} ${currentText.moves}`}
                  description={`${currentText.perfectMemory} ${memoryTime}s`}
                  button={currentText.playAgain}
                  onStart={startMemoryGame}
                  restart
                />
              ) : (
                <div className="memory-grid">
                  {memoryCards.map((card, index) => {
                    const visible =
                      memoryFlipped.includes(index) ||
                      memoryMatched.includes(index);

                    return (
                      <button
                        key={card.id}
                        type="button"
                        className={`memory-card ${visible ? "flipped" : ""} ${
                          memoryMatched.includes(index) ? "matched" : ""
                        }`}
                        onClick={() => flipMemoryCard(index)}
                      >
                        <span className="memory-card__inner">
                          <span className="memory-card__front">?</span>

                          <span className="memory-card__back">{card.icon}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          QUIZ
      ===================================================== */}

      {activeGame === "quiz" && (
        <section className="weather-game">
          <div className="games-container">
            <div className="weather-game__heading">
              <div>
                <span className="weather-game__eyebrow">
                  {currentText.game03}
                </span>

                <h2>🌦️ {currentText.quizTitle}</h2>

                <p>{currentText.quizDescription}</p>
              </div>

              <div className="weather-game__status">
                <div>
                  <span>{currentText.score}</span>
                  <strong>{quizScore}</strong>
                </div>

                <div>
                  <span>{currentText.question}</span>
                  <strong>
                    {quizStarted
                      ? `${quizIndex + 1}/${quizQuestions.length}`
                      : `0/${quizQuestions.length}`}
                  </strong>
                </div>

                <div>
                  <span>{currentText.best}</span>
                  <strong>{quizBest}</strong>
                </div>
              </div>
            </div>

            <div className="quiz-game-field">
              {!quizStarted && !quizComplete ? (
                <GameStartScreen
                  icon="🌦️"
                  eyebrow={currentText.ready}
                  title={currentText.quizTitle}
                  description={currentText.quizShort}
                  button={currentText.play}
                  onStart={startQuiz}
                />
              ) : quizComplete ? (
                <GameStartScreen
                  icon="🏆"
                  eyebrow={currentText.quizFinished}
                  title={`${quizScore}/${quizQuestions.length * 10}`}
                  description={
                    quizScore >= quizBest && quizScore > 0
                      ? currentText.newRecord
                      : `${currentText.best}: ${quizBest}`
                  }
                  button={currentText.playAgain}
                  onStart={startQuiz}
                  restart
                />
              ) : (
                <div className="quiz-card">
                  <div className="quiz-progress">
                    <span
                      style={{
                        width: `${
                          ((quizIndex + 1) / quizQuestions.length) * 100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="quiz-icon">
                    {quizQuestions[quizIndex].icon}
                  </div>

                  <span className="quiz-question-number">
                    {currentText.question} {quizIndex + 1} /{" "}
                    {quizQuestions.length}
                  </span>

                  <h3>{quizQuestions[quizIndex].question}</h3>

                  <div className="quiz-answers">
                    {quizQuestions[quizIndex].answers.map(
                      (answer, answerIndex) => {
                        let className = "";

                        if (quizSelected !== null) {
                          if (
                            answerIndex === quizQuestions[quizIndex].correct
                          ) {
                            className = "correct";
                          } else if (answerIndex === quizSelected) {
                            className = "wrong";
                          }
                        }

                        return (
                          <button
                            key={answer}
                            type="button"
                            className={className}
                            onClick={() => answerQuiz(answerIndex)}
                          >
                            <span>{String.fromCharCode(65 + answerIndex)}</span>

                            {answer}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {quizSelected !== null && (
                    <div
                      className={`quiz-result ${
                        quizSelected === quizQuestions[quizIndex].correct
                          ? "correct"
                          : "wrong"
                      }`}
                    >
                      {quizSelected === quizQuestions[quizIndex].correct
                        ? currentText.correct
                        : currentText.wrong}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          AVOID RAIN
      ===================================================== */}

      {activeGame === "rain" && (
        <section className="weather-game">
          <div className="games-container">
            <div className="weather-game__heading">
              <div>
                <span className="weather-game__eyebrow">
                  {currentText.game04}
                </span>

                <h2>🌧️ {currentText.rainTitle}</h2>

                <p>{currentText.rainDescription}</p>
              </div>

              <div className="weather-game__status">
                <div>
                  <span>{currentText.score}</span>
                  <strong>{rainScore}s</strong>
                </div>

                <div>
                  <span>{currentText.lives}</span>
                  <strong>{"❤️".repeat(rainLives) || "0"}</strong>
                </div>

                <div>
                  <span>{currentText.best}</span>
                  <strong>{rainBest}s</strong>
                </div>
              </div>
            </div>

            <div className="rain-game-wrap">
              <div className="rain-game-field">
                <div className="rain-background">
                  <div className="rain-cloud rain-cloud--1">☁️</div>

                  <div className="rain-cloud rain-cloud--2">☁️</div>
                </div>

                {rainStarted && (
                  <>
                    {rainDrops.map((drop) => (
                      <div
                        key={drop.id}
                        className="rain-drop"
                        style={{
                          left: `${drop.x}%`,
                          top: `${drop.y}%`,
                        }}
                      >
                        💧
                      </div>
                    ))}

                    <div
                      className="rain-player"
                      style={{
                        left: `${rainPlayer}%`,
                      }}
                    >
                      ☂️
                    </div>
                  </>
                )}

                {!rainStarted && !rainGameOver && (
                  <GameStartScreen
                    icon="☂️"
                    eyebrow={currentText.ready}
                    title={currentText.rainTitle}
                    description={currentText.rainReady}
                    button={currentText.startRain}
                    onStart={startRainGame}
                  />
                )}

                {rainGameOver && (
                  <GameStartScreen
                    icon="🌧️"
                    eyebrow={currentText.gameOver}
                    title={`${rainScore} ${currentText.seconds}`}
                    description={`${currentText.best}: ${rainBest}s`}
                    button={currentText.playAgain}
                    onStart={startRainGame}
                    restart
                  />
                )}
              </div>

              {rainStarted && (
                <div className="rain-controls">
                  <button type="button" onClick={() => moveRainPlayer("left")}>
                    <FiChevronLeft />
                  </button>

                  <span>{currentText.keyboard}</span>

                  <button type="button" onClick={() => moveRainPlayer("right")}>
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* =========================================================
   START SCREEN
========================================================= */

function GameStartScreen({
  icon,
  eyebrow,
  title,
  description,
  button,
  onStart,
  restart = false,
}) {
  return (
    <div className="weather-game__screen">
      <div className="weather-game__main-icon">{icon}</div>

      <span>{eyebrow}</span>

      <h3>{title}</h3>

      <p>{description}</p>

      <button className="game-start-button" type="button" onClick={onStart}>
        {restart ? <FiRotateCcw /> : <FiPlay />}

        {button}
      </button>
    </div>
  );
}
