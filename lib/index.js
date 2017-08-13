const ignoreManager = require('./ignoreManager');

module.exports = async (command, isGlobal, types) => {
  if (command === 'list') {
    const typeNames = await ignoreManager.getIgnoreTypes(isGlobal);
    typeNames.forEach(ignore => console.log(ignore));
  } else if (types) {
    console.log('yeah!');
    console.log(types);
  }
};
