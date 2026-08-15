import {
    FiGithub,
    FiInstagram,
    FiFacebook,
    FiMail,
  } from 'react-icons/fi';
  
  import './Footer.css';
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="footer-container container">
  
          <div className="footer-logo">
            Weather
            <span>App</span>
          </div>
  
          <div className="footer-info">
            <p>
            Address
            </p>
  
            <p>
            Svobody str. 35
Kyiv
Ukraine
            </p>
          </div>
  
          <div className="footer-links">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
  
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FiInstagram />
            </a>
  
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FiFacebook />
            </a>
  
            <a
              href="mailto:weather@example.com"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
  
        </div>
  
        <div className="footer-bottom">
          <p>
            © 2026 Weather App. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer;