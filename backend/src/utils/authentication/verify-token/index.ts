import jwt from "../../../jwt";

export default async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const checkToken = jwt.verify(token);
    if (checkToken.isValid) {
      req.userInfo = checkToken;
      return;
    }
  }
  res.status(401).send({
    msg: "Unauthorization"
  });
};
