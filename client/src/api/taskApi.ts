import { TNewTaskSave } from "../models/taskModels";
import apiClient from "./apiClient";

export const getAllTasks = async () => {
    const res = await apiClient.get( `/api/tasks/`);
    return { data: res.data, status: res.status };
}

export const addNewTask = async ( data: TNewTaskSave) => {
    const res = await apiClient.post( `/api/tasks/`, { ...data});
    return { data: res.data, status: res.status };
}
export const updTask = async ( data: TNewTaskSave) => {
    const res = await apiClient.put( `/api/tasks/`, { ...data});
    return { data: res.data, status: res.status };
}
export const updTaskStatus = async ( id: number, statusId: string ) => {
    const res = await apiClient.put( `/api/tasks/status/`, { id, statusId });
    return { data: res.data, status: res.status };
}
export const deleteTask = async ( id: number ) => {
    const res = await apiClient.delete( `/api/tasks/${id}`);
    return { data: res.data, status: res.status };
}