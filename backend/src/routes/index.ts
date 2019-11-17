import registerService from "./authentication/register";
import loginService from "./authentication/login";
import uploadService from "./upload";
import createMovieService from "./movies/create";
import getMovieByIdService from "./movies/get-by-id";
import deleteMovieByIdService from "./movies/delete";

export default [
  deleteMovieByIdService,
  registerService,
  loginService,
  uploadService,
  createMovieService,
  getMovieByIdService
];
