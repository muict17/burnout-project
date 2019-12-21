import axios from "../../";

export default (tokenId, amount) => {
  return axios.post(
    "/payments",
    {
      tokenId,
      amount
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
