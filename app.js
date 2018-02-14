const express = require('express');
app = express(),
request = require('request'),
apikey = require('./secret').apikey || process.env.APIKEY,
port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  request(`http://www.omdbapi.com/?${apikey}&s=24`, (err, response, body) => {
    if(!err && response.statusCode === 200) {
      const movies = JSON.parse(body);
      const {Search: results} = movies;
      res.render('index', {results});
    }
  });
});

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});