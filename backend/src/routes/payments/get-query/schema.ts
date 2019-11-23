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
  querystring: {
    type: "object",
    properties: {
      userId: {
        type: "string"
      }
    },
    required: ["userId"]
  }
};
