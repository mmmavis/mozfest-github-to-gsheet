import path from 'path';
import dotenv from 'dotenv';

const ENV_TYPE = `PROD`;

export default () => {
  const ENV_FILE = ENV_TYPE === `PROD` ? `prod-real.env` : `test.env`;

  // load .env (process.env keys that are already set via the host environment (eg: Heroku) won't be changed)
  dotenv.config();
  // load our env var overrides
  dotenv.config({path: path.normalize(`${__dirname}/../../../${ENV_FILE}`)});

  return process.env;
};
