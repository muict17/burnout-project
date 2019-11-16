import { MongoClient } from "mongodb";
require("dotenv").config();
export default MongoClient.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  auth: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
  }
});
