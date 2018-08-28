import fs from 'fs';
import moment from 'moment';
import GithubApiHelper from './github-api-helper';
import exportAsJson from './export-as-json';
import searchGoogleSpreadsheet from './search-google-spreadsheet';
import generateNewMetaForSheet from './generate-new-meta-for-sheet';
import AcceptedSheetColumns from '../../meta/accepted-proposals-sheet/columns';
import OfficialGitHubLabels from '../../meta/github/official-labels';

const DIR_PATH_ROOT = `./log`;

let tidyUpRowMeta = (gsRow, ghIssue) => {
  let formatted = {};

  // extracting meta from all proposals spreadsheet
  AcceptedSheetColumns.allProposalsSheet.forEach(meta => {
    let metaOldValue = gsRow[meta.oldName];

    meta.setNewValue(metaOldValue);
    formatted[meta.newName] = meta.newValue;
  });

  // extracting meta from GitHub repo
  AcceptedSheetColumns.githubRepo.forEach(meta => {
    let metaOldValue = ghIssue[meta.oldName];

    meta.setNewValue(metaOldValue);
    formatted[meta.newName] = meta.newValue;
  });

  // figuring out what to do with new meta
  AcceptedSheetColumns.newColumns.forEach(meta => {
    let newName = meta.newName;

    if (newName === `format` || newName === `l10nlanguage`) {
      let officialLabels = OfficialGitHubLabels[newName];
      let oLabelOldNames = officialLabels.map(label => label.oldName);

      formatted[newName] = formatted.labels ? formatted.labels.split(`\n`).map(label => {
        let indexInoLabelOldNames = oLabelOldNames.indexOf(label);

        if (indexInoLabelOldNames < 0) return null;

        return officialLabels[indexInoLabelOldNames].newName;
      }).filter(label => !!label).join(`\n`) : ``;
    }
  });

  return formatted;
};

export default function(githubOwner, githubRepo, searchQualifiers, cb) {
  let timestamp = moment();
  let date = timestamp.format(`YYYYMMDD`);
  let time = timestamp.format(`HHmmss`);

  let dir = `${DIR_PATH_ROOT}/${date}`;
  let filePath = `${dir}/${time}-accepted-proposals`;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

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

      let formattedAcceptedProposals = matchedRows.map(row => {
        return tidyUpRowMeta(row, uuidMap[row.uuid]);
      });

      let report = {
        "api_call_made": endpointInfo,
        timestamp: timestamp.local().format(`YYYY-MM-DD HH:mm:ss`),
        count: ghMatchedIssues.length,
        "matched_github_issues": ghMatchedIssues,
        "matched_spreadsheet_rows": matchedRows,
        "formatted_accepted_proposals": formattedAcceptedProposals
      };

      exportAsJson(report, `${filePath}.json`, (jsonFileErr) => {
        if (jsonFileErr) {
          console.log(jsonFileErr);
          cb(jsonFileErr);
        }

        cb(null, formattedAcceptedProposals);
      });
    });
  });
}
