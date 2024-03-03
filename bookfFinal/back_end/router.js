import { Router } from "express";
import * as controller from "./controller.js";
import Auth from "./auth.js";





const router=Router();
router.route("/register").post(controller.AddMovie);
router.route("/movies").get(controller.getMovie);
router.route("/movieDetails/:id").post(controller.getDetails);
router.route("/deleteMovie/:id").delete(controller.deleteMovie);
router.route("/editDetails/:id").patch(controller.editDetails);
router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login);
router.route("/home").get(Auth,controller.home);
export default router;