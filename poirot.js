const fs = require('fs');
const https = require('https');
const yargs = require('yargs');
const chalk = require('chalk');

const suspects = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const argv = yargs.argv;
const username = process.argv[2];

const BANNER = String.raw`
|"""\      .          _|_    ~\_          .          _/~
|___/ |""| | |=\ |""|  |      ^\-:_:-:_:-:_:-:_:-:_:-/^
|     |__| | |   |__|  |_/       <.)*~$^     ^$~*).>
`;

console.log(chalk.bold(chalk.greenBright(BANNER)));

console.log(
  chalk.bold(
    chalk.greenBright(
      `${chalk.cyanBright('[#]')} Checking username ${chalk.whiteBright(
        username
      )} on:`
    )
  )
);

function retrieve(url, suspect, suspects) {
  const plus = '+';
  const minus = '-';
  https
    .get(url, res => {
      if (res.statusCode === 200) {
        console.log(
          chalk.bold(
            chalk.whiteBright('[') +
              chalk.greenBright(plus) +
              chalk.whiteBright('] ') +
              chalk.greenBright(suspect + ':'),
            chalk.whiteBright(url)
          )
        );
      } else {
        console.log(
          chalk.bold(
            chalk.whiteBright('[') +
              chalk.red(minus) +
              chalk.whiteBright('] ') +
              chalk.greenBright(suspect + ':') +
              chalk.yellowBright(' Not Found!')
          )
        );
      }
    })
    .on('error', e => {
      //   console.error(e);
      console.log(
        chalk.bold(
          chalk.whiteBright('[') +
            chalk.redBright(minus) +
            chalk.whiteBright('] ') +
            chalk.greenBright(suspect + ': ') +
            chalk.yellowBright(" Couldn't connect")
        )
      );
    });
}

for (suspect in suspects) {
  retrieve(suspects[suspect]['url'].replace('{}', username), suspect, suspects);
}
