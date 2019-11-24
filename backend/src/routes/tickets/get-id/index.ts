import schema from "./schema";

export default {
  url: "/tickets/:ticketId",
  method: "GET",
  schema,
  preHandler: (req, res, done) => {
    req.authenticate(req, res);
    done();
  },
  handler: async (req, res) => {
    try {
      const result = await req.db.collection("tickets").findOne({
        _id: req.mongoPrimaryKey(req.params.ticketId)
      });
      if (result !== null) {
        res.send(result);
      }
      res.status(404).send({ msg: "ticket id not found" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
