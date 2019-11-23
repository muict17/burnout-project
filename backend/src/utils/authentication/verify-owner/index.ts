import jwt from "../../../jwt";

export default async (req, res, userId: String) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const checkToken = jwt.verify(token);
    if (checkToken.userId === userId) {
      return;
    }
  }
  res.status(403).send({
    msg: "Operation forbidden"
  });
};
