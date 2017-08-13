const axios = require('axios');

const githubAPIURL = 'https://api.github.com';
const gitignoreContentsURL = `${githubAPIURL}/repos/github/gitignore/contents`;
const gitignoreGlobalContentsURL = `${gitignoreContentsURL}/Global`;

const githubRawURL = 'https://raw.githubusercontent.com';
const gitignoreRawContentsURL = `${githubRawURL}/github/gitignore/master`;
const gitignoreRawGlobalContentsURL = `${gitignoreRawContentsURL}/Global`;

exports.getIgnoreTypes = async (global) => {
  const ignores = await axios.get(global ? gitignoreGlobalContentsURL : gitignoreContentsURL);

  return ignores.data
    .map(file => file.name)
    .filter(file => file.includes('.gitignore'))
    .map(ignore => ignore.replace('.gitignore', ''));
};

exports.getIgnoreContentsByName = async (global, name) => {
  const url = `${global ? gitignoreRawGlobalContentsURL : gitignoreRawContentsURL}/${name}.gitignore`;
  const ignoreContents = await axios.get(url);

  return ignoreContents.data;
};
