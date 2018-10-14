const express = require("express");
const app = express();
const port = 8000;

const fs = require("fs");
let timeStart = null;
let time = null;

app.get("/server", (request, response) => {
  let now = Date.now();
  time = new Date(now - timeStart);
  response.status(200).send(`Время прошедшее с запуска сервера: ${(time.getUTCHours())}ч : ${(time.getMinutes())}мин : ${(time.getSeconds())}с`);
});

app.get("/api/events", (request, response) => {
  fs.readFile("events.json", "utf8", function (err, contents) {
    let events = JSON.parse(contents).events;
    if (request.query.type) {
      events = events.filter(function (events) { return events.type === request.query.type;});
      if (events.length > 0) response.status(200).send(events);
      else response.status(400).send("<p>incorrect type</p>");
    } else {
      response.status(200).send(events);
    }
  });
});

app.get("/*", (request, response) => {
  response.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  timeStart = Date.now();
  console.log(`server is listening on ${port}`);
});

