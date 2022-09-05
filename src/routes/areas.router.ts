import { Router } from "express";
import areasController from "../controllers/areas.controller.js";

const router = Router();

router.get('/town', areasController.town);
router.get('/pathway', areasController.pathway);
router.get("/meadow", areasController.meadow);
router.get("/ruins", areasController.ruins);
router.get('/forest', areasController.forest);
router.get('/mountains', areasController.mountains);
router.get('/farm', areasController.farm);
router.get('/cavetunnel', areasController.cavetunnel);
router.get('/bridge', areasController.bridge);
router.get('/swamp', areasController.swamp);
router.get('/river', areasController.river);



export default router;
