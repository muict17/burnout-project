import schema from "./schema";

export default {
  url: "/register",
  method: "POST",
  schema,
  handler: async (req, res) => {
    res.send("registered");
  }
};
