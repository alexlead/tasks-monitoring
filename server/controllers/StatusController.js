import StatusService from "../services/StatusService.js";

/**
 * Description placeholder
 *
 * @class StatusController
 * @typedef {StatusController}
 */
class StatusController {
    /**
     * Get Status list for Dashboard
     *
     * @static
     * @async
     * @param {*} req 
     * @param {*} res 
     * @returns {*} 
     */
    static async getActiveStatuses(req, res) {
        try {
            const statusList = await StatusService.getAllActiveStatuses();
            res.status(200).json({ data: statusList, status: 'success' })
        } catch (error) {
            res.status(400).json({ message: error.message, status: 'error' })
        }
    }
}
export default StatusController