import schema from "./schema";
import * as bcrypt from "bcrypt";

export default {
  url: "/register",
  method: "POST",
  schema,
  handler: async (req, res) => {
    const { username, password } = req.body;
    const data = await req.db.collection("users").findOne({
      username
    });
    if (data === null) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const info = await req.db.collection("users").insertOne({
        username,
        password: hashPassword,
        createAt: new Date(),
        updateAt: new Date()
      });
      res.send({
        msg: "Registered",
        userInfo: {
          username,
          createAt: info.ops[0].createAt,
          updateAt: info.ops[0].updateAt,
          userId: info.ops[0]._id
        }
      });
    }
    res.status(409).send({ msg: "username already exist" });
  }
};
