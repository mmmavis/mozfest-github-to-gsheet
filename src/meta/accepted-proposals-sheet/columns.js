class Meta {
  constructor(oldName = ``, newName = ``, convertFunc) {
    this.oldName = oldName;
    this.newName = newName;
    this.newValue = null;
    this.convertFunc = convertFunc;
    this.setNewValue = (oldValue) => {
      this.oldValue = oldValue;
      if (typeof convertFunc === `function`) {
        this.newValue = this.convertFunc(oldValue);
      }
    };
  }
}

let columns = {
  // meta from "all proposals spreadsheet" that we wanna keep
  allProposalsSheet: [
    new Meta(`uuid`, `uuid`, (oldValue) => {
      return `${oldValue}`;
    }),
    new Meta(`githubissuenumber`, `githubissuenumber`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`firstname`, `firstname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`surname`, `surname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`email`, `email`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`organisation`, `organisation`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`twitterhandle`, `twitterhandle`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`githubhandle`, `githubhandle`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1firstname`, `otherfacilitator1firstname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1surname`, `otherfacilitator1surname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1email`, `otherfacilitator1email`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator2firstname`, `otherfacilitator2firstname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator2surname`, `otherfacilitator2surname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator2email`, `otherfacilitator2email`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator3firstname`, `otherfacilitator3firstname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator3surname`, `otherfacilitator3surname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator3email`, `otherfacilitator3email`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`l10nlanguage`, `l10nlanguage`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`sessionname`, `sessionname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`description`, `description`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`format`, `format`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`timeneeded`, `timeneeded`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`needs`, `needs`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`travelstipend`, `travelstipend`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`residence`, `residence`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`privacypolicy`, `privacypolicy`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`receiveemailupates`, `receiveemailupates`, (oldValue) => {
      return oldValue;
    })
  ],
  // meta from "GitHub program repo" that we wanna keep
  githubRepo: [
    new Meta(`milestone`, `milestone`, (ghMilestoneObj) => {
      return ghMilestoneObj ? ghMilestoneObj.title : ``;
    }),
    new Meta(`labels`, `labels`, (ghLabelObjs) => {
      return ghLabelObjs.map(labelObj => labelObj.name).join(`\n`);
    }),
    // new Meta(``, ``, (oldValue) => {
    //   return oldValue;
    // }),
    // new Meta(``, ``, (oldValue) => {
    //   return oldValue;
    // }),
    // new Meta(``, ``, (oldValue) => {
    //   return oldValue;
    // }),
    // new Meta(``, ``, (oldValue) => {
    //   return oldValue;
    // }),
    // new Meta(``, ``, (oldValue) => {
    //   return oldValue;
    // })
  ],
  newColumns: [
    new Meta(null, `date`, () => {
      return ``;
    }),
    new Meta(null, `start time`, () => {
      return ``;
    }),
    new Meta(null, `end time`, () => {
      return ``;
    }),
    new Meta(null, `all day session`, () => {
      return ``;
    }),
    new Meta(null, `edited`, () => {
      return ``;
    }),
    new Meta(null, `format`, () => {
      return ``;
    }),
    new Meta(null, `productionflagged`, () => {
      return ``;
    }),
    new Meta(null, `productionedited`, () => {
      return ``;
    })
  ]
};

export default columns;

/*
export default [
  // `uuid`,
  // `timestamp`,
  // `githubissuenumber`,
  // `firstname`,
  // `surname`,
  // `email`,
  // `organisation`,
  // `twitterhandle`,
  // `githubhandle`,
  // `otherfacilitator1firstname`,
  // `otherfacilitator1surname`,
  // `otherfacilitator1email`,
  // `otherfacilitator1githubhandle`,
  // `otherfacilitator2firstname`,
  // `otherfacilitator2surname`,
  // `otherfacilitator2email`,
  // `otherfacilitator2githubhandle`,
  // `otherfacilitator3firstname`,
  // `otherfacilitator3surname`,
  // `otherfacilitator3email`,
  // `otherfacilitator3githubhandle`,
  // `space`, // dont include this?
  // `secondaryspace`, // dont include this?
  // `l10nwish`,
  // `l10nlanguage`,
  // `l10nsupport`,
  // `sessionname`,
  // `description`,
  // `outcome`,
  // `afterfestival`,
  // `numsofparticipants`,
  // `format`,
  // `timeneeded`,
  // `needs`,
  // `travelstipend`,
  // `proposallanguage`, // don't include this? since they are all English anyway?
  // `residence`,
  // `privacypolicy`,
  // `receiveemailupates`
];
*/
