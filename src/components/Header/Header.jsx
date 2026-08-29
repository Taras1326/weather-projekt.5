import { useEffect, useState } from "react";

import {
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiMap,
  FiCompass,
  FiHome,
  FiLogOut,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiArrowLeft,
  FiBell,
  FiSettings,
  FiHeart,
  FiGlobe,
  FiChevronDown,
  FiTrash2,
  FiWind,
  FiCloudRain,
  FiCloudLightning,
  FiPlayCircle,
} from "react-icons/fi";

import logo from "./logo-projekt.png";
import { useLanguage } from "../context/LanguageContext.jsx";

import "./Header.css";

const NOTIFICATIONS_KEY = "weather-notifications";

export default function Header({
  page,
  onNavigate,
  theme,
  onToggleTheme,
  unit,
  onToggleUnit,
}) {
  const { language, setLanguage, t } = useLanguage();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [languageOpen, setLanguageOpen] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);

  const [authMode, setAuthMode] = useState("signup");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weather-user")) || null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("weather-profile")) || {
          avatar: "",
          city: "",
          country: "",
        }
      );
    } catch {
      return {
        avatar: "",
        city: "",
        country: "",
      };
    }
  });

  const notificationTranslations = {
    en: {
      notifications: "Notifications",
      unread: "unread",
      noNew: "No new notifications",
      markAll: "Mark all as read",
      clearAll: "Clear all notifications",

      strongWind: "Strong wind",
      strongWindText: "Wind gusts may reach 70 km/h.",

      heavyRain: "Heavy rain",
      heavyRainText: "Heavy rain is expected tomorrow morning.",

      thunderstorm: "Thunderstorm",
      thunderstormText: "Thunderstorms may develop in this area.",

      noNotifications: "No notifications",
      noNotificationsText: "Important weather warnings will appear here.",

      viewAlerts: "View weather alerts",

      today: "Today",
      tomorrow: "Tomorrow",
    },

    de: {
      notifications: "Benachrichtigungen",
      unread: "ungelesen",
      noNew: "Keine neuen Benachrichtigungen",
      markAll: "Alle als gelesen markieren",
      clearAll: "Alle Benachrichtigungen löschen",

      strongWind: "Starker Wind",
      strongWindText: "Windböen können 70 km/h erreichen.",

      heavyRain: "Starker Regen",
      heavyRainText: "Morgen früh wird starker Regen erwartet.",

      thunderstorm: "Gewitter",
      thunderstormText: "In dieser Region können sich Gewitter entwickeln.",

      noNotifications: "Keine Benachrichtigungen",
      noNotificationsText: "Wichtige Wetterwarnungen werden hier angezeigt.",

      viewAlerts: "Wetterwarnungen anzeigen",

      today: "Heute",
      tomorrow: "Morgen",
    },

    uk: {
      notifications: "Сповіщення",
      unread: "непрочитаних",
      noNew: "Немає нових сповіщень",
      markAll: "Позначити все як прочитане",
      clearAll: "Видалити всі сповіщення",

      strongWind: "Сильний вітер",
      strongWindText: "Пориви вітру можуть досягати 70 км/год.",

      heavyRain: "Сильний дощ",
      heavyRainText: "Завтра вранці очікується сильний дощ.",

      thunderstorm: "Гроза",
      thunderstormText: "У цьому районі можливе утворення гроз.",

      noNotifications: "Немає сповіщень",
      noNotificationsText:
        "Тут будуть з'являтися важливі погодні попередження.",

      viewAlerts: "Переглянути погодні попередження",

      today: "Сьогодні",
      tomorrow: "Завтра",
    },

    ru: {
      notifications: "Уведомления",
      unread: "непрочитанных",
      noNew: "Нет новых уведомлений",
      markAll: "Отметить всё как прочитанное",
      clearAll: "Удалить все уведомления",

      strongWind: "Сильный ветер",
      strongWindText: "Порывы ветра могут достигать 70 км/ч.",

      heavyRain: "Сильный дождь",
      heavyRainText: "Завтра утром ожидается сильный дождь.",

      thunderstorm: "Гроза",
      thunderstormText: "В этом районе возможно образование гроз.",

      noNotifications: "Нет уведомлений",
      noNotificationsText:
        "Здесь будут появляться важные погодные предупреждения.",

      viewAlerts: "Посмотреть погодные предупреждения",

      today: "Сегодня",
      tomorrow: "Завтра",
    },
  };

  const nt = notificationTranslations[language] || notificationTranslations.en;

  const getDefaultNotifications = () => [
    {
      id: 1,
      type: "wind",
      city: "Berlin",
      titleKey: "strongWind",
      textKey: "strongWindText",
      dayKey: "today",
      time: "18:00",
      read: false,
    },

    {
      id: 2,
      type: "rain",
      city: "Kyiv",
      titleKey: "heavyRain",
      textKey: "heavyRainText",
      dayKey: "tomorrow",
      time: "09:00",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY));

      if (Array.isArray(saved)) {
        return saved;
      }

      return getDefaultNotifications();
    } catch {
      return getDefaultNotifications();
    }
  });

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    terms: false,
  });

  const languages = [
    {
      code: "en",
      flag: "🇬🇧",
      short: "EN",
      name: "English",
    },

    {
      code: "de",
      flag: "🇩🇪",
      short: "DE",
      name: "Deutsch",
    },

    {
      code: "uk",
      flag: "🇺🇦",
      short: "UA",
      name: "Українська",
    },

    {
      code: "ru",
      flag: "🇷🇺",
      short: "RU",
      name: "Русский",
    },
  ];

  const gamesText = {
    en: "Games",
    de: "Spiele",
    uk: "Ігри",
    ru: "Игры",
  };

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen || window.innerWidth > 768) {
      document.body.style.overflow = "";

      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const updateUserData = () => {
      try {
        const savedUser =
          JSON.parse(localStorage.getItem("weather-user")) || null;

        const savedProfile = JSON.parse(
          localStorage.getItem("weather-profile")
        ) || {
          avatar: "",
          city: "",
          country: "",
        };

        setUser(savedUser);

        setProfile(savedProfile);
      } catch {
        setUser(null);

        setProfile({
          avatar: "",
          city: "",
          country: "",
        });
      }
    };

    window.addEventListener("weather-user-updated", updateUserData);

    window.addEventListener("storage", updateUserData);

    return () => {
      window.removeEventListener("weather-user-updated", updateUserData);

      window.removeEventListener("storage", updateUserData);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const openNotification = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    if (type === "wind") {
      return <FiWind />;
    }

    if (type === "rain") {
      return <FiCloudRain />;
    }

    if (type === "storm") {
      return <FiCloudLightning />;
    }

    return <FiBell />;
  };

  const getNotificationTitle = (item) => {
    if (item.titleKey && nt[item.titleKey]) {
      return nt[item.titleKey];
    }

    return item.title || nt.notifications;
  };

  const getNotificationText = (item) => {
    if (item.textKey && nt[item.textKey]) {
      return nt[item.textKey];
    }

    return item.text || "";
  };

  const getNotificationDay = (item) => {
    if (item.dayKey && nt[item.dayKey]) {
      return nt[item.dayKey];
    }

    return "";
  };

  const closeDropdowns = () => {
    setProfileOpen(false);

    setLanguageOpen(false);

    setNotificationsOpen(false);
  };

  const nav = (target) => {
    onNavigate?.(target);

    setMobileOpen(false);

    closeDropdowns();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
      terms: false,
    });

    setShowPassword(false);

    setShowConfirmPassword(false);

    setError("");

    setSuccess(false);
  };

  const openAuth = (mode) => {
    resetForm();

    setAuthMode(mode);

    setAuthOpen(true);

    closeDropdowns();

    if (mode === "login") {
      const rememberedEmail =
        localStorage.getItem("weather-remember-email") || "";

      if (rememberedEmail) {
        setForm((prev) => ({
          ...prev,
          email: rememberedEmail,
          remember: true,
        }));
      }
    }
  };

  const closeAuth = () => {
    setAuthOpen(false);

    setTimeout(() => {
      resetForm();

      setAuthMode("signup");
    }, 200);
  };

  const switchAuthMode = (mode) => {
    resetForm();

    setAuthMode(mode);
  };

  const signup = () => {
    setError("");

    if (!form.username.trim()) {
      setError("Please enter your username.");

      return;
    }

    if (form.username.trim().length < 3) {
      setError("Username must contain at least 3 characters.");

      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");

      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");

      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");

      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      setError("Password must contain at least one capital letter.");

      return;
    }

    if (!/[0-9]/.test(form.password)) {
      setError("Password must contain at least one number.");

      return;
    }

    if (!/[^A-Za-z0-9]/.test(form.password)) {
      setError("Password must contain at least one special symbol.");

      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    if (!form.terms) {
      setError("Please accept Terms and Privacy Policy.");

      return;
    }

    const account = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    localStorage.setItem("weather-account", JSON.stringify(account));

    const publicUser = {
      username: account.username,
      email: account.email,
    };

    localStorage.setItem("weather-user", JSON.stringify(publicUser));

    setUser(publicUser);

    setSuccess(true);

    window.dispatchEvent(new Event("weather-user-updated"));

    setTimeout(() => {
      closeAuth();
    }, 1700);
  };

  const login = () => {
    setError("");

    if (!form.email.trim()) {
      setError("Please enter your email.");

      return;
    }

    if (!form.password) {
      setError("Please enter your password.");

      return;
    }

    let savedAccount = null;

    try {
      savedAccount = JSON.parse(localStorage.getItem("weather-account"));
    } catch {
      savedAccount = null;
    }

    if (!savedAccount) {
      setError("No account found. Please create an account first.");

      return;
    }

    if (savedAccount.email.toLowerCase() !== form.email.trim().toLowerCase()) {
      setError("Incorrect email address.");

      return;
    }

    if (savedAccount.password !== form.password) {
      setError("Incorrect password.");

      return;
    }

    const publicUser = {
      username: savedAccount.username,
      email: savedAccount.email,
    };

    localStorage.setItem("weather-user", JSON.stringify(publicUser));

    if (form.remember) {
      localStorage.setItem("weather-remember-email", form.email);
    } else {
      localStorage.removeItem("weather-remember-email");
    }

    setUser(publicUser);

    setSuccess(true);

    window.dispatchEvent(new Event("weather-user-updated"));

    setTimeout(() => {
      closeAuth();
    }, 1500);
  };

  const forgotPassword = () => {
    setError("");

    if (!form.email.trim()) {
      setError("Enter your email address first.");

      return;
    }

    let savedAccount = null;

    try {
      savedAccount = JSON.parse(localStorage.getItem("weather-account"));
    } catch {
      savedAccount = null;
    }

    if (
      !savedAccount ||
      savedAccount.email.toLowerCase() !== form.email.trim().toLowerCase()
    ) {
      setError("We could not find an account with this email.");

      return;
    }

    setSuccess(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (authMode === "signup") {
      signup();
    }

    if (authMode === "login") {
      login();
    }

    if (authMode === "forgot") {
      forgotPassword();
    }
  };

  const logout = () => {
    localStorage.removeItem("weather-user");

    setUser(null);

    setProfileOpen(false);

    setNotificationsOpen(false);

    setMobileOpen(false);

    onNavigate?.("home");

    window.dispatchEvent(new Event("weather-user-updated"));
  };

  const passwordChecks = {
    length: form.password.length >= 8,

    capital: /[A-Z]/.test(form.password),

    number: /[0-9]/.test(form.password),

    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const passwordScore = Object.values(passwordChecks).filter(Boolean).length;

  const passwordStrength =
    passwordScore === 0
      ? ""
      : passwordScore === 1
      ? "Weak"
      : passwordScore === 2
      ? "Medium"
      : passwordScore === 3
      ? "Good"
      : "Strong";

  return (
    <>
      <header className="site-header">
        <div className="header-inner container-wide">
          <button
            className="brand-button"
            type="button"
            onClick={() => nav("home")}
            aria-label="24/7 Forecast home"
          >
            <img
              className="theme-logo"
              src={logo}
              alt="24/7 Forecast"
              draggable="false"
            />
          </button>

          <nav className="desktop-nav">
            <button
              className={page === "home" ? "active" : ""}
              type="button"
              onClick={() => nav("home")}
            >
              <FiHome />

              {t("nav.dashboard")}
            </button>

            <button
              className={page === "map" ? "active" : ""}
              type="button"
              onClick={() => nav("map")}
            >
              <FiMap />

              {t("nav.map")}
            </button>

            <button
              className={page === "travel" ? "active" : ""}
              type="button"
              onClick={() => nav("travel")}
            >
              <FiCompass />

              {t("nav.travel")}
            </button>

            <button
              className={
                page === "games"
                  ? "active games-nav-button"
                  : "games-nav-button"
              }
              type="button"
              onClick={() => nav("games")}
            >
              <FiPlayCircle />

              {gamesText[language] || "Games"}
            </button>

            <a href="#contacts">{t("nav.contacts")}</a>
          </nav>

          <div className="header-tools">
            <div className="language-selector">
              <button
                className="language-button"
                type="button"
                onClick={() => {
                  setLanguageOpen((value) => !value);

                  setProfileOpen(false);

                  setNotificationsOpen(false);
                }}
              >
                <FiGlobe />

                <span className="language-flag">{currentLanguage.flag}</span>

                <strong>{currentLanguage.short}</strong>

                <FiChevronDown
                  className={
                    languageOpen ? "language-arrow open" : "language-arrow"
                  }
                />
              </button>

              {languageOpen && (
                <div className="language-dropdown">
                  <div className="language-dropdown-title">
                    <FiGlobe />

                    <span>{t("language")}</span>
                  </div>

                  {languages.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={language === item.code ? "active" : ""}
                      onClick={() => {
                        setLanguage(item.code);

                        setLanguageOpen(false);
                      }}
                    >
                      <span className="language-dropdown-flag">
                        {item.flag}
                      </span>

                      <span>{item.name}</span>

                      {language === item.code && <FiCheck />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="unit-toggle"
              type="button"
              onClick={onToggleUnit}
            >
              °{unit}
            </button>

            <button
              className="icon-button theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {user && (
              <div className="notifications-wrap">
                <button
                  className="icon-button notifications-button"
                  type="button"
                  title={nt.notifications}
                  onClick={() => {
                    setNotificationsOpen((value) => !value);

                    setProfileOpen(false);

                    setLanguageOpen(false);
                  }}
                >
                  <FiBell />

                  {unreadCount > 0 && (
                    <span className="notification-badge">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="notifications-dropdown glass-panel">
                    <div className="notifications-header">
                      <div>
                        <strong>{nt.notifications}</strong>

                        <span>
                          {unreadCount > 0
                            ? `${unreadCount} ${nt.unread}`
                            : nt.noNew}
                        </span>
                      </div>

                      {unreadCount > 0 && (
                        <button
                          type="button"
                          title={nt.markAll}
                          aria-label={nt.markAll}
                          onClick={markAllAsRead}
                        >
                          <FiCheck />
                        </button>
                      )}
                    </div>

                    <div className="notifications-divider" />

                    {notifications.length === 0 ? (
                      <div className="notifications-empty">
                        <FiBell />

                        <strong>{nt.noNotifications}</strong>

                        <p>{nt.noNotificationsText}</p>
                      </div>
                    ) : (
                      <div className="notifications-list">
                        {notifications.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={
                              item.read
                                ? "notification-item"
                                : "notification-item unread"
                            }
                            onClick={() => openNotification(item.id)}
                          >
                            <span
                              className={`notification-type-icon ${
                                item.type || ""
                              }`}
                            >
                              {getNotificationIcon(item.type)}
                            </span>

                            <span className="notification-content">
                              <strong>{getNotificationTitle(item)}</strong>

                              <small>{item.city}</small>

                              <span>{getNotificationText(item)}</span>

                              <time>
                                {getNotificationDay(item)} {item.time}
                              </time>
                            </span>

                            {!item.read && (
                              <span className="notification-dot" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="notifications-divider" />

                    <div className="notifications-footer">
                      <button
                        type="button"
                        onClick={() => {
                          setNotificationsOpen(false);

                          nav("alerts");
                        }}
                      >
                        <FiBell />

                        {nt.viewAlerts}
                      </button>

                      {notifications.length > 0 && (
                        <button
                          type="button"
                          className="notifications-clear"
                          title={nt.clearAll}
                          aria-label={nt.clearAll}
                          onClick={clearNotifications}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <button
                className="accent-button signup-compact"
                type="button"
                onClick={() => openAuth("signup")}
              >
                {t("auth.signup")}
              </button>
            )}

            {!user && (
              <button
                className="header-login-button"
                type="button"
                onClick={() => openAuth("login")}
              >
                {t("auth.login")}
              </button>
            )}

            <div className="profile-wrap">
              <button
                className="avatar-button"
                type="button"
                onClick={() => {
                  setLanguageOpen(false);

                  setNotificationsOpen(false);

                  if (user) {
                    setProfileOpen((value) => !value);
                  } else {
                    openAuth("login");
                  }
                }}
              >
                {user && profile.avatar ? (
                  <img
                    className="header-user-avatar-image"
                    src={profile.avatar}
                    alt={user.username || "User"}
                  />
                ) : (
                  <FiUser />
                )}
              </button>

              {user && profileOpen && (
                <div className="profile-menu glass-panel">
                  <div className="profile-menu-top">
                    <div className="profile-menu-avatar">
                      {profile.avatar ? (
                        <img
                          className="profile-menu-avatar-image"
                          src={profile.avatar}
                          alt={user.username || "User"}
                        />
                      ) : (
                        <FiUser />
                      )}
                    </div>

                    <div>
                      <strong>{user.username}</strong>

                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="profile-menu-divider" />

                  <button type="button" onClick={() => nav("profile")}>
                    <FiUser />

                    {t("profile.myProfile")}
                  </button>

                  <button type="button" onClick={() => nav("favorites")}>
                    <FiHeart />

                    {t("profile.myCities")}
                  </button>

                  <button type="button" onClick={() => nav("alerts")}>
                    <FiBell />

                    {t("profile.weatherAlerts")}
                  </button>

                  <button type="button" onClick={() => nav("settings")}>
                    <FiSettings />

                    {t("profile.settings")}
                  </button>

                  <div className="profile-menu-divider" />

                  <button
                    className="logout-button"
                    type="button"
                    onClick={logout}
                  >
                    <FiLogOut />

                    {t("profile.logout")}
                  </button>
                </div>
              )}
            </div>

            <button
              className="mobile-nav-toggle icon-button"
              type="button"
              onClick={() => {
                setMobileOpen((value) => !value);

                closeDropdowns();
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav mobile-nav-pro">
            <div className="mobile-menu-top">
              <span className="mobile-menu-title">Menu</span>
            </div>

            <div className="mobile-menu-links">
              <button
                className={page === "home" ? "active" : ""}
                type="button"
                onClick={() => nav("home")}
              >
                <FiHome />

                <span>{t("nav.dashboard")}</span>
              </button>

              <button
                className={page === "map" ? "active" : ""}
                type="button"
                onClick={() => nav("map")}
              >
                <FiMap />

                <span>{t("nav.map")}</span>
              </button>

              <button
                className={page === "travel" ? "active" : ""}
                type="button"
                onClick={() => nav("travel")}
              >
                <FiCompass />

                <span>{t("nav.travel")}</span>
              </button>

              <button
                className={page === "games" ? "active" : ""}
                type="button"
                onClick={() => nav("games")}
              >
                <FiPlayCircle />

                <span>🎮 {gamesText[language] || "Games"}</span>
              </button>

              <a href="#contacts" onClick={() => setMobileOpen(false)}>
                <FiMail />

                <span>{t("nav.contacts")}</span>
              </a>
            </div>

            <div className="mobile-menu-divider" />

            <div className="mobile-settings-title">
              {t("profile.preferences")}
            </div>

            <div className="mobile-quick-settings">
              <button type="button" onClick={onToggleUnit}>
                <span className="mobile-setting-icon">°{unit}</span>

                <span>{t("settings.temperatureUnit")}</span>

                <strong>°{unit}</strong>
              </button>

              {user && (
                <button type="button" onClick={() => nav("alerts")}>
                  <span className="mobile-setting-icon">
                    <FiBell />
                  </span>

                  <span>{t("profile.weatherAlerts")}</span>

                  {unreadCount > 0 ? (
                    <strong>{unreadCount}</strong>
                  ) : (
                    <FiChevronDown className="mobile-row-arrow" />
                  )}
                </button>
              )}
            </div>

            <div className="mobile-menu-divider" />

            {user ? (
              <>
                <div className="mobile-user-card">
                  <div className="mobile-user-avatar">
                    {profile.avatar ? (
                      <img
                        className="mobile-user-avatar-image"
                        src={profile.avatar}
                        alt={user.username || "User"}
                      />
                    ) : (
                      <FiUser />
                    )}
                  </div>

                  <div>
                    <strong>{user.username}</strong>

                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="mobile-profile-links">
                  <button type="button" onClick={() => nav("profile")}>
                    <FiUser />

                    <span>{t("profile.myProfile")}</span>
                  </button>

                  <button type="button" onClick={() => nav("favorites")}>
                    <FiHeart />

                    <span>{t("profile.myCities")}</span>
                  </button>

                  <button type="button" onClick={() => nav("alerts")}>
                    <FiBell />

                    <span>{t("profile.weatherAlerts")}</span>
                  </button>

                  <button type="button" onClick={() => nav("settings")}>
                    <FiSettings />

                    <span>{t("profile.settings")}</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="mobile-logout-button"
                  onClick={logout}
                >
                  <FiLogOut />

                  {t("profile.logout")}
                </button>
              </>
            ) : (
              <div className="mobile-auth-actions">
                <button
                  className="mobile-signup-button"
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);

                    openAuth("signup");
                  }}
                >
                  <FiUser />

                  {t("auth.signup")}
                </button>

                <button
                  className="mobile-login-button"
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);

                    openAuth("login");
                  }}
                >
                  {t("auth.login")}
                </button>
              </div>
            )}
          </nav>
        )}
      </header>

      {authOpen && (
        <div className="modal-backdrop" onMouseDown={closeAuth}>
          <form
            className="signup-modal signup-modal-pro"
            onSubmit={handleSubmit}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              type="button"
              onClick={closeAuth}
            >
              <FiX />
            </button>

            {success ? (
              <div className="signup-success">
                <div className="signup-success-icon">
                  <FiCheck />
                </div>

                {authMode === "signup" && (
                  <>
                    <h2>{t("auth.createAccount")}</h2>

                    <p>{t("auth.successAccount")}</p>

                    <strong>{form.username}</strong>
                  </>
                )}

                {authMode === "login" && (
                  <>
                    <h2>{t("auth.welcomeBack")}</h2>

                    <p>{t("auth.successLogin")}</p>
                  </>
                )}

                {authMode === "forgot" && (
                  <>
                    <h2>{t("auth.checkInbox")}</h2>

                    <p>Password reset instructions would be sent to:</p>

                    <strong>{form.email}</strong>

                    <p className="demo-notice">
                      Demo mode: real email sending requires Firebase or
                      Supabase.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="signup-brand">
                  <img
                    className="theme-logo"
                    src={logo}
                    alt="24/7 Forecast"
                    draggable="false"
                  />
                </div>

                {authMode === "signup" && (
                  <>
                    <h2>{t("auth.createAccount")}</h2>

                    <p className="signup-description">
                      {t("auth.createDescription")}
                    </p>
                  </>
                )}

                {authMode === "login" && (
                  <>
                    <h2>{t("auth.welcomeBack")}</h2>

                    <p className="signup-description">
                      {t("auth.loginDescription")}
                    </p>
                  </>
                )}

                {authMode === "forgot" && (
                  <>
                    <button
                      className="auth-back-button"
                      type="button"
                      onClick={() => switchAuthMode("login")}
                    >
                      <FiArrowLeft />

                      {t("auth.backLogin")}
                    </button>

                    <h2>{t("auth.forgotPassword")}</h2>

                    <p className="signup-description">
                      {t("auth.forgotDescription")}
                    </p>
                  </>
                )}

                {authMode === "signup" && (
                  <label>
                    {t("auth.username")}

                    <div className="signup-input-wrap">
                      <FiUser />

                      <input
                        type="text"
                        value={form.username}
                        onChange={(event) => {
                          setForm((prev) => ({
                            ...prev,

                            username: event.target.value,
                          }));

                          setError("");
                        }}
                        placeholder={t("auth.username")}
                      />
                    </div>
                  </label>
                )}

                <label>
                  {t("auth.email")}

                  <div className="signup-input-wrap">
                    <FiMail />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => {
                        setForm((prev) => ({
                          ...prev,

                          email: event.target.value,
                        }));

                        setError("");
                      }}
                      placeholder="name@example.com"
                    />
                  </div>
                </label>

                {authMode !== "forgot" && (
                  <label>
                    {t("auth.password")}

                    <div className="signup-input-wrap">
                      <FiLock />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(event) => {
                          setForm((prev) => ({
                            ...prev,

                            password: event.target.value,
                          }));

                          setError("");
                        }}
                        placeholder={t("auth.password")}
                      />

                      <button
                        className="password-eye"
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </label>
                )}

                {authMode === "signup" && form.password && (
                  <div className="password-info">
                    <div className="password-strength-top">
                      <span>{t("auth.passwordStrength")}</span>

                      <strong>{passwordStrength}</strong>
                    </div>

                    <div className="password-strength-bars">
                      {[1, 2, 3, 4].map((item) => (
                        <span
                          key={item}
                          className={
                            passwordScore >= item
                              ? `active strength-${passwordScore}`
                              : ""
                          }
                        />
                      ))}
                    </div>

                    <div className="password-checks">
                      <span className={passwordChecks.length ? "valid" : ""}>
                        <FiCheck />

                        {t("auth.characters")}
                      </span>

                      <span className={passwordChecks.capital ? "valid" : ""}>
                        <FiCheck />

                        {t("auth.capital")}
                      </span>

                      <span className={passwordChecks.number ? "valid" : ""}>
                        <FiCheck />

                        {t("auth.number")}
                      </span>

                      <span className={passwordChecks.special ? "valid" : ""}>
                        <FiCheck />

                        {t("auth.special")}
                      </span>
                    </div>
                  </div>
                )}

                {authMode === "signup" && (
                  <>
                    <label>
                      {t("auth.confirmPassword")}

                      <div className="signup-input-wrap">
                        <FiLock />

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,

                              confirmPassword: event.target.value,
                            }));

                            setError("");
                          }}
                          placeholder={t("auth.repeatPassword")}
                        />

                        <button
                          className="password-eye"
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((value) => !value)
                          }
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </label>

                    {form.confirmPassword &&
                      form.password === form.confirmPassword && (
                        <p className="password-match">
                          <FiCheck />

                          {t("auth.passwordsMatch")}
                        </p>
                      )}
                  </>
                )}

                {authMode === "signup" && (
                  <label className="signup-checkbox">
                    <input
                      type="checkbox"
                      checked={form.terms}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,

                          terms: event.target.checked,
                        }))
                      }
                    />

                    <span>
                      {t("auth.termsText")}{" "}
                      <button
                        className="signup-inline-link"
                        type="button"
                        onClick={() => {
                          closeAuth();

                          nav("terms");
                        }}
                      >
                        {t("auth.terms")}
                      </button>{" "}
                      {t("auth.and")}{" "}
                      <button
                        className="signup-inline-link"
                        type="button"
                        onClick={() => {
                          closeAuth();

                          nav("privacy");
                        }}
                      >
                        {t("auth.privacy")}
                      </button>
                    </span>
                  </label>
                )}

                {authMode === "login" && (
                  <div className="login-options">
                    <label className="signup-checkbox login-remember">
                      <input
                        type="checkbox"
                        checked={form.remember}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,

                            remember: event.target.checked,
                          }))
                        }
                      />

                      <span>{t("auth.rememberMe")}</span>
                    </label>

                    <button
                      className="forgot-password-button"
                      type="button"
                      onClick={() => switchAuthMode("forgot")}
                    >
                      {t("auth.forgotPassword")}
                    </button>
                  </div>
                )}

                {error && <div className="signup-error">{error}</div>}

                <button
                  className="accent-button modal-submit signup-submit-pro"
                  type="submit"
                >
                  {authMode === "signup" && t("auth.createAccount")}

                  {authMode === "login" && t("auth.login")}

                  {authMode === "forgot" && t("auth.resetPassword")}
                </button>

                {authMode !== "forgot" && (
                  <>
                    <div className="signup-divider">
                      <span />

                      <small>{t("auth.orContinue")}</small>

                      <span />
                    </div>

                    <button
                      className="google-signup"
                      type="button"
                      onClick={() =>
                        alert(
                          "Google authentication can be connected with Firebase."
                        )
                      }
                    >
                      <strong>G</strong>

                      {t("auth.continueGoogle")}
                    </button>
                  </>
                )}

                {authMode === "signup" && (
                  <p className="login-text">
                    {t("auth.alreadyAccount")}{" "}
                    <button
                      type="button"
                      onClick={() => switchAuthMode("login")}
                    >
                      {t("auth.login")}
                    </button>
                  </p>
                )}

                {authMode === "login" && (
                  <p className="login-text">
                    {t("auth.noAccount")}{" "}
                    <button
                      type="button"
                      onClick={() => switchAuthMode("signup")}
                    >
                      {t("auth.signup")}
                    </button>
                  </p>
                )}

                {authMode !== "forgot" && (
                  <div className="signup-benefits">
                    <span>
                      <FiCheck />

                      {t("auth.favouriteCities")}
                    </span>

                    <span>
                      <FiCheck />

                      {t("auth.weatherAlerts")}
                    </span>

                    <span>
                      <FiCheck />

                      {t("auth.personalSettings")}
                    </span>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
