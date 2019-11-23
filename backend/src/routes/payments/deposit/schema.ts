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
      userId: {
        type: "string"
      },
      amount: {
        type: "number"
      }
    },
    required: ["userId", "amount"]
  }
};
