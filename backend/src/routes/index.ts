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
import ticketCreateService from "./tickets/create";
import ticketByQueryService from "./tickets/get-query";
import ticketUpdateService from "./tickets/update";
import ticketByIdService from "./tickets/get-id";

export default [
  ticketByIdService,
  ticketCreateService,
  ticketByQueryService,
  ticketUpdateService,
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
