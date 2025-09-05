document.querySelector("#location_search").addEventListener("click", (res) => {
  const location = document.querySelector("#location")?.value;
  getWeatherInfo(location);
  document.querySelector("#location").value = "";
});

const weatherInfo = document.querySelector("#weather-info");

const getWeatherInfo = (location) => {
  weatherInfo.textContent = "Loading...";
  let img = document.querySelector("#icon");
  if (img) {
    img.remove();
  }
  if (location) {
    fetch(`/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          weatherInfo.textContent = `Error: ${data.error}`;
        } else {
          weatherInfo.textContent = `For ${data.location}, ${data.forecast}`;
          img = document.createElement("img");
          img.id = "icon";
          img.src = data.icon;
          img.alt = "weather";
          document.querySelector("#weather-block").appendChild(img);
        }
      });
    });
  }
};
