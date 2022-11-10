import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  database: process.env.DATABASE,
  secretCookie: process.env.SECRETCOOKIE,
  passGmail: process.env.PASSGMAIL,
  adminMail: process.env.MAILADMIN,
  mailNode: process.env.MAILNODE,
  mongodb: {
    connectionString: process.env.CONNECTIONSTRING,
  },
};
