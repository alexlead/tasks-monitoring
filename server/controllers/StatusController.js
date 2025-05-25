import StatusService from "../services/StatusService.js";

class StatusController {
    static async getActiveStatuses (req, res) {
        try {
            const statusList = await StatusService.getAllActiveStatuses();
            res.status(200).json( {data: statusList , status: 'success' } )
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
}
export default StatusController