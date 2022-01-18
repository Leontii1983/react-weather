import React, { useState } from 'react';

const api = {
  key: 'd4573c968916531f2db16825c3a3282f',
  base: 'http://api.openweathermap.org/data/2.5/'
}

const App = () => {
  
  const [city, setCity] = useState('');

  const [weather, setWeather] = useState({});


  const search = (e) => {
    if(e.key == "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setWeather(data);
        setCity('');
        console.log(data);
      })
    }
  }

  const formatDate = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}${date}${month}${year}`
  }





  return (
    <div className={
      (typeof weather.main != 'undefined') ? (weather.main.temp > 16 ? 'app warm' : 'app') : 'app'
    }>
   <main>
     <div>
       <input 
          type="text" 
          placeholder ="Поиск..."
          onChange = {(e)=> {
            setCity(e.target.value);
          }}
          value = {city}
          onKeyDown = {search}
       />
     </div>
     {
       (typeof weather.main != 'undefined') ? (
         <div>
           <div className='location-box'>
             <div className='location'>
              {weather.name},{weather.sys.country}
             </div>
            <div className="date">
              {formatDate(new Date())}
              </div>          
           </div>
           <div className="weather-box">
             <div className="temp">
              {Math.round(weather.main.temp)} &deg;C
             </div>
             <div className="weather">
              {weather.weather[0].main}
             </div>
            </div>
           </div>
       ):('')
     }
   </main>
    </div>
  );
}

export default App;
