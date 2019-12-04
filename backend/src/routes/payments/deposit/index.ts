import schema from "./schema";
const omise = require("omise")({
  publicKey: "pkey_test_57vo88hrxzcpzuhzzrg",
  secretKey: "skey_test_57vo88hs85r8478o4oh"
});
export default {
  url: "/payments",
  method: "POST",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    done();
  },
  handler: async (req, res) => {
    try {
      const paymentInfo = await omise.charges.create({
        amount: Number(req.body.amount + "00"),
        currency: "thb",
        card: req.body.tokenId
      });
      const [updateUserBalance] = await Promise.all([
        req.db.collection("users").updateOne(
          {
            _id: req.mongoPrimaryKey(req.userInfo.userId)
          },
          {
            $inc: {
              balance: req.body.amount
            }
          }
        ),
        req.db.collection("payments").insertOne({
          userId: req.userInfo.userId,
          amount: req.body.amount,
          paymentInfo: {
            id: paymentInfo.id,
            isPaid: paymentInfo.paid,
            paidAt: paymentInfo.paid_at,
            transactionId: paymentInfo.transaction
          },
          createAt: new Date()
        })
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
      if (e.message === "token was already used") {
        res.status(409).send({ msg: "token was already used" });
      }
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
