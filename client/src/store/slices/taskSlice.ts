import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { TTaskEditModel } from "../../models/taskModels";

interface ITaskState {
    taskEdit: TTaskEditModel;
}

const initialState: ITaskState = {
    taskEdit: {
        taskId: 0,
        showModal: false
    }
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        toggleModal: ( state, action: PayloadAction<TTaskEditModel> ) => {
            state.taskEdit = action.payload;
        }
    },
});


export const selectTask = (state: RootState) => state.task;
export const { toggleModal } = taskSlice.actions;


export default taskSlice.reducer;