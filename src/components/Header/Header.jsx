import { useState } from "react";
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
} from "react-icons/fi";
import logo from "./logo-projekt.png";

export default function Header({
  page,
  onNavigate,
  theme,
  onToggleTheme,
  unit,
  onToggleUnit,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weather-user")) || null;
    } catch {
      return null;
    }
  });
  const [form, setForm] = useState({ username: "", email: "" });

  const nav = (target) => {
    onNavigate(target);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (event) => {
    event.preventDefault();
    if (!form.username.trim() || !form.email.trim()) return;
    const next = { username: form.username.trim(), email: form.email.trim() };
    localStorage.setItem("weather-user", JSON.stringify(next));
    setUser(next);
    setSignupOpen(false);
    setForm({ username: "", email: "" });
  };

  const logout = () => {
    localStorage.removeItem("weather-user");
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner container-wide">
          <button
            className="brand-button"
            type="button"
            onClick={() => nav("home")}
            aria-label="Go to dashboard"
          >
            <img src={logo} alt="24/7 forecast" />
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => nav("home")}
            >
              <FiHome /> Dashboard
            </button>
            <button
              className={page === "map" ? "active" : ""}
              onClick={() => nav("map")}
            >
              <FiMap /> Weather map
            </button>
            <button
              className={page === "travel" ? "active" : ""}
              onClick={() => nav("travel")}
            >
              <FiCompass /> Travel planner
            </button>
            <a href="#contacts">Contacts</a>
          </nav>

          <div className="header-tools">
            <button
              className="unit-toggle"
              type="button"
              onClick={onToggleUnit}
              title="Change temperature unit"
            >
              °{unit}
            </button>
            <button
              className="icon-button theme-toggle"
              type="button"
              onClick={onToggleTheme}
              title="Toggle dark theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            {!user && (
              <button
                className="accent-button signup-compact"
                onClick={() => setSignupOpen(true)}
              >
                Sign Up
              </button>
            )}
            <div className="profile-wrap">
              <button
                className="avatar-button"
                type="button"
                onClick={() =>
                  user ? setProfileOpen((value) => !value) : setSignupOpen(true)
                }
                aria-label="Profile"
              >
                <FiUser />
              </button>
              {user && profileOpen && (
                <div className="profile-menu glass-panel">
                  <strong>{user.username}</strong>
                  <span>{user.email}</span>
                  <button onClick={logout}>
                    <FiLogOut /> Log out
                  </button>
                </div>
              )}
            </div>
            <button
              className="mobile-nav-toggle icon-button"
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="mobile-nav">
            <button onClick={() => nav("home")}>Dashboard</button>
            <button onClick={() => nav("map")}>Weather map</button>
            <button onClick={() => nav("travel")}>Travel planner</button>
            <a href="#contacts" onClick={() => setMobileOpen(false)}>
              Contacts
            </a>
          </nav>
        )}
      </header>

      {signupOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={() => setSignupOpen(false)}
        >
          <form
            className="signup-modal"
            onSubmit={submit}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              type="button"
              onClick={() => setSignupOpen(false)}
            >
              <FiX />
            </button>
            <p className="eyebrow">24/7 forecast</p>
            <h2>Create your profile</h2>
            <p>Save your favourite cities and preferences on this device.</p>
            <label>
              Name
              <input
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, username: event.target.value }))
                }
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="you@example.com"
              />
            </label>
            <button className="accent-button modal-submit" type="submit">
              Create profile
            </button>
          </form>
        </div>
      )}
    </>
  );
}
