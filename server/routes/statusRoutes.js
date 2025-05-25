import { Router } from "express";
import StatusController from "../controllers/StatusController.js";

const router = Router();

router.get('/', StatusController.getActiveStatuses )


export default router;