import Task from '../domain/Task.js';
import pool from './../config/db.js';

class TaskRepository {
    static async createNewTask(task) {
        const response = await pool.query('INSERT INTO task (title, description, created_date, status_id, status_delete) VALUES ($1, $2, $3, $4, $5) RETURNING id;', [task.title, task.description, task.createdDate, task.statusId, task.statusDelete])
        return (!response.rows.length) ? null : response.rows[0].id
    }


}
export default TaskRepository