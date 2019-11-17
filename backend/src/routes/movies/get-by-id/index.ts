import schema from "./schema";

export default {
  url: "/movies/:movieId",
  method: "GET",
  schema,
  handler: async (req, res) => {
    const result = await req.db.collection("movies").findOne({
      _id: req.mongoPrimaryKey(req.params.movieId)
    });
    if (result !== null) {
      res.send(result);
    }
    res.status(404).send({ msg: "movie not found" });
  }
};
