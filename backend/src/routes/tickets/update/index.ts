import schema from "./schema";

export default {
  url: "/tickets/:ticketId",
  method: "PATCH",
  schema,
  preHandler: (req, res, done) => {
    req.authenticate(req, res);
    req.verifyAdmin(req, res, "admin");
    done();
  },
  handler: async (req, res) => {
    try {
      const result = await req.db.collection("tickets").updateOne(
        {
          _id: req.mongoPrimaryKey(req.params.ticketId),
          isUsed: false
        },
        {
          $set: {
            isUsed: req.body.isUsed,
            updateAt: new Date()
          }
        }
      );
      if (result.modifiedCount !== 0) {
        res.send({
          msg: "updated",
          ticketId: req.params.ticketId,
          isUsed: true
        });
      }
      res.status(404).send({ msg: "ticket id not found" });
    } catch (e) {
      req.logger.error(e);
      req.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
