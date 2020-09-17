const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username, next) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // console.log('in getRepos')
  // console.log('username is ', username)
  // console.log(options.url)

  axios(options)
    .then((repos) => {
      // console.log(repos.data);
      repos.data.forEach(repo => { db.save(repo) });
    })
    .then(next());

}

module.exports.getReposByUsername = getReposByUsername;