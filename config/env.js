import {config} from "dotenv";

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`,});

export const {PORT,DB_URI,NODE_ENV,QSTASH_URL,QSTASH_TOKEN,JWT_SECRET,JWT_EXPIRED_IN,ARCJET_KEY,ARCJET_MODE} = process.env;