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
      ticketId: {
        type: "string"
      }
    },
    required: ["ticketId"]
  }
};
