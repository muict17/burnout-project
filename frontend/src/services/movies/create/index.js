import axios from "../../";

export default ({ movieName, price, image }) => {
  return axios.post(
    "/movies",
    { movieName, image, price },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
