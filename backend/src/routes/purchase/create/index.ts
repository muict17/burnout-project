import schema from "./schema";
export default {
  url: "/purchase",
  method: "POST",
  schema,
  preHandler: (req, res, done) => {
    req.authenticate(req, res);
    done();
  },
  handler: async (req, res) => {
    try {
      const { seatPositions, movieId } = req.body;
      const [movieInfo, userInfo] = await Promise.all([
        req.db.collection("movies").findOne({
          _id: req.mongoPrimaryKey(movieId)
        }),
        req.db.collection("users").findOne({
          _id: req.mongoPrimaryKey(req.userInfo.userId)
        })
      ]);
      if (movieInfo !== null) {
        const checkSeats = seatPositions.some((seat: string) =>
          movieInfo.seatsBooking.includes(seat)
        );
        if (!checkSeats) {
          const totalPrice = seatPositions.length * movieInfo.price;
          if (totalPrice > userInfo.balance) {
            res.status(400).send({
              msg: "balance is not enough"
            });
            return;
          }
          const createSeats = await Promise.all(
            seatPositions.map(seat =>
              req.db.collection("seats").insertOne({
                userId: req.userInfo.userId,
                seatPosition: seat,
                createAt: new Date()
              })
            )
          );
          await Promise.all([
            req.db.collection("movies").updateOne(
              {
                _id: req.mongoPrimaryKey(movieId)
              },
              {
                $push: {
                  seatsBooking: {
                    $each: seatPositions
                  }
                }
              }
            ),
            req.db.collection("users").updateOne(
              {
                _id: req.mongoPrimaryKey(req.userInfo.userId)
              },
              {
                $inc: {
                  balance: -totalPrice
                }
              }
            )
          ]);
          res.send({
            msg: "created",
            result: createSeats.map((result: any) => result.ops[0])
          });
        }
        res.status(409).send({
          msg: "some seat is occupied"
        });
      }
      res.status(404).send({
        msg: "movie id not found"
      });
    } catch (e) {
      req.logger.error(e);
      res.status(500).send({ msg: "Service Unavailable" });
    }
  }
};
