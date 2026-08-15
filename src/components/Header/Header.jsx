import { useState } from "react";
import { FiUser, FiX, FiLogOut, FiChevronDown } from "react-icons/fi";

import "./Header.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
    };

    localStorage.setItem("weather-user", JSON.stringify(newUser));

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
     OPEN SIGN UP
  ======================================== */

  const handleOpenSignup = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsModalOpen(true);
  };

  /* ========================================
     CLOSE MOBILE MENU
  ======================================== */

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  /* ========================================
     CLOSE MOBILE MENU AFTER LINK
  ======================================== */

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========================================
          HEADER
      ======================================== */}

      <header className="header">
        <div className="header-container">

          {/* LOGO */}

          <a href="/" className="header-logo">
            <img
              src="./src/components/Header/logo-projekt.png"
              alt="247 forecast"
            />
          </a>

          {/* DESKTOP NAVIGATION */}

          <nav className="navigation">
            <a href="#about">Who we are</a>

            <a href="#contacts">Contacts</a>

            <a href="#menu">Menu</a>
          </nav>

          {/* DESKTOP ACTIONS */}

          <div className="header-actions">

            {user ? (
              <div className="user-wrapper">

                <button
                  type="button"
                  className="user-name"
                  onClick={handleUserClick}
                >
                  {user.username}
                </button>

                {isUserMenuOpen && (
                  <div className="user-menu">

                    <div className="user-menu-info">

                      <FiUser />

                      <div>
                        <strong>{user.username}</strong>

                        <span>{user.email}</span>
                      </div>

                    </div>

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

            <button
              type="button"
              className="avatar-button"
              onClick={() => {
                if (user) {
                  handleUserClick();
                } else {
                  handleOpenSignup();
                }
              }}
              aria-label="Open profile"
            >
              <FiUser />
            </button>

          </div>

          {/* ========================================
              MOBILE MENU BUTTON
          ======================================== */}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={handleMobileMenuToggle}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span>Menu</span>

            <FiChevronDown
              className={
                isMobileMenuOpen
                  ? "mobile-menu-icon mobile-menu-icon-open"
                  : "mobile-menu-icon"
              }
            />
          </button>

        </div>


        {/* ========================================
            MOBILE MENU PANEL
        ======================================== */}

        {isMobileMenuOpen && (
          <div className="mobile-menu-panel">

            <nav className="mobile-navigation">

              <a
                href="#about"
                onClick={handleMobileLinkClick}
              >
                Who we are
              </a>

              <a
                href="#contacts"
                onClick={handleMobileLinkClick}
              >
                Contacts
              </a>

              <a
                href="#menu"
                onClick={handleMobileLinkClick}
              >
                Menu
              </a>

            </nav>


            {/* MOBILE USER */}

            <div className="mobile-menu-actions">

              <div className="mobile-avatar">
                <FiUser />
              </div>

              {user ? (
                <button
                  type="button"
                  className="mobile-user-name"
                  onClick={handleUserClick}
                >
                  {user.username}
                </button>
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
            onClick={event => event.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              className="modal-close"
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              <FiX />
            </button>


            {/* TITLE */}

            <h2>Sign up</h2>


            {/* FORM */}

            <form
              className="signup-form"
              onSubmit={handleSubmit}
            >

              {/* USERNAME */}

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />


              {/* EMAIL */}

              <label htmlFor="email">
                E-Mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleChange}
              />


              {/* PASSWORD */}

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />


              {/* SAVE */}

              <button
                className="save-button"
                type="submit"
              >
                Sign up
              </button>


              {/* LOGIN */}

              <p className="login-text">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => {
                    alert(
                      "Login functionality will be added later."
                    );
                  }}
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