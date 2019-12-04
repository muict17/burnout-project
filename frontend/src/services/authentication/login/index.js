import axios from "../../";

export default (username, password) => {
  return axios.post("/login", {
    username,
    password
  });
};
