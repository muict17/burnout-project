import axios from "../../";

export default ticketId => {
  return axios.get(`/tickets/${ticketId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};
