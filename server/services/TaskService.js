import Task from "../domain/Task.js";
import TaskRepository from "../repositories/TaskRepository.js";

class TaskService {

    static async getAllActiveTasks() {
        try {
            const taskList = await TaskRepository.getStatusesByActivity(false);
            return taskList;
        } catch (error) {
            console.log("Task List Service", error);
            return error;
        }
    }
    static async createNewTask(title, description) {

        const id = 0;
        const createdDate = new Date().toISOString();
        const statusId = 1;
        const statusDelete = false;
        const newTask = new Task({ id, title, description, createdDate, statusId, statusDelete })
        try {
            const taskId = await TaskRepository.createNewTask(newTask);
            newTask.id = taskId;
            return newTask;
        } catch (error) {
            console.log("Task List Service", error);
            return error;
        }
    }

    static async updateTask(id, title, description) {

        const createdDate = new Date().toISOString();
        const statusId = 1;
        const statusDelete = false;
        const updTask = new Task({ id, title, description, createdDate, statusId, statusDelete });

        try {
            const taskId = await TaskRepository.updateTask(updTask);
            return taskId;
        } catch (error) {
            console.log("Task List Service", error);
            return error;
        }

    }
    static async updateTaskStatus(id, statusId) {

        try {
            const taskId = await TaskRepository.updateTaskStatusId(id, statusId);
            return taskId;
        } catch (error) {
            console.log("Task List Service", error);
            return error;
        }
    }
    static async deleteTaskByStatus(id) {

        try {
            const taskId = await TaskRepository.toggleTaskActivationStatus(id, true);
            return taskId;
        } catch (error) {
            console.log("Task List Service", error);
            return error;
        }
    }


}
export default TaskService