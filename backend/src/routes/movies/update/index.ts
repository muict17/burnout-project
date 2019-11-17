import schema from "./schema";
export default {
  url: "/movies/:movieId",
  method: "PATCH",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    req.verifyAdmin(req, res, "admin");
    done();
  },
  handler: async (req, res) => {
    const { movieName, image, price, startDate, endDate } = req.body;
    const result = await req.db.collection("movies").updateOne(
      { _id: req.mongoPrimaryKey(req.params.movieId) },
      {
        $set: {
          movieName,
          image,
          price,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          updateAt: new Date()
        }
      }
    );
    if (result.modifiedCount !== 0) {
      req.logger.info(
        `${req.urlData().path} => update movie information: ${
          req.params.movieId
        }`
      );
      res.send({ msg: "updated", ...req.body });
      return;
    }
    req.logger.warn(
      `${req.urlData().path} => movie ${req.params.movieId} not found`
    );
    res.status(404).send({ msg: "movie not found" });
  }
};
