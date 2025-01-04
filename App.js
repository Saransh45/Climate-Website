
import './App.css';
import React, { useState } from 'react'


const App = () => {
 const [climate, setClimate]= useState(null);
 const [city, setCity]= useState('');
 const [error, setError]= useState('');

 const API_KEY = '088fb77013615aca94c27512d03cbea4';

 const grabClimate = async() => {
  if(!city){
    setError("Entered city does not exist");
  return;
} 
  setError('');

  try{
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if( !promise.ok){
      throw new Error('City not present');
    }
    const result= await promise.json();
    console.log(result);
    setClimate(result);
   } catch(err){
    setError(err.message);
    setClimate(null); 
   }
};
   
  return (
    <div className='App'>
      <h1 className='climate'>CLIMATE WEBSITE</h1>
      <div className='inputdetails'>
      <input type='text' placeholder= 'Please Enter city name' value= {city} onChange={(a) => setCity(a.target.value)} required />
      <button id='btn' onClick={grabClimate}>Get climate</button>
      </div>
       {error && <p className="error">Error: {error}</p>}
       {climate && climate.main ? (
  <div className="climateinfo">
    <h2>Climate in {climate.name}</h2>
    <p>Temperature in the provided city is {climate.main.temp}°C</p>
    <p>Condition in the provided city is {climate.weather?.[0]?.description}</p>
    <p>Humidity in the provided city is {climate.main.humidity}%</p>
    <p>Wind Speed in the provided city is {climate.wind.speed} m/s</p>
  </div>
) : null}
    </div>
    
   );
};

export default App



