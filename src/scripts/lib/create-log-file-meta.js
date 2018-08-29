import fs from 'fs';
import moment from 'moment';

const DIR_PATH_ROOT = `./log`;

export default (fileNameSuffix = ``, fileExtension = `.json`) => {
  let timestamp = moment();
  let timestampInLocalTime = timestamp.local().format(`YYYY-MM-DD HH:mm:ss`);
  let date = timestamp.format(`YYYYMMDD`);
  let time = timestamp.format(`HHmmss`);

  let dir = `${DIR_PATH_ROOT}/${date}`;
  let filePath = `${dir}/${time}-${fileNameSuffix}${fileExtension}`;

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  return {
    timestamp,
    timestampInLocalTime,
    filePath
  };
};
