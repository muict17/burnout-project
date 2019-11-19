export default {
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        default: 10
      },
      skip: {
        type: "number",
        default: 0
      },
      name: {
        type: "string"
      },
      startDate: {
        type: "string",
        format: "date-time"
      },
      endDate: {
        type: "string",
        format: "date-time"
      }
    }
  }
};
