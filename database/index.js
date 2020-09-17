const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String, // repo name
  owner: String, // owner/autor of repo
  url: String, // GitHub url of repo
  description: String, // description of repo
  watchers: Number, // number of watchers (to calc 'top repos')
  language: String // main language of repo, if any is specified
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => { // This function should save a repo or repos to the MongoDB

  Repo.findOne({ url: data.html_url }, (err, example) => { // check if database already contains repo with matching url
    if (err) { //check for eror on lookup
      console.log('error with repo lookup to check if duplicate ', err);
    }
    if (example) { // if repo is already in database, alert user and don't add duplicate
      console.log('this repo is already in the database');
    } else { // otherwise add repo
      var instance = new Repo(
        {
          name: data.name,
          owner: data.owner.login,
          url: data.html_url,
          description: data.description,
          watchers: data.watchers_count,
          language: data.language
        });

      instance.save((err, inst) => {
        if (err) {
          throw 'error saving to db';
        } else {
          // console.log('repo saved successfully');
        }
      });
    }
  });
}

// let showSorted = (req, res) => { // function to return a sorted array by 'top' criteria (watchers)
//   Repo.find({}, (err, result) => {
//     if (err) {
//       throw 'error sorting and returning data';
//     } else {
//       res.json(result);
//     }
//   })
//     .sort({ watchers: -1 }); // sorts by watchers, -1 means descending order
// }

module.exports.repo = Repo;
module.exports.save = save;
// module.exports.showSorted = showSorted;