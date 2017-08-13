#!/usr/bin/env node

const commander = require('commander');
const lib = require('../lib');

commander
  .version('1.0.0')
  .option('-g, --global', 'Switch gitignore to global template')
  .option('-r, --renew', 'Remove all contents in .gitignore before write gitignore templates (only for create command)');

commander
  .command('list')
  .description('Show gitignore templates')
  .action(() => lib.showList(commander.global));

commander
  .command('create [ignores...]')
  .description('Create .gitignore file with templates')
  .action(ignores => lib.createIgnore(commander.global, ignores, commander.renew));

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
