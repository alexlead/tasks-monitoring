import { Router } from "express";
import TaskController from "../controllers/TaskController.js";


const router = Router();

router.get('/', TaskController.getActiveTasks)
router.post('/', TaskController.addTask)
router.put('/status/', TaskController.updTaskStatus)
router.put('/', TaskController.updTask)
router.delete('/:id', TaskController.deleteTaskByStatus)


export default router;