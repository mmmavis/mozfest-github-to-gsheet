import fs from 'fs';
import moment from 'moment';
import exportAcceptedProposals from './lib/export-accepted-proposals';
import exportAsCsv from './lib/export-as-csv';

/**
 * This callback type is called `requestCallback`.
 *
 * @callback requestCallback
 * @param {object} error
 */

/**
 * Get accepted proposals.
 * 1) Export accepted sessions info into a json file
 * 2) Export accepted sessions into a CSV for importing into Google Spreadsheet.
 * @param {string} githubOwner - Name of the GitHub proposals repo owner.
 * @param {string} githubRepo - Name of the GitHub proposals repo.
 * @param {requestCallback} cb - The callback that handles the response.
 * @returns {void}
 */
export default (githubOwner, githubRepo, cb) => {
  // available search qualifiers: https://help.github.com/articles/searching-issues-and-pull-requests/
  // https://developer.github.com/v3/search/#search-issues

  // [TODO] double check to make sure all open GitHub tickets are accepted proposals
  const SEARCH_QUALIFIERS = [
    `repo:${githubOwner}/${githubRepo}`,
    `is:open`,
    `author:mozfest-bot`
  ];

  const DIR_PATH_ROOT = `./log`;

  let timestamp = moment();
  let date = timestamp.format(`YYYYMMDD`);
  let time = timestamp.format(`HHmmss`);

  let dir = `${DIR_PATH_ROOT}/${date}`;
  let filePath = `${dir}/${time}-accepted-proposals-for-gs-import`;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  exportAcceptedProposals(githubOwner, githubRepo, SEARCH_QUALIFIERS, (error, formattedAcceptedSessions) => {
    if (error) cb(error);

    // export formattedAcceptedSessions into CSV format so we can import the file to Google Spreadsheet
    exportAsCsv(formattedAcceptedSessions, `${filePath}.csv`, (exportCsvError) => {
      cb(exportCsvError);
    });
  });
};
