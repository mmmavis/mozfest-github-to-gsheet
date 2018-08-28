import jsonfile from 'jsonfile';
// import moment from 'moment';
import chalk from 'chalk';

export default function(fileContent, filePath, cb) {
  jsonfile.writeFile(filePath, fileContent, {spaces: 2}, (err) => {
    if (err) {
      cb(err, filePath);
    }
    console.log(chalk.blue(`[JSON File Saved] ${filePath}`));
    cb();
  });
}
