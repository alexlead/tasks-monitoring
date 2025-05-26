import pool from './../config/db.js';

class TaskRepository {
    static async createNewTask(task) {
        const response = await pool.query('INSERT INTO task (title, description, created_date, status_id, status_delete) VALUES ($1, $2, $3, $4, $5) RETURNING id;', [task.title, task.description, task.createdDate, task.statusId, task.statusDelete])
        return (!response.rows.length) ? null : response.rows[0].id
    }

    static async getAllStatuses() {
        const response = await pool.query(`SELECT * FROM task;`);
        return (!response.rows.length) ? null : response.rows;
    }

    static async getStatusesByActivity(statusDelete) {
        const response = await pool.query(`SELECT * FROM task WHERE status_delete = $1;`, [statusDelete]);
        return (!response.rows.length) ? null : response.rows;
    }

    static async updateTask(task) {
        console.log(task)
        const response = await pool.query('UPDATE task SET title = $1,  description = $2 WHERE id = $3 RETURNING id;', [task.title, task.description, task.id])
        return (!response.rows.length) ? null : response.rows[0].id
    }
    static async updateTaskStatusId(id, statusId) {
        const response = await pool.query('UPDATE task SET status_id = $1 WHERE id = $2 RETURNING id;', [statusId, id])
        return (!response.rows.length) ? null : response.rows[0].id
    }
    static async toggleTaskActivationStatus(id, taskDelete) {
        const response = await pool.query('UPDATE task SET status_delete = $1 WHERE id = $2 RETURNING id;', [taskDelete, id])
        return (!response.rows.length) ? null : response.rows[0].id
    }

}
export default TaskRepository