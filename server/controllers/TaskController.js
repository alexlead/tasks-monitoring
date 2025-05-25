import TaskService from "../services/TaskService.js";

class TaskController {
    static async getActiveTasks(req, res) {
        try {
            const taskList = await TaskService.getAllActiveTasks();
            res.status(200).json({ data: taskList, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
    static async addTask(req, res) {
        const { title, description } = req.body;
        try {
            const newTask = await TaskService.createNewTask( title, description );
            res.status(200).json({ data: newTask, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
    static async updTask(req, res) {
        const { id, title, description } = req.body;
        console.log( req.body );
        try {
            const updTaskId = await TaskService.updateTask( id, title, description );
            res.status(200).json({ data: updTaskId, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
}
export default TaskController