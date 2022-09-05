import { Router } from "express";
import blockersController from "../controllers/blockers.controller.js";

const router = Router();

router.get('/gnome', blockersController.gnome);
router.get('/troll', blockersController.troll);
router.get('/pixie', blockersController.pixie);
router.get('/farmer', blockersController.farmer);


export default router;