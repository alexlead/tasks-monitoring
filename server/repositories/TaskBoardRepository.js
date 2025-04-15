import pool from './../config/db.js';
class TaskBoardRepository {
     
    static async createNewBoard(taskBoard) {
        const response = await pool.query('INSERT INTO task_boards (board_title, board_link, parent_id) VALUES ($1, $2, $3) RETURNING id;', [taskBoard.boardTitle, taskBoard.boardLink, taskBoard.parentId] )
        return (!response.rows.length) ? null : response.rows[0].id
    }

    static async updateBoard(taskBoard) {
        const response = await pool.query('UPDATE task_boards (board_title, board_link, parent_id) VALUES ($1, $2, $3) WHERE id = $4 RETURNING id;', [taskBoard.boardTitle, taskBoard.boardLink, taskBoard.parentId, taskBoard.id] )
        return (!response.rows.length) ? null : response.rows[0].id
    }

    static async deleteBoardById({ id }) {
        await pool.query(`DELETE FROM task_boards WHERE id=${id};`);
        return (!response.rows.length) ? null : response.rows[0];
      }
    static async getAllBoard() {
        const response = await pool.query("SELECT * FROM task_boards;");
        return (!response.rows.length) ? null : response.rows;
      }
    static async getAllBoardByParentId( parentId ) {
        const response = await pool.query(`SELECT * FROM task_boards WHERE parent_id = ${parentId} ;`);
        return (!response.rows.length) ? null : response.rows[0];
      }
    static async getAllBoardById(id) {
        const response = await pool.query(`SELECT tb.*, jsonb_agg( CASE WHEN tbm.id IS NOT NULL THEN jsonb_build_object('meta_key', tbm.meta_key, 'meta_value', tbm.meta_value ) ELSE NULL END ) FILTER (WHERE tbm.id IS NOT NULL) AS meta_data FROM task_boards tb LEFT JOIN task_boardmeta tbm ON tb.id = tbm.board_id WHERE tb.id = ${id} GROUP BY tb.id;`);
        return (!response.rows.length) ? null : response.rows;
      }
  
}
export default TaskBoardRepository