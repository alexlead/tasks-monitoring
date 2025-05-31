import apiClient from "./apiClient";

export const getAllStatuses = async () => {
    const res = await apiClient.get( `/api/statuses/`);
    return { data: res.data, status: res.status };
}