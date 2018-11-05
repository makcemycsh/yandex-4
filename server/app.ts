import { Request, Response } from 'express';

interface EventsDate {
  type: string;
}

const express = require('express');
const app = express();
const port: number = 8000;

const fs = require('fs');

const startingTime: Date | number = new Date();

/**
*  Время с запуска сервера
 */
const getUptime: Function = (): string => {
  const currentTime: Date | number = new Date();
  const difference: Date | number = new Date();
  difference.setTime(Number(currentTime) - Number(startingTime));

  return difference.toLocaleTimeString('ar-EG', { timeZone: 'UTC' });
};

app.get('/status', (request: Request, response: Response): void => {
  response.status(200).send(`Время прошедшее с запуска сервера: ${getUptime()}`);
});

app.get('/api/events', (request: Request, response: Response): void => {
  fs.readFile('events.json', 'utf8', (err: Error, contents: string) => {
    let events = JSON.parse(contents).events;
    if (request.query.type) {
      events = events.filter((events: EventsDate) => {
        return events.type === request.query.type;
      });
      if (events.length > 0) response.status(200).send(events);
      else response.status(400).send('<p>incorrect type</p>');
    } else {
      response.status(200).send(events);
    }
  });
});

app.get('/*', (request: Request, response: Response): void => {
  response.status(404).send('<h1>Page not found</h1>');
});

app.listen(port, (err: Error) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
