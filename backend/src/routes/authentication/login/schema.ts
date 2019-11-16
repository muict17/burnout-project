export default {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string"
      },
      password: {
        type: "string"
      }
    },
    required: ["username", "password"]
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: {
          type: "string"
        }
      }
    },
    404: {
      type: "object",
      properties: {
        msg: {
          type: "string"
        }
      }
    },
    500: {
      type: "object",
      properties: {
        msg: {
          type: "string"
        }
      }
    }
  }
};
