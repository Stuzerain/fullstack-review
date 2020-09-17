const express = require('express');
let app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var getRepos = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

var whitelist = ['http://localhost:1128']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // console.log('req.body = ', req.body);
  getRepos.getReposByUsername(req.body.username, () => { res.end() });
  // res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // top 25 decided by most watchers?
  // debugger;
  db.repo.find({})
    .sort({ watchers: -1 }) // sorts by watchers, -1 means descending order
    .exec((err, result) => {
      if (err) {
        throw 'error sorting and returning data';
      } else {
        console.log(result.length);
        res.json(result);
      }
    })

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

