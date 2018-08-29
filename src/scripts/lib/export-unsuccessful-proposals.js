import GithubApiHelper from './github-api-helper';
import exportAsJson from './export-as-json';
import createLogFileMeta from './create-log-file-meta';
import searchGoogleSpreadsheet from './search-google-spreadsheet';
import MatchedProposalFormatter from './matched-proposal-formatter';

export default function(githubOwner, githubRepo, searchQualifiers, cb) {
  GithubApiHelper.search(`issues`, { q: searchQualifiers.join(` `) }, (error, ghMatchedIssues, endpointInfo) => {
    // GitHub template: **[ UUID ]** __uuid__
    // let uuids = issues.map(issue => issue.body.split(`\n`)[0].replace(`[ UUID ]`, ``).replace(/\*/g, ``).trim());

    let uuidMap = {};

    ghMatchedIssues.forEach(issue => {
      // GitHub template: **[ UUID ]** __uuid__
      let uuid = issue.body.split(`\n`)[0].replace(`[ UUID ]`, ``).replace(/\*/g, ``).trim();

      // add uuid to issue object
      issue.uuid = uuid;

      issue = Object.assign({}, issue);
      uuidMap[uuid] = issue;
    });

    // shared key between Master Spreadsheet rows (all proposals) and GitHub issues
    let sharedKeyInfo = {
      name: `uuid`,
      values: Object.keys(uuidMap)
    };

    searchGoogleSpreadsheet(sharedKeyInfo, (sheetError, matchedRows) => {
      if (sheetError) console.log(`sheetError`, sheetError);

      let formattedMatchedProposals = matchedRows.map(row => {
        return MatchedProposalFormatter.formatUnsuccessfulProposal(row, uuidMap[row.uuid]);
      });

      let logFileMeta = createLogFileMeta(`unsuccessful-proposals`, `.json`);
      let report = {
        "api_call_made": endpointInfo,
        timestamp: logFileMeta.timestampInLocalTime,
        count: {
          "matched_github_issues": ghMatchedIssues.length,
          "matched_spreadsheet_rows": matchedRows.length,
          "formatted_accepted_proposals": formattedMatchedProposals.length,
        },
        "matched_github_issues": ghMatchedIssues,
        "matched_spreadsheet_rows": matchedRows,
        "formatted_unsuccessful_proposals": formattedMatchedProposals
      };

      exportAsJson(report, logFileMeta.filePath, (jsonFileErr) => {
        if (jsonFileErr) {
          console.log(jsonFileErr);
          cb(jsonFileErr);
        }

        cb(null, formattedMatchedProposals);
      });
    });
  });
}