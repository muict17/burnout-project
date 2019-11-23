export default {
  headers: {
    type: "object",
    properties: {
      authorization: {
        type: "string"
      }
    },
    required: ["authorization"]
  },
  body: {
    type: "object",
    properties: {
      movieId: {
        type: "string"
      },
      seatPositions: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    required: ["movieId", "seatPositions"]
  }
};
