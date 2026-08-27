import { useLanguage } from "../components/context/LanguageContext.jsx";

import "./LegalPage.css";

export default function TermsPage() {
  const { language } = useLanguage();

  const content = {
    uk: {
      title: "Умови використання",
      updated: "Останнє оновлення: 25 серпня 2026 року",
      sections: [
        {
          title: "1. Загальні положення",
          text: "Використовуючи цей вебсайт, ви погоджуєтесь із цими Умовами використання. Якщо ви не погоджуєтесь з будь-якою частиною цих умов, будь ласка, припиніть використання сайту.",
        },
        {
          title: "2. Призначення сайту",
          text: "Сайт надає інформацію про поточну погоду, прогноз погоди, погодинний прогноз, якість повітря та інші погодні дані. Інформація має довідковий характер.",
        },
        {
          title: "3. Точність погодних даних",
          text: "Ми намагаємося надавати актуальну інформацію, однак не можемо гарантувати абсолютну точність прогнозів. Погодні умови можуть змінюватися, тому важливі рішення слід приймати з урахуванням офіційних попереджень місцевих служб.",
        },
        {
          title: "4. Джерела даних",
          text: "Погодні дані можуть надходити від сторонніх сервісів, зокрема Open-Meteo. Ми не контролюємо роботу сторонніх постачальників та не несемо відповідальності за тимчасову недоступність або помилки в їхніх даних.",
        },
        {
          title: "5. Використання сайту",
          text: "Заборонено використовувати сайт для незаконної діяльності, намагатися порушити його роботу, отримати несанкціонований доступ до систем або використовувати автоматизовані засоби, які можуть створювати надмірне навантаження на сервіс.",
        },
        {
          title: "6. Інтелектуальна власність",
          text: "Дизайн, структура, програмний код та оригінальні матеріали сайту захищені відповідним законодавством. Використання матеріалів сайту без дозволу допускається лише у випадках, передбачених законом.",
        },
        {
          title: "7. Обмеження відповідальності",
          text: "Сайт надається за принципом «як є». Ми не несемо відповідальності за прямі або непрямі збитки, що виникли внаслідок використання або неможливості використання інформації з сайту.",
        },
        {
          title: "8. Зміни умов",
          text: "Ми можемо періодично змінювати ці Умови використання. Актуальна версія завжди публікується на цій сторінці.",
        },
        {
          title: "9. Контакти",
          text: "Якщо у вас є питання щодо цих Умов використання, ви можете зв'язатися з нами через контактну форму або електронну пошту, вказану на сайті.",
        },
      ],
    },

    en: {
      title: "Terms of Use",
      updated: "Last updated: August 25, 2026",
      sections: [
        {
          title: "1. General",
          text: "By using this website, you agree to these Terms of Use. If you do not agree with any part of these terms, please stop using the website.",
        },
        {
          title: "2. Purpose of the Website",
          text: "The website provides current weather information, weather forecasts, hourly forecasts, air quality information and other weather-related data. The information is provided for informational purposes only.",
        },
        {
          title: "3. Accuracy of Weather Data",
          text: "We aim to provide up-to-date information, but we cannot guarantee the absolute accuracy of weather forecasts. Weather conditions may change, so important decisions should also take official local warnings into account.",
        },
        {
          title: "4. Data Sources",
          text: "Weather data may be provided by third-party services, including Open-Meteo. We do not control third-party providers and are not responsible for temporary service interruptions or inaccuracies in their data.",
        },
        {
          title: "5. Use of the Website",
          text: "You may not use the website for illegal activities, attempt to disrupt its operation, gain unauthorized access to systems or use automated tools that may place excessive load on the service.",
        },
        {
          title: "6. Intellectual Property",
          text: "The design, structure, source code and original content of the website are protected by applicable law. Reuse of website materials without permission is allowed only where permitted by law.",
        },
        {
          title: "7. Limitation of Liability",
          text: "The website is provided on an 'as is' basis. We are not responsible for direct or indirect damages resulting from the use or inability to use information provided by the website.",
        },
        {
          title: "8. Changes to These Terms",
          text: "We may update these Terms of Use from time to time. The latest version will always be available on this page.",
        },
        {
          title: "9. Contact",
          text: "If you have questions about these Terms of Use, you can contact us through the contact form or email address provided on the website.",
        },
      ],
    },

    de: {
      title: "Nutzungsbedingungen",
      updated: "Letzte Aktualisierung: 25. August 2026",
      sections: [
        {
          title: "1. Allgemeines",
          text: "Durch die Nutzung dieser Website erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, verwenden Sie die Website bitte nicht weiter.",
        },
        {
          title: "2. Zweck der Website",
          text: "Die Website stellt Informationen zum aktuellen Wetter, Wettervorhersagen, stündlichen Vorhersagen, zur Luftqualität und weitere wetterbezogene Daten bereit. Die Informationen dienen ausschließlich Informationszwecken.",
        },
        {
          title: "3. Genauigkeit der Wetterdaten",
          text: "Wir bemühen uns, aktuelle Informationen bereitzustellen, können jedoch keine vollständige Genauigkeit der Wettervorhersagen garantieren. Wetterbedingungen können sich ändern. Bei wichtigen Entscheidungen sollten deshalb auch offizielle lokale Warnungen berücksichtigt werden.",
        },
        {
          title: "4. Datenquellen",
          text: "Wetterdaten können von Drittanbietern wie Open-Meteo bereitgestellt werden. Wir haben keinen Einfluss auf deren Dienste und übernehmen keine Haftung für vorübergehende Ausfälle oder fehlerhafte Daten.",
        },
        {
          title: "5. Nutzung der Website",
          text: "Die Website darf nicht für rechtswidrige Zwecke verwendet werden. Ebenso sind Versuche untersagt, den Betrieb der Website zu stören, unbefugten Zugriff auf Systeme zu erhalten oder automatisierte Werkzeuge einzusetzen, die den Dienst übermäßig belasten.",
        },
        {
          title: "6. Geistiges Eigentum",
          text: "Design, Struktur, Programmcode und eigene Inhalte dieser Website sind durch geltendes Recht geschützt. Eine Nutzung ohne Genehmigung ist nur zulässig, soweit dies gesetzlich erlaubt ist.",
        },
        {
          title: "7. Haftungsbeschränkung",
          text: "Die Website wird im bestehenden Zustand bereitgestellt. Wir übernehmen keine Haftung für direkte oder indirekte Schäden, die durch die Nutzung oder Nichtverfügbarkeit der bereitgestellten Informationen entstehen.",
        },
        {
          title: "8. Änderungen der Bedingungen",
          text: "Wir können diese Nutzungsbedingungen gelegentlich aktualisieren. Die jeweils aktuelle Version wird auf dieser Seite veröffentlicht.",
        },
        {
          title: "9. Kontakt",
          text: "Bei Fragen zu diesen Nutzungsbedingungen können Sie uns über das Kontaktformular oder die auf der Website angegebene E-Mail-Adresse kontaktieren.",
        },
      ],
    },

    ru: {
      title: "Условия использования",
      updated: "Последнее обновление: 25 августа 2026 года",
      sections: [
        {
          title: "1. Общие положения",
          text: "Используя этот сайт, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с какой-либо частью условий, пожалуйста, прекратите использование сайта.",
        },
        {
          title: "2. Назначение сайта",
          text: "Сайт предоставляет информацию о текущей погоде, прогнозе погоды, почасовом прогнозе, качестве воздуха и другие погодные данные. Информация предоставляется исключительно в справочных целях.",
        },
        {
          title: "3. Точность погодных данных",
          text: "Мы стараемся предоставлять актуальную информацию, однако не можем гарантировать абсолютную точность прогнозов. Погодные условия могут изменяться, поэтому при принятии важных решений следует также учитывать официальные предупреждения местных служб.",
        },
        {
          title: "4. Источники данных",
          text: "Погодные данные могут предоставляться сторонними сервисами, включая Open-Meteo. Мы не контролируем работу сторонних поставщиков и не отвечаем за временную недоступность или ошибки в их данных.",
        },
        {
          title: "5. Использование сайта",
          text: "Запрещается использовать сайт в незаконных целях, пытаться нарушить его работу, получать несанкционированный доступ к системам или использовать автоматизированные средства, создающие чрезмерную нагрузку на сервис.",
        },
        {
          title: "6. Интеллектуальная собственность",
          text: "Дизайн, структура, программный код и оригинальные материалы сайта защищены действующим законодательством. Использование материалов без разрешения допускается только в случаях, предусмотренных законом.",
        },
        {
          title: "7. Ограничение ответственности",
          text: "Сайт предоставляется по принципу «как есть». Мы не несем ответственности за прямой или косвенный ущерб, возникший в результате использования или невозможности использования информации сайта.",
        },
        {
          title: "8. Изменение условий",
          text: "Мы можем периодически изменять настоящие Условия использования. Актуальная версия всегда публикуется на этой странице.",
        },
        {
          title: "9. Контакты",
          text: "Если у вас есть вопросы относительно настоящих Условий использования, вы можете связаться с нами через контактную форму или электронную почту, указанную на сайте.",
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