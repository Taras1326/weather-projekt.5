import { useEffect, useState } from "react";
import {
  FiUser,
  FiX,
  FiLogOut,
  FiChevronDown,
  FiSearch,
  FiMoon,
  FiSun,
  FiHeart,
  FiMap,
  FiClock,
  FiCalendar,
  FiHome,
  FiCloud,
  FiMenu,
} from "react-icons/fi";

import "./Header.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("weather-theme") === "dark";
  });

  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("weather-unit") || "C";
  });

  const [searchValue, setSearchValue] = useState("");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("weather-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  /* ========================================
     THEME
  ======================================== */

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);

    localStorage.setItem(
      "weather-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  /* ========================================
     UNIT
  ======================================== */

  const handleUnitChange = () => {
    const newUnit = unit === "C" ? "F" : "C";

    setUnit(newUnit);
    localStorage.setItem("weather-unit", newUnit);
  };

  /* ========================================
     SEARCH
  ======================================== */

  const handleSearch = event => {
    event.preventDefault();

    const city = searchValue.trim();

    if (!city) return;

    console.log("Search city:", city);

    setSearchValue("");
  };

  /* ========================================
     FORM CHANGE
  ======================================== */

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ========================================
     SIGN UP
  ======================================== */

  const handleSubmit = event => {
    event.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
    };

    localStorage.setItem(
      "weather-user",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    setFormData({
      username: "",
      email: "",
      password: "",
    });

    setIsModalOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  /* ========================================
     LOG OUT
  ======================================== */

  const handleLogout = () => {
    localStorage.removeItem("weather-user");

    setUser(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  /* ========================================
     USER MENU
  ======================================== */

  const handleUserClick = () => {
    setIsUserMenuOpen(prev => !prev);
  };

  /* ========================================
     SIGN UP
  ======================================== */

  const handleOpenSignup = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsModalOpen(true);
  };

  /* ========================================
     MOBILE MENU
  ======================================== */

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsUserMenuOpen(false);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">

        <div className="header-container">

          {/* ========================================
              LOGO
          ======================================== */}

          <a href="/" className="header-logo">
            <img
              src="./src/components/Header/logo-projekt.png"
              alt="Weather 24/7"
            />

            <div className="logo-text">
              <strong>WEATHER</strong>
              <span>24/7 FORECAST</span>
            </div>
          </a>

          {/* ========================================
              DESKTOP NAVIGATION
          ======================================== */}

          <nav className="navigation">

            <a href="/" className="navigation-link">
              <FiHome />
              <span>Home</span>
            </a>

            <a href="#forecast" className="navigation-link">
              <FiCloud />
              <span>Forecast</span>
            </a>

            <a href="#hourly" className="navigation-link">
              <FiClock />
              <span>Hourly</span>
            </a>

            <a href="#weekly" className="navigation-link">
              <FiCalendar />
              <span>7 Days</span>
            </a>

            <a href="#map" className="navigation-link">
              <FiMap />
              <span>Maps</span>
            </a>

            <a href="#news" className="navigation-link">
              <span>News</span>
            </a>

          </nav>

          {/* ========================================
              SEARCH
          ======================================== */}

          <form
            className="header-search"
            onSubmit={handleSearch}
          >

            <FiSearch />

            <input
              type="search"
              placeholder="Search city..."
              value={searchValue}
              onChange={event =>
                setSearchValue(event.target.value)
              }
            />

          </form>

          {/* ========================================
              HEADER ACTIONS
          ======================================== */}

          <div className="header-actions">

            {/* UNIT */}

            <button
              type="button"
              className="header-icon-button unit-button"
              onClick={handleUnitChange}
              title="Change temperature unit"
            >
              <span>°{unit}</span>
            </button>

            {/* DARK MODE */}

            <button
              type="button"
              className="header-icon-button"
              onClick={() =>
                setIsDarkMode(prev => !prev)
              }
              aria-label="Toggle dark mode"
              title="Toggle theme"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* FAVORITES */}

            <button
              type="button"
              className="header-icon-button favorite-button"
              title="Favorites"
            >
              <FiHeart />
            </button>

            {/* USER */}

            {user ? (
              <div className="user-wrapper">

                <button
                  type="button"
                  className="user-name"
                  onClick={handleUserClick}
                >
                  <span>{user.username}</span>
                  <FiChevronDown
                    className={
                      isUserMenuOpen
                        ? "user-arrow user-arrow-open"
                        : "user-arrow"
                    }
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="user-menu">

                    <div className="user-menu-info">

                      <div className="user-menu-avatar">
                        <FiUser />
                      </div>

                      <div>
                        <strong>
                          {user.username}
                        </strong>

                        <span>
                          {user.email}
                        </span>
                      </div>

                    </div>

                    <button
                      type="button"
                      className="profile-menu-item"
                    >
                      <FiUser />
                      <span>My profile</span>
                    </button>

                    <button
                      type="button"
                      className="profile-menu-item"
                    >
                      <FiHeart />
                      <span>Favorites</span>
                    </button>

                    <button
                      type="button"
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      <FiLogOut />
                      <span>Log out</span>
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <button
                type="button"
                className="signup-button"
                onClick={handleOpenSignup}
              >
                Sign Up
              </button>
            )}

          </div>

          {/* ========================================
              MOBILE BUTTON
          ======================================== */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={handleMobileMenuToggle}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>

        </div>

        {/* ========================================
            MOBILE MENU
        ======================================== */}

        {isMobileMenuOpen && (
          <div className="mobile-menu-panel">

            {/* MOBILE SEARCH */}

            <form
              className="mobile-search"
              onSubmit={handleSearch}
            >
              <FiSearch />

              <input
                type="search"
                placeholder="Search city..."
                value={searchValue}
                onChange={event =>
                  setSearchValue(event.target.value)
                }
              />
            </form>

            {/* MOBILE NAV */}

            <nav className="mobile-navigation">

              <a
                href="/"
                onClick={handleMobileLinkClick}
              >
                <FiHome />
                <span>Home</span>
              </a>

              <a
                href="#forecast"
                onClick={handleMobileLinkClick}
              >
                <FiCloud />
                <span>Forecast</span>
              </a>

              <a
                href="#hourly"
                onClick={handleMobileLinkClick}
              >
                <FiClock />
                <span>Hourly</span>
              </a>

              <a
                href="#weekly"
                onClick={handleMobileLinkClick}
              >
                <FiCalendar />
                <span>7 Days</span>
              </a>

              <a
                href="#map"
                onClick={handleMobileLinkClick}
              >
                <FiMap />
                <span>Maps</span>
              </a>

              <a
                href="#news"
                onClick={handleMobileLinkClick}
              >
                <span>News</span>
              </a>

            </nav>

            {/* MOBILE SETTINGS */}

            <div className="mobile-settings">

              <button
                type="button"
                onClick={handleUnitChange}
              >
                🌡
                <span>Temperature</span>
                <strong>°{unit}</strong>
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsDarkMode(prev => !prev)
                }
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
                <span>Theme</span>
                <strong>
                  {isDarkMode ? "Dark" : "Light"}
                </strong>
              </button>

              <button type="button">
                <FiHeart />
                <span>Favorites</span>
              </button>

            </div>

            {/* MOBILE USER */}

            <div className="mobile-user-section">

              <div className="mobile-avatar">
                <FiUser />
              </div>

              {user ? (
                <>
                  <div className="mobile-user-info">
                    <strong>{user.username}</strong>
                    <span>{user.email}</span>
                  </div>

                  <button
                    type="button"
                    className="mobile-logout"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="mobile-signup-button"
                  onClick={handleOpenSignup}
                >
                  Sign Up
                </button>
              )}

            </div>

          </div>
        )}

      </header>

      {/* ========================================
          SIGN UP MODAL
      ======================================== */}

      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >

          <div
            className="signup-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              type="button"
              onClick={() =>
                setIsModalOpen(false)
              }
              aria-label="Close"
            >
              <FiX />
            </button>

            <div className="modal-icon">
              <FiUser />
            </div>

            <h2>Create your account</h2>

            <p className="modal-description">
              Save your favorite cities and personalize
              your weather experience.
            </p>

            <form
              className="signup-form"
              onSubmit={handleSubmit}
            >

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />

              <label htmlFor="email">
                E-Mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                className="save-button"
                type="submit"
              >
                Create account
              </button>

              <p className="login-text">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Login functionality will be added later."
                    )
                  }
                >
                  Log In
                </button>
              </p>

            </form>

          </div>

        </div>
      )}

    </>
  );
}

export default Header;