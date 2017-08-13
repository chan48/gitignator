const axios = require('axios');

const githubAPIURL = 'https://api.github.com';
const gitignoreContentsURL = `${githubAPIURL}/repos/github/gitignore/contents`;
const gitignoreGlobalContentsURL = `${gitignoreContentsURL}/Global`;

const githubRawURL = 'https://raw.githubusercontent.com';
const gitignoreRawContentsURL = `${githubRawURL}/github/gitignore/master`;
const gitignoreRawGlobalContentsURL = `${gitignoreRawContentsURL}/Global`;

exports.getIgnoreTypes = async (global) => {
  try {
    const ignores = await axios.get(global ? gitignoreGlobalContentsURL : gitignoreContentsURL);

    return ignores.data
      .map(file => file.name)
      .filter(file => file.includes('.gitignore'))
      .map(ignore => ignore.replace('.gitignore', ''));
  } catch (e) {
    return ['Error : Please Check Your Internet Environment'];
  }
};

exports.getIgnoreContentsByName = async (global, name) => {
  const url = `${global ? gitignoreRawGlobalContentsURL : gitignoreRawContentsURL}/${name}.gitignore`;

  try {
    const ignoreContents = await axios.get(url);
    return ignoreContents.data;
  } catch (e) {
    return '';
  }
};
