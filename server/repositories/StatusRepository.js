import pool from './../config/db.js';

class StatusRepository {

    static async createNewStatus(status) {
        const response = await pool.query('INSERT INTO status (title, color, status_delete) VALUES ($1, $2, $3) RETURNING id;', [status.title, status.color, status.statusDelete])
        return (!response.rows.length) ? null : response.rows[0].id
    }

    static async getAllStatuses() {
        const response = await pool.query("SELECT * FROM status;");
        return (!response.rows.length) ? null : response.rows;
    }

    static async getActiveStatuses() {
        const response = await pool.query("SELECT * FROM status WHERE status_delete = FALSE;");
        return (!response.rows.length) ? null : response.rows;
    }

    static async toggleActivationStatus(id, statusActivity) {
        const response = await pool.query('UPDATE task_boards (status_delete ) VALUES ($1) WHERE id = $2 RETURNING id;', [statusActivity, id])
        return (!response.rows.length) ? null : response.rows[0].id
    }
    static async updateStatus(status) {
        const response = await pool.query('UPDATE task_boards (title, color, status_delete ) VALUES ($1) WHERE id = $2 RETURNING id;', [status.title, status.color, status.statusDelete, status.id])
        return (!response.rows.length) ? null : response.rows[0].id
    }

    
}
export default StatusRepository