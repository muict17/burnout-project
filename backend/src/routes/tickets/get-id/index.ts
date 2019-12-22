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
      const result = await req.db
        .collection("tickets")
        .aggregate([
          {
            $match: {
              _id: req.mongoPrimaryKey(req.params.ticketId)
            }
          },
          {
            $lookup: {
              from: "movies",
              localField: "movieId",
              foreignField: "_id",
              as: "movieInfo"
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userInfo"
            }
          },
          {
            $project: {
              _id: 1,
              "movieInfo.movieName": 1,
              "movieInfo.price": 1,
              "movieInfo.startDate": 1,
              "movieInfo.endDate": 1,
              "movieInfo.image": 1,
              seatPosition: 1,
              isUsed: 1,
              createAt: 1,
              "userInfo.username": 1
            }
          }
        ])
        .toArray();
      if (result !== null) {
        res.send(result[0]);
      }
      res.status(404).send({ msg: "ticket id not found" });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
