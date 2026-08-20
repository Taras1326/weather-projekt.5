import { useEffect, useMemo, useState } from 'react';
import { FiMapPin, FiSearch, FiNavigation, FiDroplet, FiWind, FiSun, FiEye, FiActivity, FiCloudRain, FiMoon, FiTrash2, FiRefreshCw, FiHeart } from 'react-icons/fi';
import { getWeatherByCity, getWeatherByCoordinates, searchCities, weatherEmoji } from './services/weatherApi';
import { getSavedCities, saveCities } from './services/storage';
import './styles/global.css';

const formatTime = (value) => value ? new Date(value).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '—';
const dir = d => ['N','NE','E','SE','S','SW','W','NW'][Math.round((d||0)/45)%8];

function App(){
 const [city,setCity]=useState(null), [saved,setSaved]=useState([]), [q,setQ]=useState(''), [suggestions,setSuggestions]=useState([]), [loading,setLoading]=useState(false), [error,setError]=useState(''), [dark,setDark]=useState(()=>localStorage.getItem('weather-theme')!=='light');
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('weather-theme',dark?'dark':'light')},[dark]);
 useEffect(()=>{const s=getSavedCities(); setSaved(s); if(s[0]) getWeatherByCity(s[0].city).then(setCity).catch(()=>{}); else getWeatherByCity('Ljubljana').then(setCity).catch(()=>{});},[]);
 useEffect(()=>{const t=setTimeout(async()=>{if(q.trim().length<2){setSuggestions([]);return} try{setSuggestions(await searchCities(q))}catch{setSuggestions([])}},250); return()=>clearTimeout(t)},[q]);
 const loadPlace=async(p)=>{setLoading(true);setError('');try{const w=await getWeatherByCoordinates(p.latitude,p.longitude,p);setCity(w);setQ('');setSuggestions([])}catch(e){setError(e.message)}finally{setLoading(false)}};
 const submit=async e=>{e.preventDefault();if(!q.trim())return;setLoading(true);setError('');try{setCity(await getWeatherByCity(q));setQ('');setSuggestions([])}catch(e){setError(e.message)}finally{setLoading(false)}};
 const locate=()=>navigator.geolocation?navigator.geolocation.getCurrentPosition(async pos=>{setLoading(true);try{setCity(await getWeatherByCoordinates(pos.coords.latitude,pos.coords.longitude,{name:'My location'}))}finally{setLoading(false)}},()=>setError('Location permission was not granted.')):setError('Geolocation is not supported.');
 const toggleSave=()=>{if(!city)return;const exists=saved.some(x=>x.id===city.id); const next=exists?saved.filter(x=>x.id!==city.id):[...saved,{id:city.id,city:city.city,country:city.country}];setSaved(next);saveCities(next)};
 const currentHours=useMemo(()=>city?.hourly.filter(h=>new Date(h.time)>=new Date()).slice(0,12)||[],[city]);
 const savedHere=city&&saved.some(x=>x.id===city.id);
 return <div className="app-shell">
  <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">☁️</span><span>SkyPulse</span></a><nav><a href="#forecast">Forecast</a><a href="#details">Details</a><a href="#saved">Saved</a></nav><button className="theme" onClick={()=>setDark(v=>!v)}>{dark?'☀️':'🌙'}</button></header>
  <main id="top">
   <section className="hero"><div className="hero-copy"><span className="eyebrow">LIVE WEATHER • GLOBAL FORECAST</span><h1>Weather that feels <em>clear.</em></h1><p>Current conditions, 14-day forecast, hourly rain, UV, wind, visibility and air quality — in one clean dashboard.</p>
    <form className="search" onSubmit={submit}><FiSearch/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city or place..."/><button>{loading?'Loading…':'Search'}</button>{suggestions.length>0&&<div className="suggestions">{suggestions.map(s=><button type="button" key={s.id} onClick={()=>loadPlace(s)}><FiMapPin/><span><b>{s.name}</b><small>{[s.admin1,s.country].filter(Boolean).join(', ')}</small></span></button>)}</div>}</form>
    <button className="locate" onClick={locate}><FiNavigation/> Use my location</button>{error&&<p className="error">{error}</p>}</div>
    {city&&<div className="now-card"><div className="now-head"><div><span className="label">NOW</span><h2>{city.city}</h2><p>{[city.admin1,city.country].filter(Boolean).join(', ')}</p></div><button className="save" onClick={toggleSave}>{savedHere?<FiHeart fill="currentColor"/>:<FiHeart/>}</button></div><div className="temp-row"><span className="weather-emoji">{city.emoji}</span><strong>{city.temperature}°</strong><div><b>{city.description}</b><span>Feels like {city.feelsLike}°</span></div></div><div className="mini-grid"><div><FiDroplet/><span>Humidity</span><b>{city.humidity}%</b></div><div><FiWind/><span>Wind</span><b>{city.windSpeed} km/h</b></div><div><FiCloudRain/><span>Rain</span><b>{city.precipitation} mm</b></div></div></div>}
   </section>
   {city&&<>
   <section className="section" id="forecast"><div className="section-title"><div><span>HOURLY</span><h2>Next 12 hours</h2></div><small>Updated {formatTime(city.updatedAt)}</small></div><div className="hour-strip">{currentHours.map((h,i)=><article className={i===0?'hour active':'hour'} key={h.time}><span>{i===0?'Now':formatTime(h.time)}</span><i>{weatherEmoji(h.weatherCode,1)}</i><strong>{h.temperature}°</strong><small><FiCloudRain/>{h.precipitationProbability}%</small></article>)}</div></section>
   <section className="section" id="details"><div className="section-title"><div><span>CONDITIONS</span><h2>Weather details</h2></div></div><div className="detail-grid">{[
    [<FiSun/>,'UV index',city.uv?.toFixed(1)??'—'],[<FiWind/>,'Wind gusts',`${city.windGusts} km/h`],[<FiNavigation/>,'Wind direction',`${dir(city.windDirection)} ${city.windDirection}°`],[<FiEye/>,'Visibility',city.visibility!=null?`${city.visibility} km`:'—'],[<FiActivity/>,'Pressure',`${city.pressure} hPa`],[<FiDroplet/>,'Humidity',`${city.humidity}%`],[<FiSun/>,'Sunrise',formatTime(city.sunrise)],[<FiMoon/>,'Sunset',formatTime(city.sunset)],[<FiActivity/>,'Air quality',city.aqi!=null?`${city.aqi} • ${city.aqiLabel}`:'Unavailable']
   ].map(([icon,label,val])=><article className="detail" key={label}><span className="detail-icon">{icon}</span><span>{label}</span><strong>{val}</strong></article>)}</div></section>
   <section className="section"><div className="section-title"><div><span>OUTLOOK</span><h2>14-day forecast</h2></div></div><div className="daily-list">{city.forecast.map((d,i)=><article className="day" key={d.date}><div><b>{i===0?'Today':new Date(d.date).toLocaleDateString('en-US',{weekday:'short'})}</b><small>{new Date(d.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</small></div><i>{weatherEmoji(d.weatherCode,1)}</i><span className="rain"><FiCloudRain/>{d.precipProbability}%</span><span className="wind"><FiWind/>{d.windMax} km/h</span><strong>{d.max}° <em>{d.min}°</em></strong></article>)}</div></section>
   <section className="section map-card"><div><span>LOCATION</span><h2>{city.city} on the map</h2><p>{city.lat.toFixed(3)}, {city.lon.toFixed(3)}</p></div><iframe title="Weather location map" loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${city.lon-0.12}%2C${city.lat-0.08}%2C${city.lon+0.12}%2C${city.lat+0.08}&layer=mapnik&marker=${city.lat}%2C${city.lon}`}></iframe></section>
   </>}
   <section className="section" id="saved"><div className="section-title"><div><span>FAVORITES</span><h2>Saved cities</h2></div></div>{saved.length?<div className="saved-grid">{saved.map(s=><article key={s.id}><div><b>{s.city}</b><small>{s.country}</small></div><button onClick={()=>getWeatherByCity(s.city).then(setCity)}><FiRefreshCw/></button><button onClick={()=>{const n=saved.filter(x=>x.id!==s.id);setSaved(n);saveCities(n)}}><FiTrash2/></button></article>)}</div>:<div className="empty">Save a city with the heart button and it will appear here.</div>}</section>
  </main><footer><div className="brand"><span className="brand-mark">☁️</span><span>SkyPulse</span></div><p>Weather data by Open‑Meteo • Map by OpenStreetMap</p><span>© 2026</span></footer>
 </div>
}
export default App;
