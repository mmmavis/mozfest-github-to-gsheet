import GithubApiHelper from './github-api-helper';
import moment from 'moment';
import path from 'path';
import _ from 'underscore';
import fs from 'fs';

function formatGithubComment() {
  let pathToTemplate = path.normalize(`${__dirname}/../../meta/github/unsuccessful-proposal-comment-template.md`);
  let template = _.template(fs.readFileSync(pathToTemplate,`utf-8`));

  return { body: template() };
}

function commentAndCloseIssue(issueNum, cb) {
  console.log(`>> commentAndCloseIssue called for GitHub Issue #${issueNum}`);

  GithubApiHelper.commentOnIssue(issueNum, formatGithubComment(), (commentError) => {
    if (commentError) {
      cb(commentError);
    } else {
      console.log(`GitHub Issue #${issueNum} commented.`);

      GithubApiHelper.closeIssue(issueNum, (closeIssueError) => {
        if (closeIssueError) {
          cb(closeIssueError);
        } else {
          console.log(`GitHub Issue #${issueNum} closed.`);
          cb();
        }
      });
    }
  });
}

function commentAndCloseIssueWithDelay(ghIssueNumbersLeftToPost, waitTime, cb) {
  // add some delay here so we don't violate GitHub's rate limit
  // https://developer.github.com/v3/#rate-limiting
  setTimeout(() => {
    if (ghIssueNumbersLeftToPost.length > 0) {
      let ghIssueNum = ghIssueNumbersLeftToPost.shift();
      let now = Date.now();
      console.log(ghIssueNum, now, moment.utc(now).local().toString());

      commentAndCloseIssue(ghIssueNum, (commentAndCloseError) => {
        if (commentAndCloseError) console.log(commentAndCloseError);
        console.log(`<< commentAndCloseIssue`, ghIssueNum);
        console.log(`\n`);
        commentAndCloseIssueWithDelay(ghIssueNumbersLeftToPost, waitTime);
      });
    } else {
      console.log(`=== DONE ================`);
      cb();
    }
  }, waitTime);
}

export default function(ghIssueNumbers, cb) {
  const POST_DELAY = 10000;

  if (!ghIssueNumbers || ghIssueNumbers.length === 0) {
    cb();
  } else {
    commentAndCloseIssueWithDelay(ghIssueNumbers, POST_DELAY, () => {
      cb();
    });
  }
}
