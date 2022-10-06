import { useState, useEffect } from 'react'
import {CircularProgress, Alert, Snackbar} from '@mui/material';
import reactLogo from './assets/react.svg'
import './App.css'

import AutoComplete from './AutoComplete'
import axios from 'axios'

function App() {
  const [open, setOpen] = useState(false)

  const [cityList, setCityList] = useState([])
  const [citySuggestionList, setCitySuggestionList] = useState([])
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity')!= null ? localStorage.getItem('selectedCity') : null)
  const [weatherData, setWeatherData] = useState<WeatherData>(localStorage.getItem('weatherData') != null ? JSON.parse(localStorage.weatherData) : null)

  useEffect(() => {
    if(localStorage.getItem('selectedCityKey') != undefined) {
      axios.get('http://dataservice.accuweather.com/currentconditions/v1/'+ localStorage.getItem('selectedCityKey') + '?apikey=' + import.meta.env.VITE_API_KEY + '&language=pt-br' )
      .then((res) => {
        //Atualiza state
        setWeatherData(res.data[0])
        //Atualiza localStorage
        localStorage.setItem('weatherData', JSON.stringify(res.data[0]))
      })
      .catch((err) => alert('Houver um problema ao carregar os dados meteorológicos'))
    }

    axios.get('https://dataservice.accuweather.com/locations/v1/topcities/50?apikey=' + import.meta.env.VITE_API_KEY + '&language=pt-BR')
    .then((res) => {
      setCityList(res.data)
    })
    .catch((err) => console.log(err))
  }, [])
  
  let content = weatherData && selectedCity != '' ? 
      <div className="content">
        <div className="content-top">
          <div className="weather-img">
            <img src={`https://developer.accuweather.com/sites/default/files/${('0' + weatherData.WeatherIcon).slice(0, 2)}-s.png`} alt="oi" />
          </div>
        </div>
        <div className="content-bottom">
        <h2 className="temperature">
          {weatherData.Temperature ? weatherData.Temperature.Metric.Value.toString().split('.')[0] : '-'}<span className='unit'>{weatherData.Temperature.Metric.Value % 1 != 0 ? '.' : ''}{weatherData.Temperature.Metric.Value.toString().split('.')[1]}°C</span>
        </h2>
          
        </div>
        <p className="temperature-txt">
          {weatherData ? weatherData.WeatherText: ''} em {selectedCity}
          </p>
          <p className="update-txt">
          Horario local: {weatherData.LocalObservationDateTime}
          </p>
          <p className="update-txt">
          Atualizado em {new Date().toLocaleString()}
          </p>
      </div>
   : <div className="flex"><h3>Pesquise uma cidade para comecar</h3></div>
  return (
    <div className="App" style={weatherData? weatherData.IsDayTime ? {backgroundImage: 'url("/day.jpg")', backgroundOrigin: '10% 10%', backgroundSize: 'cover'} : {backgroundImage: 'url("/night.jpg")', backgroundOrigin: '10% 50%', backgroundSize: 'cover', color: '#ddd' } : undefined}>
      <div className="input-bar">
        <AutoComplete cityList={cityList} setCityList={setCityList} selectedCity={selectedCity} setSelectedCity={setSelectedCity} weatherData={weatherData} setWeatherData={setWeatherData}/>
      </div>
      {content}
    </div>
  )
}

export default App
