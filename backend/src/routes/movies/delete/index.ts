import schema from "./schema";
export default {
  url: "/movies/:movieId",
  method: "DELETE",
  schema,
  preHandler: function(req, res, done) {
    req.authenticate(req, res);
    req.verifyAdmin(req, res, "admin");
    done();
  },
  handler: async (req, res) => {
    try {
      const result = await req.db.collection("movies").deleteOne({
        _id: req.mongoPrimaryKey(req.params.movieId)
      });
      if (result.deletedCount !== 0) {
        req.logger.info(
          `${req.urlData().path} => movie ${req.params.movieId} is deleted`
        );
        res.send({ msg: "movie is deleted" });
      } else {
        req.logger.warn(
          `${req.urlData().path} => movie ${req.params.movieId} not found`
        );
        res.status(404).send({ msg: "movie not found" });
      }
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
