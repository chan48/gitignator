const commander = require('commander');
const lib = require('../lib');

const actionIgnore = (command, ignores) => {
  lib(command, commander.global, ignores)
    .catch(err => console.error(err));
};

commander
  .arguments('[command] [ignores ...]')
  .version('GitIgnator 1.0.0')
  .usage('[command] [ignores...] [options]')
  .option('-g, --global', 'Switch global gitignore types', false)
  .action(actionIgnore)
  .parse(process.argv);
