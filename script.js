const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".searchBtn");
const weather_img = document.querySelector(".weather-img");
const tempreture = document.querySelector(".tempreture");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const body = document.querySelector("body");
const audio = document.querySelector("audio");
const weather_body = document.querySelector(".weather-body");
const locationmot = document.querySelector(".location-not-found")
     

async function checkWeather(city) {
  const api_key = "fd9a680375d9ac1523465b4c828f8085";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if(weather_data.cod==='404'){
    locationmot.style.display = "flex";
    weather_body.style.display = "none"
    body.style.backgroundColor="black"

    return;
  }
  tempreture.innerHTML = `${Math.round(
    weather_data.main.temp - 273.15
  )}<sub>°C</sub>`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;
  
  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "./assets/cloud.png";
      body.style.backgroundImage = `url(./assets/cloudyback.jpg)`;
      audio.src = "./assets/wind.mp3"
      break;
    case "Clear":
      body.style.backgroundImage = `url(./assets/cloudback.jpg)`;
      audio.src = "./assets/forest_birds.mp3"
      weather_img.src = "./assets/clear.png";
      break;
    case "Rain":
      body.style.backgroundImage = `url(./assets/rainback.jpg)`;
      audio.src = "./assets/raining.mp3"
      weather_img.src = "./assets/rain.png";
      break;
    case "Mist":
       body.style.backgroundImage = `url(./assets/mistback.jpg)`;
      audio.src = "./assets/wind.mp3"
      weather_img.src = "./assets/mist.png";
      break;
    case "Snow":
       body.style.backgroundImage = `url(./assets/snowback.jpg)`;
      audio.src = "./assets/snow.mp3"
      weather_img.src = "./assets/snow.png";
      break;
    case "Haze":
      body.style.backgroundImage = `url(./assets/haze.jpg)`;
      audio.src = "./assets/wind.mp3"
      weather_img.src = "./assets/hazeicon.png";
      break;
    case "Thunderstorm":
        body.style.backgroundImage = `url(./assets/thunder.jpg)`;
        audio.src = "./assets/thunderstorm.mp3"
        weather_img.src = "./assets/thundericon.png";
        break;
  }
  console.log(weather_data.weather[0])
}

searchBtn.addEventListener("click", () => {
  gsap.from(".container", { opacity: 0, y: 100, duration: 1,  });
gsap.from(".searchBtn", {  y: -400, duration: 1, });
gsap.from(".input-box", {  y: -400, duration: 1, });
gsap.from(weather_img, {  y: -400, duration: 1, });
gsap.from(".weather-detail", {  y: 400, duration: 1, });
gsap.from(".weather-box", { opacity:0 , duration: 3, });
gsap.from("body",{
  opacity:.5,
  duration:2,
})
checkWeather(inputBox.value);
});



