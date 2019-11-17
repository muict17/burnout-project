import registerService from "./authentication/register";
import loginService from "./authentication/login";
import uploadService from "./upload";
import createMovieService from "./movies/create";
export default [
  registerService,
  loginService,
  uploadService,
  createMovieService
];
