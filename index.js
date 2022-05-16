#! /usr/bin/env node

// const dev = require('./src/dev');
// const build = require('./src/build');

const devBuild = require('./src/devBuild');

const jsonParseDeep = require('./src/util/jsonParseDeep');
const program = require('commander');
const chalk = require('chalk');
const packageJson = require('./package.json');
const base64 = require("./src/util/base64");

program
  .version(packageJson.version)
  .option('-g, --glob <data>', 'Globbing pattern like "-p ./src/**/.richmediarc"')
  .option('-ss, --stats', 'Show stats when building')
  .option('-c, --choices <data>', 'predetermined settings')
  .option('-m, --mode <data>', 'development or production')
  .parse(process.argv);

const options = program.opts();

console.log(options)
//console.log(args);

devBuild({
  mode: options.mode,
  glob: options.glob,
  stats: options.stats,
  choices: options.choices ? JSON.parse(base64.decode(options.choices)) : null,
}).then(r => console.log(`${chalk.green('✔')} done`));
