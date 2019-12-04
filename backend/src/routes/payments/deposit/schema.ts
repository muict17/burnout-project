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
      amount: {
        type: "number"
      },
      tokenId: {
        type: "string"
      }
    },
    required: ["amount", "tokenId"]
  }
};
