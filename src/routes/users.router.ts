import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import {requireLoggedIn, requireNotLoggedIn, requireActiveGame} from '../util/users.js'

const router = Router();

router.get("/signup", requireNotLoggedIn, usersController.getSignup);
router.post("/signup", requireNotLoggedIn, usersController.signup);
router.get("/login", requireNotLoggedIn, usersController.getLogin);
router.post("/login", requireNotLoggedIn, usersController.login);

router.get("/backpack", requireActiveGame, usersController.backPackContents);
router.get("/backpack/add/:item", requireActiveGame, usersController.backPackAdd);

router.get("/logout", requireLoggedIn, usersController.logout);

export default router;
