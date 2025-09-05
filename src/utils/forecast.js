const request = require("request");
const forecast = (latitude, longitude, callback) => {
  request.get(
    {
      url: `http://api.weatherstack.com/current?access_key=69375b5d8d17f6b90b0b2d41faf3a7f3&query=${longitude},${latitude}&units=f`,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location!", undefined);
      } else {
        const data = body;
        const temprature = data.current?.temperature;
        const feelsLike = data.current?.feelslike;
        const weather_icon = data.current.weather_icons[0];
        console.log();
        callback(undefined, {
          weatherInfo: `It's currently ${temprature}F out. It feels like ${feelsLike}F.`,
          icon: weather_icon,
        });
      }
    }
  );
};

module.exports = forecast;
