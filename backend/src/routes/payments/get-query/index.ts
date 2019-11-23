import schema from "./schema";

export default {
  url: "/payments",
  method: "GET",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    req.verifyOwner(req, res, req.query.userId);
    done();
  },
  handler: async (req, res) => {
    try {
      const result = await req.db
        .collection("payments")
        .find({
          userId: req.query.userId
        })
        .toArray();
      res.send({ list: result });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
