class Label {
  constructor(oldName = ``, newName = ``) {
    /*
    * @param {string} oldName - label name on GitHub repo
    * @param {string} newName - new name to be recored on spreadsheet
    */
    this.oldName = oldName;
    this.newName = newName;
  }
}

export default {
  format: [
    new Label(`[Format] Gallery`, `Gallery`),
    new Label(`[Format] Learning Forum`, `Learning Forum`),
    new Label(`[Format] Shed`, `Shed`)
  ],
  l10nlanguage: [
    new Label(`[LANG] Bengali`, `Bengali`),
    new Label(`[LANG] French`, `French`),
    new Label(`[LANG] German`, `German`),
    new Label(`[LANG] Greek`, `Greek`),
    new Label(`[LANG] Hindi`, `Hindi`),
    new Label(`[LANG] Italian`, `Italian`),
    new Label(`[LANG] Mandarin`, `Mandarin`),
    new Label(`[LANG] Other`, `Other`),
    new Label(`[LANG] Portuguese`, `Portuguese`),
    new Label(`[LANG] Spanish`, `Spanish`)
  ],
  productionflagged: [
    new Label(`[Production] Flagged`, `Flagged`)
  ],
  productionedited: [
    new Label(`[Production] Edited`, `Edited`)
  ]
};
