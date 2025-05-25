import StatusRepository from "../repositories/StatusRepository.js";

class StatusService {
    static async getAllActiveStatuses() {
        try {
            const statusList = await StatusRepository.getActiveStatuses();
            console.log("Statuses: ", statusList)
            return statusList;
        } catch (error) {
            console.log("Status Service", error)
            return error;
        }
    }
}
export default StatusService