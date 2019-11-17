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
  params: {
    type: "object",
    properties: {
      movieId: {
        type: "string"
      }
    },
    required: ["movieId"]
  }
};
