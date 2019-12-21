import axios from "../../";

export default (movieId, seatPositions) => {
  return axios.post(
    "/tickets",
    { movieId, seatPositions },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
