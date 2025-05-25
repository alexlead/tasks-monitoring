import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { TTaskEditModel } from "../../models/taskModels";
import { TStatusItem } from "../../models/statusModels";

interface ITaskState {
    taskEdit: TTaskEditModel;
    // tasks: ;
    statuses: TStatusItem[];
}

const initialState: ITaskState = {
    taskEdit: {
        taskId: 0,
        showModal: false
    },
    statuses: [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        toggleModal: ( state, action: PayloadAction<TTaskEditModel> ) => {
            state.taskEdit = action.payload;
        },
        updateStatuses: ( state, action: PayloadAction<TStatusItem[]>) => {
            state.statuses = [ ...action.payload ];
        }
    },
});


export const selectTask = (state: RootState) => state.task;
export const { toggleModal, updateStatuses } = taskSlice.actions;


export default taskSlice.reducer;