import TaskService from "../services/TaskService.js";

/**
 * Description placeholder
 *
 * @class TaskController
 * @typedef {TaskController}
 */
class TaskController {
    /**
     * Get All Active tasks
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async getActiveTasks(req, res) {
        try {
            const taskList = await TaskService.getAllActiveTasks();
            res.status(200).json({ data: taskList, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
    /**
     * Add New Task
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async addTask(req, res) {
        const { title, description } = req.body;
        try {
            const newTask = await TaskService.createNewTask(title, description);
            res.status(200).json({ data: newTask, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
    /**
     * Update Task 
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async updTask(req, res) {
        const { id, title, description } = req.body;
        if (id > 0) {
            try {
                const updTaskId = await TaskService.updateTask(id, title, description);
                res.status(200).json({ data: updTaskId, status: 'success' })
            } catch (error) {
                res.status(400).json({ message: error.message, status: 'error' })
            }
        }
    }
    /**
     * Change Task Status
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async updTaskStatus(req, res) {
        const { id, statusId } = req.body;
        if (id > 0) {
            try {
                const updTaskId = await TaskService.updateTaskStatus(id, statusId);
                res.status(200).json({ data: updTaskId, status: 'success' })
            } catch (error) {
                res.status(400).json({ message: error.message, status: 'error' })
            }
        }
    }
    /**
     * Delete Task
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async deleteTaskByStatus(req, res) {
        const id = req.params.id;
        if (id > 0) {
            try {
                const deletedTaskId = await TaskService.deleteTaskByStatus(id);
                res.status(200).json({ data: deletedTaskId, status: 'success' })
            } catch (error) {
                res.status(400).json({ message: error.message, status: 'error' })
            }
        }
    }
}
export default TaskController