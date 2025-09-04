const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGl0czI2MTk4OCIsImEiOiJjbWV2bXl0MjQwbTdoMmpweGx4bWpsbmY0In0.qUHYOgfy_59YNbsCorIGIA&limit=1`;
  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (!body.features.length) {
      callback(
        "Unable to find location. Try again with the another search",
        undefined
      );
    } else {
      const coordinate = body?.features[0]?.center;
      callback(undefined, {
        latitude: coordinate[1],
        longitude: coordinate[0],
        location: body?.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
