const path = require('path');

// import .env variables
if (!process.env.NODE_ENV) {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });

} else if (process.env.NODE_ENV === 'production') {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/production.env'),
    sample: path.join(__dirname, './env/.env'),
  });

} else {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });
}

module.exports = {
  NODE: process.env.NODE,
  APP_NAME: process.env.APP_NAME,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  TIMEZONE: process.env.TIMEZONE,
  SECRET: process.env.SECRET,
  FORMAT_DATE: process.env.FORMAT_DATE,
  FORMAT_TIME: process.env.FORMAT_TIME,
  DATE_TIME_FORMAT: process.env.DATE_TIME_FORMAT,
  TIMEOUT: process.env.TIMEOUT,
  TIMEOUT_TOKEN_TEMP: process.env.TIMEOUT_TOKEN_TEMP,
  TIMEOUT_TOKEN: process.env.TIMEOUT_TOKEN,
  TIMEOUT_OTP: process.env.TIMEOUT_OTP,
  FILE_PATH: process.env.FILE_PATH,
  DATA_BASE: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    charset: process.env.DB_CHARSET,
    collate: process.env.DB_COLLATE,
    schema: process.env.DB_SCHEMA,
    logQueryParameters: process.env.DB_LOG_QUERY_PARAMETERS,
    dialectOptions: {
      requestTimeout: process.env.DB_OPTION_REQUEST_TIMEOUT,
      useUTC: false,
      dateStrings: true,
      typeCast: true,
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    },
    trustServerCertificate: false,
    timezone: process.env.DB_TIMEZONE
  },
  HEADER: {
    HEADER_APP: process.env.HEADER_APP,
    HEADER_TRANSACTION_ID: process.env.HEADER_TRANSACTION_ID,
    HEADER_PUBLIC_ID: process.env.HEADER_PUBLIC_ID
  }
};
