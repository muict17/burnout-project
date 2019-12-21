import axios from "../../";

export default (cardNumber, cardExpire, securityNumber) => {
  const [expireMonth, expireYear] = cardExpire.split("/");
  return axios.post(
    "https://vault.omise.co/tokens",
    {
      card: {
        name: "test",
        number: cardNumber,
        expiration_month: expireMonth,
        expiration_year: expireYear,
        security_code: securityNumber
      }
    },
    {
      headers: {
        Authorization: "Basic cGtleV90ZXN0XzU3dm84OGhyeHpjcHp1aHp6cmc6"
      }
    }
  );
};
