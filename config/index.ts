import dotenv from "dotenv";

dotenv.config();
export default {
  jwtUserSecret: process.env.JWT_USER_SECRET,
  jwtUserLoginSecret: process.env.JWT_USER_login_SECRET,
  jwtPasswordSecret: process.env.JWT_PASSWORD_SECRET,
  accountSid: process.env.ACCOUNTSID,
  sendingEmailTo: process.env.SENDINGEMAILTO,
  authToken: process.env.AUTHTOKEN,
};
