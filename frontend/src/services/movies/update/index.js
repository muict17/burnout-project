import axios from "../../";

export default (movieId, { movieName, price, image }) => {
  return axios.patch(
    `/movies/${movieId}`,
    { movieName, price, image },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
