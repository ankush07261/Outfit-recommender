import React from "react";
import "./css/Card.css";
import { ImLocation } from "react-icons/im";
import cold from "../assets/cold.jpg";
import normal from "../assets/normal.jpg";
import hot from "../assets/hot.jpg";
import rain from "../assets/rain.jpg";

function Card({ city, search, url, userPreferences }) {
  let temp = city.main.feels_like;
  let rainy = city.weather[0].main;

  const { image, text, image2, text2 } = giveImage(
    temp,
    rainy,
    userPreferences
  );

  function giveImage(temp, rainy, userPreferences) {
    let image, text, image2, text2;
    if (temp <= 19.0) {
      image = cold;
      text = userPreferences.likesCold
        ? "You like cold weather! Here are some warm clothes."
        : "It's going to be cold! These clothes should keep you warm.";
    } else if (temp > 19.0 && temp <= 26) {
      image = normal;
      text =
        "The weather is going to be just fine, the clothes below may suit you.";
    } else if (temp > 26) {
      image = hot;
      text = "Oh the weather is hot! These clothes are airy and absorb sweat.";
    } else {
      image = null;
      text = null;
    }
    if (rainy === "Rain") {
      image2 = rain;
      text2 = userPreferences.likesRain
        ? "You like rain! Don't forget your umbrella."
        : "It may also rain, it's best to carry an umbrella or a rain coat.";
    } else {
      image2 = null;
      text2 = null;
    }
    return { image, text, image2, text2 };
  }

  return (
    <div className="card-container">
      <div className="card">
        <header>
          <h1>
            <ImLocation /> {search}
          </h1>
        </header>
        <div className="con">
          <div className="sub-div image">
            <img src={url} alt="" />
          </div>
          <div className="sub-div text">
            <h3>{city?.weather[0].description}</h3>
            <br />
            <span>
              <b>Max temp:</b> {city?.main.temp_max} {"\xB0"} C
            </span>
            <br />
            <span>
              <b>Min temp:</b> {city?.main.temp_min} {"\xB0"} C
            </span>
            <br />
            <span>
              <b>Humidity:</b> {city?.main.humidity}
            </span>
          </div>
        </div>
      </div>
      <div className="outfit-container">
        {text != null ? (
          <>
            <div className="outfit-image">
              <h3>
                {text} {text2}
              </h3>
              <div className="images">
                {image && <img className="outfit-rec" src={image} alt={text} />}
                {image2 && (
                  <img className="outfit-rain" src={image2} alt={text} />
                )}
              </div>
            </div>
            <div className="outfit-text"></div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Card;
