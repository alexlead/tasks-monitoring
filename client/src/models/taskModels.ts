export type TTaskEditModel = {
    taskId: number;
    showModal: boolean;
}


export type TNewTaskSave = {
    id?: number;
    title: string;
    description: string;
}

export type TTaskItem = TNewTaskSave & {
    createdDate?: string;
    statusId: number;
    statusDelete: boolean;
}