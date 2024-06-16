import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoUrl, apiOptions } from "./Api";
function Searchbar(props) {
  const [search, setSearch] = useState(null);
  const { searchChange } = props;
  const handleSearch = (searchCity) => {
    setSearch(searchCity);
    searchChange(searchCity);
  };
  const loadOptions = (inpValue) => {
    return fetch(
      `${geoUrl}/cities?minPopulation=100000&namePrefix=${inpValue}`,
      apiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <div style={{
        flex:"center",
          fontWeight: "1800",
          fontSize: "25px",
          color: "black",
        }}>
        Enter city name to search :
        </div>
      <AsyncPaginate
        debounceTimeout={700}
        value={search}
        onChange={handleSearch}
        loadOptions={loadOptions}
      />
      
    </React.Fragment>
  );
}

export default Searchbar;
