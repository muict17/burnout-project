import schema from "./schema";
export default {
  url: "/purchases",
  method: "GET",
  schema,
  preHandler: (req, res, done) => {
    req.authenticate(req, res);
    done();
  },
  handler: async (req, res) => {
    try {
      const result = await req.db
        .collection("seats")
        .aggregate([
          {
            $match: {
              userId: req.mongoPrimaryKey(req.userInfo.userId)
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
            $project: {
              _id: 1,
              "movieInfo.movieName": 1,
              "movieInfo.price": 1,
              "movieInfo.startDate": 1,
              "movieInfo.endDate": 1,
              "movieInfo.image": 1,
              seatPosition: 1,
              isUsed: 1,
              createAt: 1
            }
          }
        ])
        .toArray();
      res.send(result);
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
