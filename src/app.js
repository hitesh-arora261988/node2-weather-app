const path = require("path");

const express = require("express");
const hbs = require("hbs");
const chalk = require("chalk");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define Paths for express config
const public_path = path.join(__dirname, "../public");
const viewaPath = path.join(__dirname, "../templates/views");
const parialsPath = path.join(__dirname, "../templates/partials");

//Setup handelbars engins and vies location
app.set("view engine", "hbs");
app.set("views", viewaPath);
hbs.registerPartials(parialsPath);

//Setup static directory to use
app.use(express.static(public_path));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Hitesh Arora",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Hitesh Arora",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page!",
    desc: "This is a weather application created by hitesh arora using node js, If you need any help please reach out to me on 240-660-6057.",
    name: "Hitesh Arora",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (address) {
    geocode(address, (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(longitude, latitude, (error, { weatherInfo, icon }) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: weatherInfo,
          icon: icon,
          location,
          address,
        });
      });
    });
  } else {
    res.send({
      error: "Provide address in query string.!",
    });
  }
});

app.get("/help/{*splat}", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hitesh Arora",
    msg: "Help Article didn't find!",
  });
});

app.get("/{*splat}", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hitesh Arora",
    msg: "Page Not found!",
  });
});

app.listen(3000, () => {
  console.log(chalk.green.bold("Server is up on port 3000"));
});
