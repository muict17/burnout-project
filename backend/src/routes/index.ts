import registerService from "./authentication/register";
import loginService from "./authentication/login";
import uploadService from "./upload";
import createMovieService from "./movies/create";
import getMovieByIdService from "./movies/get-by-id";

export default [
  registerService,
  loginService,
  uploadService,
  createMovieService,
  getMovieByIdService
];
