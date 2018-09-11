import GithubApiHelper from './github-api-helper';
import exportAsJson from './export-as-json';
import createLogFileMeta from './create-log-file-meta';

export default function(proposalType = ``, searchQualifiers, cb) {
  GithubApiHelper.search(`issues`, { q: searchQualifiers.join(` `) }, (error, ghMatchedIssues, endpointInfo) => {
    let logFileMeta = createLogFileMeta(proposalType, `.json`);
    let report = {
      "api_call_made": endpointInfo,
      timestamp: logFileMeta.timestampInLocalTime,
      count: {
        "matched_github_issues": ghMatchedIssues.length
      },
      "matched_github_issues": ghMatchedIssues
    };

    exportAsJson(report, logFileMeta.filePath, (jsonFileErr) => {
      if (jsonFileErr) {
        console.log(jsonFileErr);
        cb(jsonFileErr);
      }

      cb(null, report);
    });
  });
}
