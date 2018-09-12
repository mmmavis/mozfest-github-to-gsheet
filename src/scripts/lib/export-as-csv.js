import fs from 'fs';
import JsonAndCsvConverter from 'json-2-csv';
import chalk from 'chalk';

export default function(content, filePath, cb) {
  JsonAndCsvConverter.json2csv(content, (csvConvertError, csvData) => {
    if (csvConvertError) {
      cb(csvConvertError);
    }

    fs.writeFile(filePath, csvData, `utf8`, (fileWriteErr) => {
      if (fileWriteErr) {
        cb(fileWriteErr);
      }

      console.log(chalk.blue(`[CSV File Saved] ${filePath}`));
      cb();
    });
  }, {
    delimiter: {
      field: `\t`,
      wrap: `"`
    },
    checkSchemaDifferences: false,
    emptyFieldValue: ``
  });
}
