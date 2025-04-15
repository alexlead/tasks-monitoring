import TaskBoardRepository from "../repositories/TaskBoardRepository.js"

class TaskBoardService {
    static async getAllBoards() { 
        console.log( "Service " )
        
        try {
            const boardsList = await TaskBoardRepository.getAllBoard();
            console.log( "Service ", boardsList )
            return boardsList;
        } catch (error) {
            console.log( "Service error", error )
            return error;
        }

    }
}
export default TaskBoardService