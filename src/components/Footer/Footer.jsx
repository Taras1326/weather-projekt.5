import { FiFacebook, FiGithub, FiInstagram, FiMail } from 'react-icons/fi';
import logo from '../Header/logo-projekt.png';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer" id="contacts">
      <div className="footer-inner container-wide">
        <img src={logo} alt="24/7 forecast" className="footer-logo-img" />
        <div><h3>Explore</h3><button onClick={() => onNavigate('home')}>Dashboard</button><button onClick={() => onNavigate('map')}>Weather map</button><button onClick={() => onNavigate('travel')}>Travel planner</button></div>
        <div><h3>Address</h3><p>Svobody str. 35<br />Kyiv<br />Ukraine</p></div>
        <div><h3>Contact us</h3><div className="socials"><a href="https://github.com/Taras1326/weather-projekt.5" target="_blank" rel="noreferrer"><FiGithub /></a><a href="https://instagram.com/" target="_blank" rel="noreferrer"><FiInstagram /></a><a href="https://facebook.com/" target="_blank" rel="noreferrer"><FiFacebook /></a><a href="mailto:weather@example.com"><FiMail /></a></div></div>
      </div>
      <div className="footer-bottom container-wide"><span>© 2026 24/7 Forecast</span><span>Weather data by Open-Meteo</span></div>
    </footer>
  );
}
