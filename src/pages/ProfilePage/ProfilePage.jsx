import { useEffect, useRef, useState } from "react";

import {
  FiCamera,
  FiCheck,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import { useLanguage } from "../../components/context/LanguageContext.jsx";

import "./ProfilePage.css";

const PROFILE_KEY = "weather-profile";
const USER_KEY = "weather-user";

export default function ProfilePage() {
  const { language, t } = useLanguage();

  const fileInputRef = useRef(null);

  const extraText = {
    en: {
      subtitle:
        "Manage your personal information, profile photo and default location.",
      changePhoto: "Change photo",
      removePhoto: "Remove photo",
      personalInfo: "Personal information",
      personalInfoText: "Change your username, email and default location.",
      defaultCity: "Default city",
      country: "Country",
      cityPlaceholder: "Berlin",
      countryPlaceholder: "Germany",
      saved: "Changes saved successfully.",
      invalidImage: "Please choose an image file.",
    },

    de: {
      subtitle:
        "Verwalte deine persönlichen Daten, dein Profilbild und deinen Standardstandort.",
      changePhoto: "Foto ändern",
      removePhoto: "Foto entfernen",
      personalInfo: "Persönliche Informationen",
      personalInfoText:
        "Ändere deinen Benutzernamen, deine E-Mail-Adresse und deinen Standardstandort.",
      defaultCity: "Standardstadt",
      country: "Land",
      cityPlaceholder: "Berlin",
      countryPlaceholder: "Deutschland",
      saved: "Änderungen wurden erfolgreich gespeichert.",
      invalidImage: "Bitte wähle eine Bilddatei aus.",
    },

    uk: {
      subtitle:
        "Керуйте особистими даними, фото профілю та основним місцезнаходженням.",
      changePhoto: "Змінити фото",
      removePhoto: "Видалити фото",
      personalInfo: "Особиста інформація",
      personalInfoText:
        "Змініть ім’я користувача, електронну пошту та основне місцезнаходження.",
      defaultCity: "Місто за замовчуванням",
      country: "Країна",
      cityPlaceholder: "Київ",
      countryPlaceholder: "Україна",
      saved: "Зміни успішно збережено.",
      invalidImage: "Будь ласка, виберіть файл зображення.",
    },

    ru: {
      subtitle:
        "Управляйте личными данными, фотографией профиля и основным местоположением.",
      changePhoto: "Изменить фото",
      removePhoto: "Удалить фото",
      personalInfo: "Личная информация",
      personalInfoText:
        "Измените имя пользователя, электронную почту и основное местоположение.",
      defaultCity: "Город по умолчанию",
      country: "Страна",
      cityPlaceholder: "Москва",
      countryPlaceholder: "Германия",
      saved: "Изменения успешно сохранены.",
      invalidImage: "Пожалуйста, выберите файл изображения.",
    },
  };

  const tx = extraText[language] || extraText.en;

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(PROFILE_KEY)) || {
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

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    city: profile?.city || "",
    country: profile?.country || "",
  });

  useEffect(() => {
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      city: profile?.city || "",
      country: profile?.country || "",
    });
  }, [user, profile]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(tx.invalidImage);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const nextProfile = {
        ...profile,
        avatar: reader.result,
      };

      setProfile(nextProfile);

      localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));

      window.dispatchEvent(new Event("weather-user-updated"));
    };

    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    const nextProfile = {
      ...profile,
      avatar: "",
    };

    setProfile(nextProfile);

    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.dispatchEvent(new Event("weather-user-updated"));
  };

  const saveProfile = () => {
    const nextUser = {
      ...user,
      username: form.username.trim(),
      email: form.email.trim(),
    };

    const nextProfile = {
      ...profile,
      city: form.city.trim(),
      country: form.country.trim(),
    };

    setUser(nextUser);
    setProfile(nextProfile);

    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));

    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));

    try {
      const account =
        JSON.parse(localStorage.getItem("weather-account")) || null;

      if (account) {
        localStorage.setItem(
          "weather-account",
          JSON.stringify({
            ...account,
            username: nextUser.username,
            email: nextUser.email,
          })
        );
      }
    } catch {
      // ignore
    }

    setEditing(false);
    setSaved(true);

    window.dispatchEvent(new Event("weather-user-updated"));

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const cancelEditing = () => {
    setForm({
      username: user?.username || "",
      email: user?.email || "",
      city: profile?.city || "",
      country: profile?.country || "",
    });

    setEditing(false);
  };

  return (
    <main className="account-page profile-page">
      <div className="account-container">
        <div className="account-page-heading">
          <div>
            <span className="account-eyebrow">{t("profile.account")}</span>

            <h1>{t("profile.myProfile")}</h1>

            <p>{tx.subtitle}</p>
          </div>

          {!editing && (
            <button
              className="account-primary-button"
              type="button"
              onClick={() => setEditing(true)}
            >
              <FiEdit3 />

              {t("profile.editProfile")}
            </button>
          )}
        </div>

        {saved && (
          <div className="profile-success">
            <FiCheck />

            {tx.saved}
          </div>
        )}

        <section className="profile-card profile-main-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {profile.avatar ? (
                <img src={profile.avatar} alt={user?.username || "User"} />
              ) : (
                <FiUser />
              )}

              <button
                className="profile-camera-button"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label={tx.changePhoto}
              >
                <FiCamera />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />

            <div className="profile-avatar-info">
              <h2>{user?.username || "User"}</h2>

              <p>{user?.email || t("profile.email")}</p>

              <div className="profile-avatar-actions">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiCamera />

                  {tx.changePhoto}
                </button>

                {profile.avatar && (
                  <button
                    className="danger"
                    type="button"
                    onClick={removeAvatar}
                  >
                    <FiTrash2 />

                    {tx.removePhoto}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-section-title">
            <h2>{tx.personalInfo}</h2>

            <p>{tx.personalInfoText}</p>
          </div>

          <div className="profile-form-grid">
            <label>
              <span>{t("profile.username")}</span>

              <div className="profile-input-wrap">
                <FiUser />

                <input
                  type="text"
                  value={form.username}
                  disabled={!editing}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label>
              <span>{t("profile.email")}</span>

              <div className="profile-input-wrap">
                <FiMail />

                <input
                  type="email"
                  value={form.email}
                  disabled={!editing}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label>
              <span>{tx.defaultCity}</span>

              <div className="profile-input-wrap">
                <FiMapPin />

                <input
                  type="text"
                  placeholder={tx.cityPlaceholder}
                  value={form.city}
                  disabled={!editing}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      city: event.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label>
              <span>{tx.country}</span>

              <div className="profile-input-wrap">
                <FiMapPin />

                <input
                  type="text"
                  placeholder={tx.countryPlaceholder}
                  value={form.country}
                  disabled={!editing}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      country: event.target.value,
                    }))
                  }
                />
              </div>
            </label>
          </div>

          {editing && (
            <div className="profile-form-actions">
              <button
                className="account-secondary-button"
                type="button"
                onClick={cancelEditing}
              >
                {t("common.cancel")}
              </button>

              <button
                className="account-primary-button"
                type="button"
                onClick={saveProfile}
              >
                <FiCheck />

                {t("profile.saveChanges")}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
