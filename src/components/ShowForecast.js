import React from "react";
import "./ShowForecast.css";

function ShowForecast({ data }) {
  const getDate = () => {
    let date = data.dt_txt.split(" ")[0].substring(5);
    let [month, day] = date.split("-");

    return `${day}/${month}`;
  };
  const getTime = () => {
    function convertTo12Hour(time) {
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    }
    let time = data.dt_txt.substring(11, 16);
    return convertTo12Hour(time);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-details">
          <img
            src={`icons/${data.weather[0].icon}.png`}
            className="card-img-top"
            alt="..."
          />
          <div>
            <h5 className="card-title">{data.weather[0].description}</h5>
          </div>
          <div className="time-column">
            <span className="time"> {getDate()}</span>
            <span className="time"> {getTime()}</span>
          </div>
        </div>
        <div className="card-body">
          <span className="card-text-label">temp: </span>
          <span className="card-text">{Math.round(data.main.temp)}°C </span>
          <span className="card-text-label">Feels like: </span>
          <span className="card-text">
            {Math.round(data.main.feels_like)}°C
          </span>
          <div>
            <span className="card-text-label">wind: </span>
            <span className="card-text">{Math.round(data.wind.speed)} m/s</span>
            <span className="card-text-label">humidity: </span>
            <span className="card-text"> {data.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowForecast;
