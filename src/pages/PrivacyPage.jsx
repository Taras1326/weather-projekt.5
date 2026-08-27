import { useLanguage } from "../components/context/LanguageContext.jsx";

import "./LegalPage.css";

export default function PrivacyPage() {
  const { language } = useLanguage();

  const content = {
    uk: {
      title: "Політика конфіденційності",
      updated: "Останнє оновлення: 25 серпня 2026 року",
      sections: [
        {
          title: "1. Загальна інформація",
          text: "Ми поважаємо вашу конфіденційність і прагнемо обробляти персональні дані прозоро та безпечно.",
        },
        {
          title: "2. Які дані можуть оброблятися",
          text: "Залежно від функцій сайту можуть оброблятися вибране місто, мовні налаштування, одиниці температури, налаштування теми та інші технічні параметри.",
        },
        {
          title: "3. Геолокація",
          text: "Якщо ви дозволяєте доступ до геолокації, сайт може використовувати приблизне або точне місцезнаходження для відображення погоди у вашому регіоні. Доступ надається лише після дозволу користувача через браузер.",
        },
        {
          title: "4. LocalStorage",
          text: "Сайт може використовувати LocalStorage вашого браузера для збереження налаштувань, наприклад вибраної мови, теми, міста або одиниць вимірювання.",
        },
        {
          title: "5. Сторонні сервіси",
          text: "Для отримання погодних даних можуть використовуватися сторонні сервіси, зокрема Open-Meteo. Під час звернення до таких сервісів вони можуть отримувати технічну інформацію, необхідну для виконання запиту.",
        },
        {
          title: "6. Файли cookie",
          text: "Сам сайт може не використовувати рекламні cookie. Однак сторонні сервіси, якщо вони будуть інтегровані в майбутньому, можуть мати власні правила використання cookie.",
        },
        {
          title: "7. Передача даних",
          text: "Ми не продаємо персональні дані користувачів третім особам.",
        },
        {
          title: "8. Безпека",
          text: "Ми застосовуємо розумні технічні заходи для захисту інформації, однак жоден спосіб передачі або зберігання даних в Інтернеті не може гарантувати абсолютну безпеку.",
        },
        {
          title: "9. Ваші права",
          text: "Залежно від законодавства ви можете мати право на доступ, виправлення, видалення або обмеження обробки ваших персональних даних.",
        },
        {
          title: "10. Зміни політики",
          text: "Ця Політика конфіденційності може оновлюватися. Актуальна версія завжди буде доступна на цій сторінці.",
        },
      ],
    },

    en: {
      title: "Privacy Policy",
      updated: "Last updated: August 25, 2026",
      sections: [
        {
          title: "1. General Information",
          text: "We respect your privacy and aim to process personal information transparently and securely.",
        },
        {
          title: "2. Information We May Process",
          text: "Depending on the features of the website, we may process your selected city, language preference, temperature unit, theme preference and other technical settings.",
        },
        {
          title: "3. Geolocation",
          text: "If you allow location access, the website may use your approximate or precise location to display weather information for your area. Location access is only provided after permission through your browser.",
        },
        {
          title: "4. LocalStorage",
          text: "The website may use browser LocalStorage to remember settings such as your selected language, theme, city or measurement units.",
        },
        {
          title: "5. Third-Party Services",
          text: "Third-party services such as Open-Meteo may be used to obtain weather information. These services may receive technical information necessary to process requests.",
        },
        {
          title: "6. Cookies",
          text: "The website itself may not use advertising cookies. However, third-party services integrated in the future may have their own cookie policies.",
        },
        {
          title: "7. Sharing of Information",
          text: "We do not sell users' personal information to third parties.",
        },
        {
          title: "8. Security",
          text: "We use reasonable technical measures to protect information. However, no method of online transmission or electronic storage can guarantee absolute security.",
        },
        {
          title: "9. Your Rights",
          text: "Depending on applicable law, you may have the right to access, correct, delete or restrict the processing of your personal information.",
        },
        {
          title: "10. Changes to This Policy",
          text: "This Privacy Policy may be updated periodically. The latest version will always be available on this page.",
        },
      ],
    },

    de: {
      title: "Datenschutzerklärung",
      updated: "Letzte Aktualisierung: 25. August 2026",
      sections: [
        {
          title: "1. Allgemeine Informationen",
          text: "Wir respektieren Ihre Privatsphäre und bemühen uns um eine transparente und sichere Verarbeitung personenbezogener Daten.",
        },
        {
          title: "2. Welche Daten verarbeitet werden können",
          text: "Abhängig von den Funktionen der Website können ausgewählte Stadt, Spracheinstellungen, Temperatureinheit, Design-Einstellungen und weitere technische Einstellungen verarbeitet werden.",
        },
        {
          title: "3. Standortdaten",
          text: "Wenn Sie den Zugriff auf Ihren Standort erlauben, kann die Website Ihren ungefähren oder genauen Standort verwenden, um Wetterinformationen für Ihre Region anzuzeigen. Der Zugriff erfolgt nur nach Ihrer Zustimmung im Browser.",
        },
        {
          title: "4. LocalStorage",
          text: "Die Website kann LocalStorage des Browsers verwenden, um Einstellungen wie Sprache, Design, Stadt oder Maßeinheiten zu speichern.",
        },
        {
          title: "5. Dienste von Drittanbietern",
          text: "Zur Bereitstellung von Wetterinformationen können Dienste von Drittanbietern wie Open-Meteo eingesetzt werden. Dabei können technische Informationen übermittelt werden, die für die Bearbeitung einer Anfrage erforderlich sind.",
        },
        {
          title: "6. Cookies",
          text: "Die Website selbst verwendet möglicherweise keine Werbe-Cookies. Zukünftig eingebundene Drittanbieter können jedoch eigene Cookie-Richtlinien verwenden.",
        },
        {
          title: "7. Weitergabe von Daten",
          text: "Wir verkaufen keine personenbezogenen Daten unserer Nutzer an Dritte.",
        },
        {
          title: "8. Sicherheit",
          text: "Wir setzen angemessene technische Maßnahmen zum Schutz von Informationen ein. Eine vollständige Sicherheit bei der Übertragung oder Speicherung von Daten im Internet kann jedoch nicht garantiert werden.",
        },
        {
          title: "9. Ihre Rechte",
          text: "Je nach geltendem Recht können Sie das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer personenbezogenen Daten haben.",
        },
        {
          title: "10. Änderungen",
          text: "Diese Datenschutzerklärung kann regelmäßig aktualisiert werden. Die aktuelle Version ist immer auf dieser Seite verfügbar.",
        },
      ],
    },

    ru: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление: 25 августа 2026 года",
      sections: [
        {
          title: "1. Общая информация",
          text: "Мы уважаем вашу конфиденциальность и стремимся обрабатывать персональные данные прозрачно и безопасно.",
        },
        {
          title: "2. Какие данные могут обрабатываться",
          text: "В зависимости от функций сайта могут обрабатываться выбранный город, язык, единицы температуры, настройки темы и другие технические параметры.",
        },
        {
          title: "3. Геолокация",
          text: "Если вы разрешаете доступ к местоположению, сайт может использовать приблизительное или точное местоположение для отображения погоды в вашем регионе. Доступ предоставляется только после разрешения пользователя через браузер.",
        },
        {
          title: "4. LocalStorage",
          text: "Сайт может использовать LocalStorage браузера для сохранения таких настроек, как язык, тема, выбранный город или единицы измерения.",
        },
        {
          title: "5. Сторонние сервисы",
          text: "Для получения погодной информации могут использоваться сторонние сервисы, включая Open-Meteo. Такие сервисы могут получать техническую информацию, необходимую для обработки запроса.",
        },
        {
          title: "6. Файлы cookie",
          text: "Сам сайт может не использовать рекламные cookie. Однако сторонние сервисы, которые могут быть добавлены в будущем, могут иметь собственные правила использования cookie.",
        },
        {
          title: "7. Передача данных",
          text: "Мы не продаем персональные данные пользователей третьим лицам.",
        },
        {
          title: "8. Безопасность",
          text: "Мы применяем разумные технические меры для защиты информации. Однако ни один способ передачи или хранения информации в интернете не может гарантировать абсолютную безопасность.",
        },
        {
          title: "9. Ваши права",
          text: "В зависимости от применимого законодательства вы можете иметь право на доступ, исправление, удаление или ограничение обработки ваших персональных данных.",
        },
        {
          title: "10. Изменения политики",
          text: "Настоящая Политика конфиденциальности может периодически обновляться. Актуальная версия всегда будет доступна на этой странице.",
        },
      ],
    },
  };

  const page = content[language] || content.en;

  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <h1>{page.title}</h1>

        <p className="legal-page__updated">{page.updated}</p>

        <div className="legal-page__content">
          {page.sections.map((section) => (
            <section key={section.title} className="legal-page__section">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}