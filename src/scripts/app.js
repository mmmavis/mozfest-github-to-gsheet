import dotenv from 'dotenv';
import getUnsuccessfulProposals from './get-unsuccessful-proposals';
import getAcceptedProposals from './get-accepted-proposals';
// import createRandomGithubTickets from './create-random-github-tickets';
// import GithubApiHelper from './lib/github-api-helper';

// load .env (process.env keys that are already set via the host environment (eg: Heroku) won't be changed)
dotenv.config();

// load default.env so that anything didn't get set in .env or the host environment will get a default value
dotenv.config({path: `default.env`});


// GithubApiHelper.getRateLimit((error, response, endpointInfo) => {
//   console.log(response, endpointInfo);
// });



// createRandomGithubTickets(10);


getUnsuccessfulProposals(process.env.GITHUB_OWNER, process.env.GITHUB_REPO, (error) => {
  if (error) console.log(error);
});

getAcceptedProposals(process.env.GITHUB_OWNER, process.env.GITHUB_REPO, (error) => {
  if (error) console.log(error);
});
