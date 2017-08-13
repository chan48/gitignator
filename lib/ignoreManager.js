const axios = require('axios');

const githubURL = 'https://api.github.com';
const gitignoreContentsURL = `${githubURL}/repos/github/gitignore/contents`;
const gitignoreGlobalContentsURL = `${gitignoreContentsURL}/Global`;

exports.getIgnoreTypes = async (global) => {
  const ignores = await axios.get(global ? gitignoreGlobalContentsURL : gitignoreContentsURL);

  return ignores.data
    .map(file => file.name)
    .filter(file => file.includes('.gitignore'))
    .map(ignore => ignore.replace('.gitignore', ''));
};
