const fs = require('fs');
const ignoreManager = require('./ignoreManager');

exports.showList = async (global) => {
  console.log('Loading gitignore templates...');

  const names = await ignoreManager.getIgnoreTypes(global);
  names.forEach(name => console.log(name));
};

exports.createIgnore = async (global, ignores, renew) => {
  if (ignores.length === 0) {
    console.log('Please command with gitignore template!!');
    return;
  }

  const ignorePromise = ignores
    .map(ignore => ignoreManager.getIgnoreContentsByName(global, ignore));

  const ignoreContents = (await Promise.all(ignorePromise)).join('');
  const writeFunction = renew ? fs.writeFileSync : fs.appendFileSync;

  fs.openSync('.gitignore', 'a+');
  writeFunction('.gitignore', ignoreContents);

  console.log(`Generated .gitignore file with ${ignores.join()} templates!`);
};
