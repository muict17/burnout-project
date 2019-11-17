import schema from "./schema";
import * as bcrypt from "bcrypt";

export default {
  url: "/register",
  method: "POST",
  schema,
  handler: async (req, res) => {
    const { username, password, role, balance } = req.body;
    try {
      const data = await req.db.collection("users").findOne({
        username
      });
      if (data === null) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const info = await req.db.collection("users").insertOne({
          username,
          password: hashPassword,
          role,
          balance,
          createAt: new Date(),
          updateAt: new Date()
        });
        req.logger.trace(
          `new username registered, userId: ${info.ops[0]._id} at ${info.ops[0].createAt}`
        );
        res.send({
          msg: "Registered",
          userInfo: {
            username,
            createAt: info.ops[0].createAt,
            updateAt: info.ops[0].updateAt,
            userId: info.ops[0]._id,
            permission: info.ops[0].permission
          }
        });
      }
      req.logger.warn(`username conflict: ${username}`);
      res.status(409).send({ msg: "username already exist" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
