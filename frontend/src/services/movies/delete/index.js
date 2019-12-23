import axios from "../../";

export default movieId => {
  return axios.delete(`/movies/${movieId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};
