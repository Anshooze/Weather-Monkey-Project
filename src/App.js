import { weatherURL, weatherAPIkey } from "./components/Api";
import { useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Weatherblog from "./components/Weatherblog";
import Forecast from "./components/Forecast";
function App() {
  const [weatherResp, setWeatherResp] = useState(null);
  const [weatherFore, setWeatherFore] = useState(null);
  const handleSearchChange = (searchCity) => {
    const [lat, lon] = searchCity.value.split(" ");
    const currentWeatherfetch = fetch(
      `${weatherURL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=metric`
    );
    const currentForcastfetch = fetch(
      `${weatherURL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}&units=metric`
    );
    Promise.all([currentWeatherfetch, currentForcastfetch])
      .then(async (response) => {
        const weatherR = await response[0].json();
        const weatherF = await response[1].json();

        setWeatherResp({ city: searchCity.label, ...weatherR });
        setWeatherFore({ city: searchCity.label, ...weatherF });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <Searchbar searchChange={handleSearchChange} />
      {weatherResp && <Weatherblog data={weatherResp} />}
      {weatherFore && <Forecast forecastData={weatherFore} />}
    </div>
  );
}

export default App;
