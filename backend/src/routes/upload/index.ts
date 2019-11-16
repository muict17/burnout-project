import schema from "./schema";
import * as pump from "pump";
import * as fs from "fs";
import * as path from "path";

require("dotenv").config();

let fileName = "";
const handler = function(field, file, filename, encoding, mimetype) {
  fileName = `${(new Date().getTime() / 1000) | 0}_${filename.replace(
    /\s/g,
    "_"
  )}`;
  const name = `../../../images/${fileName}`;
  const filePath = path.join(__dirname, name);

  pump(file, fs.createWriteStream(filePath));
  return fileName;
};
export default {
  url: "/upload",
  method: "POST",
  schema,
  handler: async (req, res) => {
    try {
      // const { isValid } = await req.jwt.verify(req.headers.authorization);
      // if (isValid) {
      req.multipart(handler, function(err) {
        if (err) throw new Error(err);
        res.code(200).send({
          msg: "uploaded",
          path: `${process.env.IMG_PATH}/${fileName}`
        });
        fileName = "";
      });
      // }
      // res.status(403).send({ msg: "Operation not permitted" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
