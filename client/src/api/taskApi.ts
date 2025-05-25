import { TNewTaskSave } from "../models/taskModels";
import apiClient from "./apiClient";

export const addNewTask = async ( data: TNewTaskSave) => {
    const res = await apiClient.post( `/api/tasks/`, { ...data});
    return { data: res.data, status: res.status };
}
export const updTask = async ( data: TNewTaskSave) => {
    const res = await apiClient.put( `/api/tasks/`, { ...data});
    return { data: res.data, status: res.status };
}