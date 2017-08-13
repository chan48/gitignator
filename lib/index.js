const ignoreManager = require('./ignoreManager');

const unknownCommand = async () => console.log('Can\'t not find this command');
const commandsRaw = new Map([['default', unknownCommand]]);
const commands = new Proxy(commandsRaw, {
  get: function get(target, command) {
    return target.has(command) ? target.get(command) : target.get('default');
  },
});

const showGitignoreList = async (global, types) => {
  const typeNames = await ignoreManager.getIgnoreTypes(global);
  typeNames.forEach(ignore => console.log(ignore));
};

const writeGitignoreFile = async (global, types) => {
  types.forEach(name => console.log(name));
};

commandsRaw.set('list', showGitignoreList);
commandsRaw.set('create', writeGitignoreFile);

module.exports = async (command, isGlobal, types) => {
  commands[command](isGlobal, types)
    .catch(err => console.log(err));
};
