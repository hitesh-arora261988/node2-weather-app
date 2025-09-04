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
        console.log(data.current);
        const temprature = data.current?.temperature;
        const feelsLike = data.current?.feelslike;
        callback(
          undefined,
          `It's currently ${temprature}F out. It feels like ${feelsLike}F.`
        );
      }
    }
  );
};

module.exports = forecast;
