import UnsuccessfulSheetColumns from '../../meta/unsuccessful-proposals-sheet/columns';
import AcceptedSheetColumns from '../../meta/accepted-proposals-sheet/columns';
import OfficialGitHubLabels from '../../meta/github/official-labels';

export default {
  formatUnsuccessfulProposal: (gsRow, ghIssue) => {
    let formatted = {};

    // extracting meta from all proposals spreadsheet
    UnsuccessfulSheetColumns.allProposalsSheet.forEach(meta => {
      let metaOldValue = gsRow[meta.oldName];

      meta.setNewValue(metaOldValue);
      formatted[meta.newName] = meta.newValue;
    });

    // extracting meta from GitHub repo
    UnsuccessfulSheetColumns.githubRepo.forEach(meta => {
      let metaOldValue = ghIssue[meta.oldName];

      meta.setNewValue(metaOldValue);
      formatted[meta.newName] = meta.newValue;
    });

    // figuring out what to do with new meta
    UnsuccessfulSheetColumns.newColumns.forEach(meta => {
      let newName = meta.newName;

      if (newName === `productionflagged`) {
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
  },
  formatAcceptedProposal: (gsRow, ghIssue) => {
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
  }
};
