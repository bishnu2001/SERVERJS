// import { config } from "dotenv";
import "dotenv/config";

const configs = {
  PORT: process.env.PORT,
  API_VERSION: `api/v1`,
  HOST: `${process.env.HOST}`,
  DB: process.env.DB,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_PORT: process.env.EMAIL_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL,
  REGION: `${process.env.REGION}`,
  ACCESSKEY: `${process.env.ACCESSKEY}`,
  SECRET_KEY: `${process.env.SECRET_KEY}`,
  CLOUD_FONT_DISTRIBUTION: `${process.env.CLOUD_FONT_DISTRIBUTION}`,
  BUCKET_NAME: `${process.env.BUCKET_NAME}`,
  CLOUD_FONT: `${process.env.CLOUD_FONT}`,
};
export { configs };
