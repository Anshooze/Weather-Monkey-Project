import React from "react";
import ShowForecast from "./ShowForecast";
import "./Forecast.css";

function Forecast({ forecastData }) {
  return (
    <div className="fore-container">
      <div className="fore-title"> Forecast</div>
      {forecastData.list.slice(1, 10).map((item, idx) => {
        return <ShowForecast key={idx} data={item} />;
      })}
    </div>
  );
}

export default Forecast;
