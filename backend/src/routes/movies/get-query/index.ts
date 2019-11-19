import schema from "./schema";

export default {
  url: "/movies",
  method: "GET",
  schema,
  handler: async (req, res) => {
    if (req.query.name) {
      const result = await req.db
        .collection("movies")
        .find({
          movieName: new RegExp(`${req.query.name}`, "g")
        })
        .limit(Number(req.query.limit))
        .skip(Number(req.query.skip))
        .toArray();
      res.send({ list: result });
    } else if (req.query.startDate && req.query.endDate) {
      const result = await req.db
        .collection("movies")
        .find({
          startDate: { $gte: new Date(req.query.startDate) },
          endDate: { $lte: new Date(req.query.endDate) }
        })
        .limit(Number(req.query.limit))
        .skip(Number(req.query.skip))
        .toArray();
      res.send({ list: result });
    }

    const result = await req.db
      .collection("movies")
      .find({})
      .limit(Number(req.query.limit))
      .skip(Number(req.query.skip))
      .toArray();
    res.send({ list: result });
  }
};
