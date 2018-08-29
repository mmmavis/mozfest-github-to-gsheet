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

// refers to list in https://github.com/mozilla/mozillafestival.org/issues/1079
let columns = {
  // meta from "all proposals spreadsheet" that we wanna keep
  allProposalsSheet: [
    new Meta(`uuid`, `uuid`, (oldValue) => {
      return `hello-${oldValue}`;
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
    new Meta(`otherfacilitator1firstname`, `otherfacilitator1firstname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1surname`, `otherfacilitator1surname`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1email`, `otherfacilitator1email`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`otherfacilitator1githubhandle`, `otherfacilitator1githubhandle`, (oldValue) => {
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
    new Meta(`otherfacilitator2githubhandle`, `otherfacilitator2githubhandle`, (oldValue) => {
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
    new Meta(`otherfacilitator3githubhandle`, `otherfacilitator3githubhandle`, (oldValue) => {
      return oldValue;
    }),
    new Meta(`sessionname`, `sessionname`, (oldValue) => {
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
    new Meta(`labels`, `labels`, (ghLabelObjs) => {
      return ghLabelObjs.map(labelObj => labelObj.name).join(`\n`);
    })
  ],
  newColumns: [
    new Meta(null, `productionflagged`, () => {
      return ``;
    })
  ]
};

export default columns;
