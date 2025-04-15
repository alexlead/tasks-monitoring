import { Router } from "express";
import TaskBoardController from "../controllers/TaskBoardController.js";


const router = Router();

router.get('/', TaskBoardController.getAllBoards )


export default router;