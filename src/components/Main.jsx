import React, { useEffect, useState } from "react";
import "./css/main.css";
import Card from "./Card";
import Not from "./NotFound";
import { setFunction } from "./icons";

function Main() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Bengaluru");
  const [icon, setIcon] = useState("");
  const [userPreferences, setUserPreferences] = useState({
    likesCold: true,
    likesRain: false,
  });

  useEffect(() => {
    async function getData() {
      let api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=29d395129097a089a2a83bc2acf3cdcb`;
      try {
        let res = await fetch(api);
        let response = await res.json();
        console.log(response);
        setCity(response);
        if (response.name) {
          setIcon(response?.weather[0].icon);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getData();
  }, [search]);

  return (
    <div className="main-con">
      <div className="titlesearch">
        <h1 className="heading">Weather-based Outfit Recommender</h1>
        <input
          type="search"
          className="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {city?.name ? (
        <Card
          city={city}
          search={search}
          url={setFunction(icon)}
          userPreferences={userPreferences}
        />
      ) : (
        <Not />
      )}
    </div>
  );
}

export default Main;
