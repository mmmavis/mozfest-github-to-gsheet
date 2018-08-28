import GithubApiHelper from './lib/github-api-helper';
import loremIpsum from 'lorem-ipsum';

const WORDS = [
  `cotton candy`,
  `pastry`,
  `chocolate`,
  `ice cream`,
  `caramel`,
  `jelly`,
  `icing`,
  `marshmallow`,
  `icing`,
  `strawberry`,
  `marzipan`,
  `donut`,
  `muffin`,
  `brownie`,
  `fruitcake`,
  `gingerbread`,
  `danish`,
  `gummies`,
  `tart`,
  `wafer`,
  `pudding`,
  `cheesecake`
];

// all the available milestones on the GitHub repo you want to create issues on
const GITHUB_MILESTONE_IDS = [
  0,
  1,
  2,
  3,
  4,
  5
];

function createRandomTicket(cb) {
  let milestoneId = GITHUB_MILESTONE_IDS[Math.floor(Math.random() * GITHUB_MILESTONE_IDS.length)];

  let issue = {
    title: loremIpsum({
      count: 1, // Number of words, sentences, or paragraphs to generate.
      units: `sentences`, // Generate words, sentences, or paragraphs.
      sentenceLowerBound: 5, // Minimum words per sentence.
      sentenceUpperBound: 12, // Maximum words per sentence.
      paragraphLowerBound: 1, // Minimum sentences per paragraph.
      paragraphUpperBound: 1, // Maximum sentences per paragraph.
      words: WORDS,
      format: `plain`, // Plain text or html
      random: Math.random // A PRNG function. Uses Math.random by default
    }),
    body: loremIpsum({
      count: 3, // Number of words, sentences, or paragraphs to generate.
      units: `paragraphs`, // Generate words, sentences, or paragraphs.
      sentenceLowerBound: 5, // Minimum words per sentence.
      sentenceUpperBound: 15, // Maximum words per sentence.
      paragraphLowerBound: 3, // Minimum sentences per paragraph.
      paragraphUpperBound: 5, // Maximum sentences per paragraph.
      words: WORDS,
      format: `plain`, // Plain text or html
      random: Math.random // A PRNG function. Uses Math.random by default
    }),
    milestone: milestoneId, // picks a random milestone id
    labels: [

    ]
  };

  GithubApiHelper.createIssue(issue, (error, response) => {
    if (error) {
      console.log(error);
      cb();
    }

    console.log(`Issue #${response.number} has been posted`);
    cb();
  });
}

export default function(numTickets = 0) {
  if (numTickets < 1) return;

  let count = 1;

  function createWithDelay() {
    createRandomTicket(() => {
      if (count < numTickets) {
        count++;
        setTimeout(() => {
          createWithDelay();
        }, 10000);
      }
    });
  }

  createWithDelay();
}
