const express = require('express');
const request = require('request');

const app = express();
const apikey = process.env.APIKEY || require('./secret').apikey;
const apiID = process.env.APIID || require('./secret').apiID;

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

app.get('/', (req, res) => {
  const search = req.query.movie || 24;
  request(
    `http://www.omdbapi.com/?i=${apikey}&apikey=${apiID}&s=${search}`,
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        const movies = JSON.parse(body);
        const { Search: results } = movies;
        const { Response } = movies;
        const { Error } = movies;
        res.render('index', { results, Response, Error });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
