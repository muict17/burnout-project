import schema from "./schema";
export default {
  url: "/movies",
  method: "POST",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    req.verifyAdmin(req, res, "admin");
    done();
  },
  handler: async (req, res) => {
    try {
      const { movieName, image, price, startDate, endDate } = req.body;
      const result = await req.db.collection("movies").insertOne({
        movieName,
        image,
        price,
        seatsBooking: [],
        createAt: new Date(),
        updateAt: new Date()
      });
      req.logger.info(
        `${req.urlData().path} => create new movie name: ${movieName}`
      );
      res.send(result.ops[0]);
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
