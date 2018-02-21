const express = require('express');
app = express(),
request = require('request'),
apikey = process.env.APIKEY || require('./secret').apikey,
apiID = process.env.APIID || require('./secret').apiID,
port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const search =  req.query.movie || 24;
  request(`http://www.omdbapi.com/?i=${apikey}&apikey=${apiID}&s=${search}`, (err, response, body) => {
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