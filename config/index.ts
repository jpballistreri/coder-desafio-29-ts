import dotenv from "dotenv";
dotenv.config();

const venvs = {
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || "dbname",
  MONGO_LOCAL_IP: process.env.MONGO_LOCAL_IP || "localhost",
  MONGO_LOCAL_PORT: process.env.MONGO_LOCAL_PORT || "27017",
  MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || "root, admin",
  MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || "mongoAtlasPass",
  MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || "xxxxxmongoDb.net",
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || "dbname",
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || "session secret key",
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "faceId",
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "faceSecret",
  EXPRESS_PORT: process.env.EXPRESS_PORT || 8080,
};

export default venvs;
