import axios from "../../";

export default () => {
  return axios.get("/tickets", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};
