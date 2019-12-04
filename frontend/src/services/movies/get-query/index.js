import axios from "../../";

export default (search = null) => {
  if (search != null) {
    return axios.get("/movies", {
      params: {
        name: search
      }
    });
  }
  return axios.get("/movies");
};
