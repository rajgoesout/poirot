const fs = require('fs');
const https = require('https');
const yargs = require('yargs');

const suspects = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const argv = yargs.argv;
const username = process.argv[2];

console.log(`Checking username ${username} on:`);

function retrieve(url, suspect, suspects) {
  https
    .get(url, res => {
      //   console.log(url, res.statusCode);
      if (res.statusCode === 200) console.log(url, 'Yup', res.statusCode);
      else console.log(url, 'Nope', res.statusCode);
    })
    .on('error', e => {
      //   console.error(e);
      console.log(url, "Couldn't connect");
    });
}

for (suspect in suspects) {
  retrieve(suspects[suspect]['url'].replace('{}', username), suspect, suspects);
}
