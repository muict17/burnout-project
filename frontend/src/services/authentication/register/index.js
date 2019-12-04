import axios from "../../";

export default (username, password) => {
  return axios.post("/register", { username, password });
};
