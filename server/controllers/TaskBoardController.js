import TaskBoardService from "../services/TaskBoardService.js"

class TaskBoardController {
     
    static async getAllBoards (req, res) {
        try {
            const boardsList = await TaskBoardService.getAllBoards();
            res.status(200).json( {data: boardsList , status: 'success' } )
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
}
export default TaskBoardController