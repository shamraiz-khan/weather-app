import { useEffect, useRef, useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import "./App.css";
import { Card } from "@mui/material";

function App() {
  const videoRef = useRef(null);
  const [location, setLocation] = useState("pune");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [pressure, setPressure] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [Weather, setWeather] = useState("");

  useEffect(() => {
    videoRef.current.playbackRate = 0.7;
    weather();
  }, [location]);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const weather = async () => {
    const API_key = "d64f9e458237935b9c3ab04f69c70bad";

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`;
    try {
      const res = await fetch(weatherURL);
      const data = await res.json();
      console.log(data);
      const { main, name, weather, wind, sys, dt } = data;
      setName(name);
      getCountryName(sys.country);
      const curDate = new Date(dt * 1000);
      const dateTime = new Intl.DateTimeFormat("en-US", options);
      const currentdateTime = dateTime.format(curDate);
      setDateTime(currentdateTime);
      setTemperature(`${main.temp}°`);
      setMinTemp(`Min:${main.temp_min.toFixed()}°`);
      setMaxTemp(`Max:${main.temp_max.toFixed()}°`);
      setFeelsLike(`${main.feels_like.toFixed()}°`);
      setWind(`${wind.speed.toFixed()}`);
      setPressure(main.pressure);
      setHumidity(main.humidity);
      setWeatherIcon(
        `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
      );
      setWeather(weather[0].main);
    } catch (error) {
      console.log(error);
    }
  };
  function getCountryName(code) {
    const regionNamesInEnglish = new Intl.DisplayNames([code], {
      type: "region",
    }).of(code);
    setCountry(regionNamesInEnglish);
  }
  function handleLocationChange(e) {
    e.preventDefault();
    setLocation(e.target.value);
  }

  return (
    <div className="container">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        id="background-video"
        src="Clouds.mp4"
        type="video/mp4"
      ></video>
      <div className="overlay"></div>

      <div className="box">
        <form action="" onSubmit={handleLocationChange}>
          <TextField
            label="Search here..."
            variant="outlined"
            onChange={handleLocationChange}
            value={location}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        {/* Weather main data */}
        <div className="weather-header">
          <h3>
            {name}, {country}
          </h3>
        </div>
        {/* Weather main data */}
        <div className="weather-body">
          {dateTime}
          <h4>{temperature}</h4>
          <center>
            {" "}
            <div className="weatherImageData">{Weather}</div>
          </center>
          <img src={weatherIcon} />
          <p>
            {minTemp} {maxTemp}
          </p>
        </div>
        {/* Weather Extra data */}
        <div className="weather-info">
          <Card>
            <div className="weather-card">
              <div>
                <ThermostatIcon />
                <p>Feels like</p>
                <p className="weather-feelslike">{feelsLike}</p>
              </div>
            </div>
          </Card>

          <Card variant="outlined">
            <div className="weather-card">
              <div>
                <WaterDropIcon />
                <p>Humidity </p>
                <p className="weather-humidity">{humidity}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="weather-card">
              <div>
                <AirIcon />
                <p>Wind </p>
                <p className="weather-wind">{wind}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="weather-card">
              <div>
                <SpeedIcon />
                <p>Pressure </p>
                <p className="weather-pressure">{pressure}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
