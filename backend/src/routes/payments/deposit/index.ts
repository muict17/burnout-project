import schema from "./schema";

export default {
  url: "/payments",
  method: "POST",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    req.verifyAdmin(req, res, "admin");
    done();
  },
  handler: async (req, res) => {
    try {
      const { userId, amount } = req.body;
      const [updateUserBalance] = await Promise.all([
        req.db.collection("users").updateOne(
          {
            _id: req.mongoPrimaryKey(userId)
          },
          {
            $inc: {
              balance: amount
            }
          }
        ),
        req.db
          .collection("payments")
          .insertOne({ userId, amount, createAt: new Date() })
      ]);
      if (updateUserBalance.modifiedCount !== 0) {
        res.send({
          msg: "deposited",
          ...req.body
        });
      }
      res.status(404).send({ msg: "user id not found" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
