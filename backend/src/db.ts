import { MongoClient, ObjectId } from "mongodb";
require("dotenv").config();
export default {
  client: MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD
    }
  }),
  objectId: ObjectId
};
