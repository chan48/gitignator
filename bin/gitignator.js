const commander = require('commander');
const lib = require('../lib');

commander
  .version('1.0.0')
  .option('-t, --types', 'Show gitignore types', false)
  .option('-g, --global <items>', 'Switch global gitignore types', false)
  .parse(process.argv);

const showTypes = commander.types;
const switchGlobal = commander.global;

console.log(commander.global);

lib(showTypes, switchGlobal)
  .catch(console.error);
