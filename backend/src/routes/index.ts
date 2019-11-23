import registerService from "./authentication/register";
import loginService from "./authentication/login";
import uploadService from "./upload";
import createMovieService from "./movies/create";
import getMovieByIdService from "./movies/get-by-id";
import deleteMovieByIdService from "./movies/delete";
import updateByIdService from "./movies/update";
import getByQueryService from "./movies/get-query";
import depositService from "./payments/deposit";
import paymentByQueryService from "./payments/get-query";
import purchaseTicketService from "./purchase/create";

export default [
  purchaseTicketService,
  depositService,
  paymentByQueryService,
  getByQueryService,
  deleteMovieByIdService,
  updateByIdService,
  registerService,
  loginService,
  uploadService,
  createMovieService,
  getMovieByIdService
];
