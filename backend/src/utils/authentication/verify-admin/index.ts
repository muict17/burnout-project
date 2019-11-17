export default (req, res, role: string) => {
  try {
    if (req.userInfo.role === role) {
      return;
    }
    req.logger.warn(
      `userId: ${req.userInfo.userId} is not permitted to ${req.urlData().path}`
    );
    res.status(403).send({ msg: "Operation not permitted" });
  } catch (e) {
    req.logger.error(e);
    res.status(500).send({ msg: "Service Unavailable" });
  }
};
