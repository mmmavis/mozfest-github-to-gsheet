import findAndExportMatchedProposals from './lib/export-matched-proposals';
import exportAsCsv from './lib/export-as-csv';
import createLogFileMeta from './lib/create-log-file-meta';
import MatchedProposalFormatter from './lib/matched-proposal-formatter';
import commentAndCloseGithubIssues from './lib/comment-and-close-github-issues';

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
 * 3) Leave comment on unsuccessful proposals on their corresponding GitHub issues.
 * 4) Close GitHub issues.
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

  findAndExportMatchedProposals(
    `unsuccessful-proposals`,
    SEARCH_QUALIFIERS,
    MatchedProposalFormatter.formatUnsuccessfulProposal,
    (error, report) => {
      if (error) cb(error);

      // export formattedProposals into CSV format so we can import the file to Google Spreadsheet
      let logFileMeta = createLogFileMeta(`unsuccessful-proposals-for-gs-import`, `.csv`);

      exportAsCsv(report.formatted_matched_proposals, logFileMeta.filePath, (exportCsvError) => {
        cb(exportCsvError);
      });

      let ghIssueNumbers = report.formatted_matched_proposals.map((p => p.githubissuenumber));
      // comment and close GitHub Issues
      commentAndCloseGithubIssues(ghIssueNumbers, () => {

      });
    }
  );
}
