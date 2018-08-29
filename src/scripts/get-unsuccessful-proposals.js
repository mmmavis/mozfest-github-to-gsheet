import exportUnsuccessfulProposals from './lib/export-unsuccessful-proposals';
import exportAsCsv from './lib/export-as-csv';
import createLogFileMeta from './lib/create-log-file-meta';

/**
 * This callback type is called `requestCallback`.
 *
 * @callback requestCallback
 * @param {object} error
 */

/**
 * Get unsuccessful proposals.
 * 1) Export unsuccessful sessions info into a json file
 * 2) Export unsuccessful sessions into a CSV for importing into Google Spreadsheet.
 * @param {string} githubOwner - Name of the GitHub proposals repo owner.
 * @param {string} githubRepo - Name of the GitHub proposals repo.
 * @param {requestCallback} cb - The callback that handles the response.
 * @returns {void}
 */
export default function(githubOwner, githubRepo, cb) {
  // available search qualifiers: https://help.github.com/articles/searching-issues-and-pull-requests/
  // https://developer.github.com/v3/search/#search-issues

  // Open Issues with No Milestone
  const SEARCH_QUALIFIERS = [
    `repo:${githubOwner}/${githubRepo}`,
    `is:open`,
    `no:milestone`,
    `author:mozfest-bot`
  ];

  exportUnsuccessfulProposals(githubOwner, githubRepo, SEARCH_QUALIFIERS, (error, formattedProposals) => {
    if (error) cb(error);

    // export formattedProposals into CSV format so we can import the file to Google Spreadsheet
    let logFileMeta = createLogFileMeta(`unsuccessful-proposals-for-gs-import`, `.csv`);

    exportAsCsv(formattedProposals, logFileMeta.filePath, (exportCsvError) => {
      cb(exportCsvError);
    });
  });
}
