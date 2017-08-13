const commander = require('commander');
const lib = require('../lib');

commander
  .version('1.0.0')
  .option('-l, --list', 'Show gitignore types', false)
  .option('-g, --global', 'Switch global gitignore types', false)
  .parse(process.argv);

const showTypeList = commander.list;
const switchGlobal = commander.global;

lib(showTypeList, switchGlobal)
  .catch(err => console.error(err));
