console.log("client side js has been loaded");

document.querySelector("#location_search").addEventListener("click", (res) => {
  const location = document.querySelector("#location")?.value;
  getWeatherInfo(location);
  document.querySelector("#location").value = "";
});

const weatherInfo = document.querySelector("#weather-info");

const getWeatherInfo = (location) => {
  weatherInfo.textContent = "Loading...";
  if (location) {
    fetch(`http://localhost:3000/weather?address=${location}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            weatherInfo.textContent = `Error: ${data.error}`;
          } else {
            weatherInfo.textContent = `For ${data.location}, ${data.forecast}`;
          }
        });
      }
    );
  }
};
