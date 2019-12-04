import axios from "axios";

export default axios.create({
  baseURL: "http://api.localhost",
  timeout: 1000
});
