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
      movieName: {
        type: "string"
      },
      image: {
        type: "array",
        items: {
          type: "string"
        }
      },
      price: {
        type: "number"
      },
      startDate: {
        type: "string",
        format: "date"
      },
      endDate: {
        type: "string",
        format: "date"
      }
    },
    required: ["movieName", "image", "price", "startDate", "endDate"]
  }
};
