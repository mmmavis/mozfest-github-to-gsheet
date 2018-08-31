import findAndExportMatchedProposals from './lib/export-matched-proposals';
import exportAsCsv from './lib/export-as-csv';
import createLogFileMeta from './lib/create-log-file-meta';
import MatchedProposalFormatter from './lib/matched-proposal-formatter';

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

  findAndExportMatchedProposals(
    `accepted-proposals`,
    SEARCH_QUALIFIERS,
    MatchedProposalFormatter.formatAcceptedProposal,
    (error, report) => {
      if (error) cb(error);

      // export formattedProposals into CSV format so we can import the file to Google Spreadsheet
      let logFileMeta = createLogFileMeta(`accepted-proposals-for-gs-import`, `.csv`);

      exportAsCsv(report.formatted_matched_proposals, logFileMeta.filePath, (exportCsvError) => {
        cb(exportCsvError);
      });
    }
  );
};
