import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { TTaskEditModel, TTaskItem } from "../../models/taskModels";
import { TStatusItem } from "../../models/statusModels";

interface ITaskState {
    taskEdit: TTaskEditModel;
    tasks: TTaskItem[];
    statuses: TStatusItem[];
}

const initialState: ITaskState = {
    taskEdit: {
        taskId: 0,
        showModal: false
    },
    statuses: [],
    tasks: []
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<TTaskEditModel>) => {
            state.taskEdit = action.payload;
        },
        updateStatuses: (state, action: PayloadAction<TStatusItem[]>) => {
            state.statuses = [...action.payload];
        },
        updateTasks: (state, action: PayloadAction<TTaskItem[]>) => {
            state.tasks = [...action.payload];
        }
    },
});


export const selectTask = (state: RootState) => state.task;
export const { toggleModal, updateStatuses, updateTasks } = taskSlice.actions;


export default taskSlice.reducer;