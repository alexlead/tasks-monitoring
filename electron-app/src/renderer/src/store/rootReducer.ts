import { combineReducers } from "redux";
import taskSlice from './slices/taskSlice';


const rootReducer = combineReducers({
    task: taskSlice
});

export default rootReducer;