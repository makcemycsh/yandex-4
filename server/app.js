"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = 8000;
var fs = require('fs');
var startingTime = new Date();
/**
*  Время с запуска сервера
 */
var getUptime = function () {
    var currentTime = new Date();
    var difference = new Date();
    difference.setTime(Number(currentTime) - Number(startingTime));
    return difference.toLocaleTimeString('ar-EG', { timeZone: 'UTC' });
};
app.get('/status', function (request, response) {
    response.status(200).send("\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0448\u0435\u0434\u0448\u0435\u0435 \u0441 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: " + getUptime());
});
app.get('/api/events', function (request, response) {
    fs.readFile('events.json', 'utf8', function (err, contents) {
        var events = JSON.parse(contents).events;
        if (request.query.type) {
            events = events.filter(function (events) {
                return events.type === request.query.type;
            });
            if (events.length > 0)
                response.status(200).send(events);
            else
                response.status(400).send('<p>incorrect type</p>');
        }
        else {
            response.status(200).send(events);
        }
    });
});
app.get('/*', function (request, response) {
    response.status(404).send('<h1>Page not found</h1>');
});
app.listen(port, function (err) {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log("server is listening on " + port);
});
