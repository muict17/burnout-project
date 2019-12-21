import axios from "../../";

export default movieId => {
  return axios.get(`/movies/${movieId}`);
};
