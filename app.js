"use strict";

const express = require("express");
const path = require("path");
const logger = require("morgan");
const request = require("request");

const appKeys = require("./config/appKeys");

const app = express();

// Serve arquivo estáticos contidos na pasta 'public'
app.use(express.static(path.resolve(__dirname, "public")));

// Logger de requisições
app.use(logger("dev"));

// Define o ejs como template e usa a pasta 'views'
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Renderiza a página inicial
app.get("/", (req, res) => {
  res.render("index");
});

// Envia a temperatura de uma cidade
app.get("/:cidade?", (req, res) => {
  let cidade = encodeURIComponent(req.params.cidade);

  let googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  let googleId = "&key=" + appKeys.google;

  let clima = {};

  function enviarTemperatura() {
    res.json(clima);
  }

  request.get(googleUrl + cidade + googleId, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let geocode = JSON.parse(body);
      let lat = "lat=" + geocode.results[0].geometry.location.lat;
      let lon = "lon=" + geocode.results[0].geometry.location.lng;
      clima.cidade = geocode.results[0].address_components[0].short_name;

      obterClima(enviarTemperatura, lat, lon);
    }
  });

  function obterClima(callback, lat, lon) {
    let url = "http://api.openweathermap.org/data/2.5/weather?";
    let unidade = "&units=metric";
    let appId = "&APPID=" + appKeys.openweather;
    let final = "&callback=&lang=pt";

    request.get(url + lat + "&" + lon + unidade + appId + final, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let tempo = JSON.parse(body);
        clima.tempo = tempo;
        switch (clima.tempo.cod) {
          case 200:
            callback();
            break;
          case "404":
            res.status(404).end("Cidade não encontrada!");
            break;
          default:
            res.status(500).end("Houve um erro!");
        }
      }
    });
  }

});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
