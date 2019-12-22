import schema from "./schema";
import * as bcrypt from "bcrypt";
import jwt from "../../../jwt";
export default {
  url: "/login",
  method: "POST",
  schema,
  handler: async (req, res) => {
    const { username, password } = req.body;
    try {
      const checkUserInfo = await req.db.collection("users").findOne({
        username
      });
      if (checkUserInfo !== null) {
        const checkPassword = await bcrypt.compare(
          password,
          checkUserInfo.password
        );
        if (checkPassword) {
          const token = await jwt.sign({
            userId: checkUserInfo._id,
            role: checkUserInfo.role
          });
          req.logger.trace(`${token} is generated`);
          res.send({
            token,
            balance: checkUserInfo.balance,
            username: checkUserInfo.username,
            role: checkUserInfo.role
          });
        }
        res.status(401).send({ msg: "password incorrect" });
      }
      res.status(404).send({ msg: "Username not found" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
