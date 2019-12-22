import axios from "../../";

export default ticketId => {
  return axios.patch(
    `/tickets/${ticketId}`,
    {
      isUsed: true
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
};
