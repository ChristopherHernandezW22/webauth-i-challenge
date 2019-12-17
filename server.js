const express = require('express');

const usersRouter = require('./users/router');

const server = express();

server.use(express.json());

server.use('/users', usersRouter)

const port = 4000;

server.get('/', (req, res) => {
  res.send(`<h2>Testing API on port: ${port}</h2>`);
});

module.exports = server;