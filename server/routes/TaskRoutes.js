import { Router } from "express";
import TaskController from "../controllers/TaskController.js";


const router = Router();

router.get('/', TaskController.getActiveTasks )
router.post('/', TaskController.addTask )
router.put('/', TaskController.updTask )


export default router;