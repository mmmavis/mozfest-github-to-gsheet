import exportAllGithubIssues from './lib/export-all-github-issues';

/**
 * This callback type is called `requestCallback`.
 *
 * @callback requestCallback
 * @param {object} error
 */

/**
 * Get all GitHub issues that were originally filed by mozfest-bot.
 * 1) Export GitHub issues info into a json file
 * @param {string} githubOwner - Name of the GitHub proposals repo owner.
 * @param {string} githubRepo - Name of the GitHub proposals repo.
 * @param {requestCallback} cb - The callback that handles the response.
 * @returns {void}
 */
export default (githubOwner, githubRepo, cb) => {
  // available search qualifiers: https://help.github.com/articles/searching-issues-and-pull-requests/
  // https://developer.github.com/v3/search/#search-issues

  const SEARCH_QUALIFIERS = [
    `repo:${githubOwner}/${githubRepo}`,
    `author:mozfest-bot`
  ];

  const FILE_NAME = `all-github-issues-by-mozfest-bot`;

  exportAllGithubIssues(
    FILE_NAME,
    SEARCH_QUALIFIERS,
    (error) => {
      if (error) cb(error);
    }
  );
};
